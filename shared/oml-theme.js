(function () {
  var FAVICON_HREF = "/assets/favicon.svg";

  function ensureFavicon() {
    if (!document.head) return;
    var hasIcon = document.querySelector('link[rel~="icon"][href="' + FAVICON_HREF + '"]');
    if (hasIcon) return;

    ["icon", "shortcut icon", "apple-touch-icon"].forEach(function (rel) {
      var link = document.createElement("link");
      link.rel = rel;
      link.href = FAVICON_HREF;
      if (rel !== "apple-touch-icon") link.type = "image/svg+xml";
      document.head.appendChild(link);
    });
  }

  ensureFavicon();

  var STORAGE = "oml-theme-preference";

  function resolve(pref) {
    if (pref === "dark" || pref === "light") return pref;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function syncButtons(pref) {
    document.querySelectorAll("[data-theme-mode]").forEach(function (btn) {
      var on = btn.dataset.themeMode === pref;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function applyPreference(pref) {
    var resolved = resolve(pref);
    document.documentElement.setAttribute("data-theme", resolved);
    document.documentElement.dataset.themePreference = pref;
    syncButtons(pref);
  }

  var pref = localStorage.getItem(STORAGE) || "device";
  if (["light", "dark", "device"].indexOf(pref) === -1) pref = "device";

  document.documentElement.setAttribute("data-theme", resolve(pref));
  document.documentElement.dataset.themePreference = pref;

  window.OMLTheme = {
    apply: applyPreference,
    getPreference: function () {
      return localStorage.getItem(STORAGE) || "device";
    },
    setPreference: function (next) {
      localStorage.setItem(STORAGE, next);
      applyPreference(next);
    },
  };

  function boot() {
    syncButtons(pref);
    document.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-theme-mode]");
      if (!btn) return;
      window.OMLTheme.setPreference(btn.dataset.themeMode);
    });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      if (document.documentElement.dataset.themePreference === "device") {
        applyPreference("device");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
