/* BlueTex Shopify Theme — Proof of Concept JS
   Hero carousel, gallery thumb swap, qty stepper, product carousel.
   Mirrors the behavior in output/bluetex_website_mockup.html and
   output/bluetex_sample_box_product_page.html. */

(function () {
  // Hero carousel
  document.querySelectorAll('[data-hero-carousel]').forEach(function (root) {
    var track = root.querySelector('[data-hero-slides]');
    var dotsWrap = root.querySelector('[data-hero-dots]');
    if (!track || !dotsWrap) return;
    var count = track.children.length;
    if (count === 0) return;
    var idx = 0;

    for (var i = 0; i < count; i++) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      (function (n) {
        b.addEventListener('click', function () { go(n); });
      })(i);
      dotsWrap.appendChild(b);
    }

    function go(n) {
      idx = (n + count) % count;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      Array.prototype.forEach.call(dotsWrap.children, function (d, j) {
        d.classList.toggle('is-active', j === idx);
      });
    }

    root.querySelectorAll('[data-hero-prev]').forEach(function (el) {
      el.addEventListener('click', function () { go(idx - 1); });
    });
    root.querySelectorAll('[data-hero-next]').forEach(function (el) {
      el.addEventListener('click', function () { go(idx + 1); });
    });

    go(0);
    var auto = parseInt(root.getAttribute('data-autoplay-ms') || '0', 10);
    if (auto > 0) setInterval(function () { go(idx + 1); }, auto);
  });

  // Product image gallery thumb swap
  document.querySelectorAll('[data-gallery]').forEach(function (root) {
    var main = root.querySelector('[data-gallery-main]');
    var thumbs = root.querySelector('[data-gallery-thumbs]');
    if (!main || !thumbs) return;
    thumbs.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-gallery-thumb]');
      if (!btn) return;
      var src = btn.getAttribute('data-src');
      if (src) main.setAttribute('src', src);
      thumbs.querySelectorAll('[data-gallery-thumb]').forEach(function (b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');
    });
  });

  // Qty stepper
  document.querySelectorAll('[data-qty]').forEach(function (root) {
    var input = root.querySelector('input');
    if (!input) return;
    root.addEventListener('click', function (e) {
      var dec = e.target.closest('[data-qty-dec]');
      var inc = e.target.closest('[data-qty-inc]');
      if (!dec && !inc) return;
      var v = parseInt(input.value, 10);
      if (isNaN(v) || v < 1) v = 1;
      v = Math.max(1, v + (inc ? 1 : -1));
      input.value = v;
    });
  });

  // Horizontal product carousel scroll buttons
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('[data-carousel-track]');
    if (!track) return;
    function scrollBy(dir) {
      var cell = track.querySelector('.prod-cell');
      var w = cell ? cell.getBoundingClientRect().width + 14 : 240;
      track.scrollBy({ left: w * dir * 2, behavior: 'smooth' });
    }
    root.querySelectorAll('[data-carousel-prev]').forEach(function (b) {
      b.addEventListener('click', function () { scrollBy(-1); });
    });
    root.querySelectorAll('[data-carousel-next]').forEach(function (b) {
      b.addEventListener('click', function () { scrollBy(1); });
    });
  });
})();
