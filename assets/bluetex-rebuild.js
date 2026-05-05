(function () {
  var accordionButtons = document.querySelectorAll('[data-bti-accordion-button]');

  accordionButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var panelId = button.getAttribute('aria-controls');
      var panel = panelId ? document.getElementById(panelId) : null;
      var isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (!panel) return;

      button.setAttribute('aria-expanded', String(!isExpanded));
      panel.hidden = isExpanded;
    });
  });

  document.querySelectorAll('[data-bti-video]').forEach(function (wrapper) {
    var button = wrapper.querySelector('[data-bti-video-button]');
    var embed = wrapper.getAttribute('data-bti-video-embed');

    if (!button || !embed) return;

    button.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = embed;
      iframe.title = wrapper.getAttribute('data-bti-video-title') || 'Video';
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      wrapper.replaceChildren(iframe);
    });
  });

  if (window.matchMedia('(max-width: 749px)').matches) {
    document.querySelectorAll('[data-bti-hero-video]').forEach(function (video) {
      video.removeAttribute('autoplay');
      video.pause();
    });
  }
})();
