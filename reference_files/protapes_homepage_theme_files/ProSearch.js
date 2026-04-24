class Search {
  // 1. describe and create/initiate our object
  constructor() {
    this.addSearchHTML()
    this.resultsOverlay = document.querySelector("#search-results-overlay")
    this.resultsDiv = document.querySelector("#search-overlay__results")
    this.openButton = document.querySelectorAll(".js-search-trigger")
    this.closeButton = document.querySelector("#search-overlay-close")
    this.searchOverlay = document.querySelector("#search-results-overlay")
    this.searchField = document.querySelector("#search-term")
    this.isOverlayOpen = true
    this.isSpinnerVisible = false
    this.previousValue
    this.typingTimer
    this.events()
  }

  // 2. events
  events() {
    document.addEventListener('click', e => this.closeOverlay(e))
    document.addEventListener("keydown", e => this.keyPressDispatcher(e))
    this.searchField.addEventListener("keyup", () => this.typingLogic())
  }

  // 3. methods (function, action...)
  typingLogic() {
    if (this.searchField.value != this.previousValue) {
      clearTimeout(this.typingTimer)

      if (this.searchField.value) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.innerHTML = '<h2 class="text-center">Searching...</h2><div class="loader">Loading...</div>'
          this.openOverlay()
          this.isSpinnerVisible = true
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750)
      } else {
        this.resultsDiv.innerHTML = ""
        this.isSpinnerVisible = false
      }

    }

    this.previousValue = this.searchField.value
  }

  async getResults() {
    try {
      const response = await axios.get(protapesData.root_url + "/wp-json/protapes/v1/search?term=" + this.searchField.value)
      const results = response.data
      this.resultsDiv.innerHTML = `
      <div class="row">
        <div class="col-10 mt-2">
          <h1 class="mb-0">Search: `+ this.searchField.value +`</h1>
        </div>
        <div class="col-2 mt-2">
          <img id="search-overlay-close" class="search-overlay-close" style="float:right" src="${protapesData.template_url}/img/Xclose_darkgrey_icon_20x20.png"/>
        </div>
      </div>
        <div class="row">
          <div class="col-12 col-sm-4 order-2 order-sm-1">
            <h4>Markets</h4>
            ${results.industries.length ? '<ul class="ul-no-bullets smaller-margin">' : "<p>No general information matches that search.</p>"}
              ${results.industries.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
            ${results.industries.length ? "</ul>" : ""}
            <h4>Pages</h4>
            ${results.pages.length ? '<ul class="ul-no-bullets smaller-margin">' : "<p>No general information matches that search.</p>"}
              ${results.pages.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join("")}
            ${results.pages.length ? "</ul>" : ""}
          </div>
          <div class="col-12 col-sm-8 order-1 order-sm-2">
            <h4>Products</h4>
            ${results.products.length ? '<div class="row">' : `<p>No professors match that search.</p>`}
              ${results.products
                .map(
                  item => `
                    <div class="col-12 col-md-6 col-lg-3 p-sm-1 px-lg-2 py-lg-1 pr-md-0 pr-lg-2 mb-1 mb-sm-0">
                      <div class="row">
                        <div class="col-3 col-md-4 col-lg-12 px-1 px-lg-0">
                          <a href="${item.permalink}"><img src="${item.image}" alt="${item.title}"/></a>
                        </div>
                        <div class="col-9 col-md-8 col-lg-12 px-0">
                          <a  href="${item.permalink}">${item.title}</a>
                        </div>
                      </div>
                    </div>
                    `
                )
                .join("")}
              ${results.products.length ? "</div>" : ""}
            <h4>Blog Posts</h4>
            ${results.posts.length ? '<div class="row">' : `<p>No blog posts match that search. <a href="${protapesData.root_url}/blog">View all posts</a></p>`}
              ${results.posts.map(item => `
                <div class="col-12 col-lg-4 mb-1 mb-lg-2">
                  <div class="row">
                    <div class="col-5 col-lg-12 d-none d-md-block">
                      <img src="${item.image}" alt="${item.title}"/>
                    </div>
                    <div class="col-12 col-md-7 col-lg-12 align-top px-1 px-md-0 px-lg-1">
                      <a href="${item.permalink}">${item.title}</a>
                    </div>
                  </div>
                </div>
                `).join("")}

              ${results.posts.length ? "</div>" : ""}

          </div>
        </div>
      `
      this.isSpinnerVisible = false
    } catch (e) {
      console.log(e)
    }
  }

  keyPressDispatcher(e) {
    if (e.keyCode == 83 && !this.isOverlayOpen && document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA") {
      this.openOverlay()
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay().bind(this)
    }
    if (e.keyCode == 13 && this.isOverlayOpen) {
      document.forms[0].submit();
    }
  }

  openOverlay() {
    this.searchOverlay.classList.add("search-overlay-active")
    document.body.classList.add("body-no-scroll")
    setTimeout(() => this.searchField.focus(), 301)
    console.log("our open method just ran!")
    this.isOverlayOpen = true
    return false
  }

  closeOverlay(e) {
    if(e.target && e.target.id== 'search-overlay-close'){
          this.searchField.value = ""
          this.searchOverlay.classList.remove("search-overlay-active")
          document.body.classList.remove("body-no-scroll")
          this.isOverlayOpen = false
     }
  }

  addSearchHTML() {
    document.getElementById('search-results-overlay').insertAdjacentHTML(
      "beforeend",
      `
      <div class="container">
        <div class="row">
          <div class="col px-sm-0">
            <div id="search-overlay__results"></div>
          </div>
        </div>
      </div>
      `
    )
  }
}

const search = new Search()
