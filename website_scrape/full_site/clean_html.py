from pathlib import Path
from bs4 import BeautifulSoup
import re

ROOT = Path(".")

REMOVE_TAGS = [
    "script", "style", "noscript", "svg", "iframe", "canvas",
    "form", "input", "button", "select", "option",
    "header", "footer", "nav", "aside"
]

def clean_text(text):
    return re.sub(r"\s+", " ", text).strip()

def simplify_html(soup):
    allowed = ["h1","h2","h3","h4","h5","h6","p","ul","ol","li","blockquote"]
    new_html = BeautifulSoup("<html><body><article></article></body></html>", "lxml")
    article = new_html.article
    seen = set()

    for tag in soup.find_all(allowed):
        text = clean_text(tag.get_text(" ", strip=True))
        if not text:
            continue
        if text in seen:
            continue
        seen.add(text)

        new_tag = new_html.new_tag(tag.name)
        new_tag.string = text
        article.append(new_tag)

    return new_html

for file in ROOT.rglob("*.html"):
    if file.name == "clean_html.py":
        continue
    try:
        html = file.read_text(encoding="utf-8", errors="ignore")
        soup = BeautifulSoup(html, "lxml")

        for tag in soup.find_all(REMOVE_TAGS):
            tag.decompose()

        clean_soup = simplify_html(soup)
        file.write_text(str(clean_soup), encoding="utf-8")
        print("Cleaned:", file)

    except Exception as e:
        print("Failed:", file, e)
