(function () {
  var HOME_HREF = "../index.html#home";
  var LOGO_VIEWBOX = "80 220 445 400";
  var LOGO_MARK =
    '<polygon class="oml-logo-mark" points="403.835,446.915 337.365,436.46 246.5,455.84 187.085,467.4 121.55,455.84 159.8,542.03 246.5,582.065 339.15,562.09 393.21,497.405" />';
  var LOGO_LINE =
    '<path class="oml-logo-line" d="M111.435,440.71c0-82.96,67.83-150.79,150.79-150.79c22.61,0,45.22,4.675,65.96,15.045l71.655-71.655c-9.435-11.305-8.5-28.305,1.87-39.61c11.305-11.305,30.175-11.305,41.48,0l65.96,65.96c11.305,11.305,11.305,30.175,0,41.48c-15.98,15.98-34.85,5.695-39.61,1.87l-71.655,71.655c10.37,20.74,15.045,43.35,15.045,65.96c0,34.85-25.415,151.725-164.9,148.92c-98.005,0-136.68-102.765-136.68-148.92L111.435,440.71z M494.955,288.05c3.74-3.74,3.74-10.37,0-15.045l-65.96-65.96c-4.675-3.74-11.305-3.74-15.045,0.935c-3.74,3.74-3.74,9.435,0,14.11l4.675,4.675l56.525,56.525l4.675,4.675c4.675,3.74,11.305,4.675,15.045,0c0.623,0,0.623,0,0,0L494.955,288.05z M413.015,246.57l-76.33,76.33c-2.805,2.805-7.565,3.74-11.305,1.87c-64.09-34.85-144.16-11.305-179.095,52.785c-10.37,19.805-15.98,41.48-15.98,63.155c0,0.935,57.46,30.175,120.615,4.675c28.305-11.305,61.285-26.35,120.615-12.24l22.61,5.695c0-21.675-5.695-42.415-15.98-61.285c-1.87-3.74-0.935-8.5,1.87-11.305l15.045-15.045l-17-17c-3.74-3.74-3.74-9.435,0-13.175s9.435-3.74,13.175,0l17,17l15.045-15.045l-17-17c-3.74-3.74-3.74-9.435,0-13.175s9.435-3.74,13.175,0l17,17l19.805-19.805l-43.35-43.35L413.015,246.57z M262.225,572.715c65.96,0,122.485-49.045,130.985-115.005l-24.48-5.695c-67.83-12.24-84.83,0-110.245,11.305c-39.61,17.935-84.83,15.045-125.375,0.935c11.305,63.155,65.025,108.375,129.115,108.375L262.225,572.715z" />';
  var ICON_SUN =
    '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.31 11.31 1.41 1.41M2 12h2m16 0h2M6.34 6.34 4.93 4.93m12.73 12.73 1.41 1.41M6.34 17.66l-1.41 1.41M17.66 6.34l1.41-1.41"/></svg>';
  var ICON_MOON = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>';
  var ICON_MONITOR =
    '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>';

  function brandLogo() {
    return (
      '<svg class="oml-brand-logo" xmlns="http://www.w3.org/2000/svg" viewBox="' +
      LOGO_VIEWBOX +
      '" aria-hidden="true">' +
      LOGO_MARK +
      LOGO_LINE +
      "</svg>"
    );
  }

  function themeToggle() {
    var pref = window.OMLTheme ? window.OMLTheme.getPreference() : "device";
    return (
      '<div class="oml-theme-toggle" role="group" aria-label="Color theme">' +
      '<button type="button" class="oml-theme-btn' +
      (pref === "light" ? " is-active" : "") +
      '" data-theme-mode="light" aria-pressed="' +
      (pref === "light" ? "true" : "false") +
      '" aria-label="Light theme" title="Light">' +
      ICON_SUN +
      "</button>" +
      '<button type="button" class="oml-theme-btn' +
      (pref === "dark" ? " is-active" : "") +
      '" data-theme-mode="dark" aria-pressed="' +
      (pref === "dark" ? "true" : "false") +
      '" aria-label="Dark theme" title="Dark">' +
      ICON_MOON +
      "</button>" +
      '<button type="button" class="oml-theme-btn' +
      (pref === "device" ? " is-active" : "") +
      '" data-theme-mode="device" aria-pressed="' +
      (pref === "device" ? "true" : "false") +
      '" aria-label="Match system theme" title="System">' +
      ICON_MONITOR +
      "</button></div>"
    );
  }

  function renderTopbar(mount) {
    mount.className = "oml-topbar";
    mount.innerHTML =
      '<a class="oml-brand" href="' +
      HOME_HREF +
      '" aria-label="omusiclab home">' +
      brandLogo() +
      "</a>" +
      '<div class="oml-topbar-end"><a class="oml-back" href="' +
      HOME_HREF +
      '">← Home</a>' +
      themeToggle() +
      "</div>";
  }

  function renderFooter(mount) {
    var suffix = mount.getAttribute("data-footer-suffix") || "";
    var suffixHtml = suffix ? " · " + suffix : "";
    mount.className = "oml-footer";
    mount.innerHTML = "© 2017 – " + new Date().getFullYear() + " omusiclab" + suffixHtml;
  }

  document.querySelectorAll("[data-oml-topbar]").forEach(renderTopbar);
  document.querySelectorAll("[data-oml-footer]").forEach(renderFooter);
})();
