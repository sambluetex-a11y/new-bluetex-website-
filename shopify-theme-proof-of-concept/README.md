# BlueTex Shopify Theme — Proof of Concept

This folder is a **proof of concept only**.
It exists to test whether the approved BlueTex mockup can be rebuilt as
editable Shopify Online Store 2.0 sections without losing the
ProTapes-inspired layout, the BlueTex brand system, or the quote-focused
customer flow.

## Relationship to the existing mockup

The static HTML in `output/` is the **approved visual guide** that the
designer will work from. It is not changed by this folder.

| Source (do NOT edit)                              | Mirrored as Shopify sections in this folder |
|---------------------------------------------------|---------------------------------------------|
| `output/bluetex_website_mockup.html`              | `templates/index.json` + homepage sections  |
| `output/bluetex_sample_box_product_page.html`     | `templates/product.sample-box.json` + product sections |
| `brand_assets/`                                   | Referenced by URL, not copied               |

When the designer signs off on the static mockup, this proof of
concept becomes the starting point for the production theme build.

## What this proof shows

- Every visual block in the mockup can be expressed as a Shopify
  **section** with a `schema` so a non-developer can edit text,
  images, buttons, FAQs, and cards inside Theme Customize.
- The homepage and the sample box product page are wired up as JSON
  templates that compose those sections. A merchant could reorder,
  hide, or duplicate any section from the Customize UI.
- Repeating UI (slides, FAQs, "what's in the box" items, step cards)
  uses **section blocks** so the count is editable, not hard-coded.

## What is intentionally not done yet

- Not every section from the mockup is included. The patterns shown
  here (hero carousel, label-bar grids with blocks, product hero,
  before/after slider) cover every other repeating layout in the
  mockup, so the rest can be added without new techniques.
- No theme settings beyond color tokens and a logo picker. The full
  global settings schema is intentionally minimal.
- No app blocks, no metaobject definitions, no checkout extensions.
- Cart, search, account, and collection templates are stubs. The
  point of this folder is to prove the homepage and sample-box PDP
  pattern, not ship a full theme.

## Folder structure

```
shopify-theme-proof-of-concept/
├── README.md
├── layout/
│   └── theme.liquid                  # base layout, head + body shell
├── assets/
│   ├── theme.css                     # styles lifted from the mockup
│   └── theme.js                      # hero carousel, B/A slider, qty
├── config/
│   ├── settings_schema.json          # global theme settings
│   └── settings_data.json            # default values
├── locales/
│   └── en.default.json
├── templates/
│   ├── index.json                    # homepage composition
│   └── product.sample-box.json       # sample box PDP composition
└── sections/
    ├── announcement-bar.liquid
    ├── header.liquid
    ├── footer.liquid
    ├── hero-carousel.liquid          # slides as blocks
    ├── category-buttons.liquid       # 4 navy buttons as blocks
    ├── termbar-system.liquid         # 4 step cards as blocks
    ├── faq-grid.liquid               # FAQs as blocks
    ├── quote-cta.liquid
    ├── product-hero.liquid           # sample box gallery + buy box
    ├── whats-in-the-box.liquid       # box items as blocks
    ├── redeemable-band.liquid
    └── related-products.liquid
```

## How to test this in Shopify later

1. **Stand up a development store** at partners.shopify.com (free).
2. **Install the Shopify CLI** locally:
   `npm install -g @shopify/cli @shopify/theme`
3. **Bootstrap a theme** that already has the boilerplate templates
   we did not include here. Easiest path:
   `shopify theme init proof-theme --clone-url https://github.com/Shopify/dawn`
4. **Copy the contents of this folder over Dawn**, replacing only the
   files that exist here. The rest of Dawn (cart drawer, search,
   account, collection templates, etc.) stays in place so the store
   still functions.
5. **Push to the dev store**:
   `cd proof-theme && shopify theme push --unpublished`
6. In Shopify admin, open **Online Store → Themes**, find the new
   unpublished theme, and click **Customize**.
7. **Homepage**: open the home template. You should see all sections
   from `templates/index.json`. Confirm hero slides, category buttons,
   TermBar steps, FAQs, and quote CTA are all editable as blocks.
8. **Sample box PDP**: in admin, create a product with the handle
   `bluetex-cover-repair-sample-box`, assign template
   `product.sample-box`, then open Customize on that product. Confirm
   the buy box, "What's Inside the Sample Box" items, redeemable
   band, and related products are all editable.
9. **Iterate**: change copy and images in Customize, reload the
   storefront, confirm changes apply without touching code. That
   confirms the proof.

## What "passing" the proof of concept means

- A merchant can edit every piece of customer-facing copy, every
  image, every button label, and every card without a developer.
- The visual result still matches the approved mockup.
- Section reordering does not break the design system (label bars,
  navy/orange palette, 1140px container, squared corners).

If those three hold, the production build can scale this same
pattern to the remaining pages (Cover & Repair Systems, Applications,
Resources, etc.).
