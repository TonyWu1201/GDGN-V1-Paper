(function () {
  "use strict";
  if (typeof renderMathInElement === "function") {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false },
        { left: "$", right: "$", display: false }
      ],
      macros: {
        "\\NA": "\\text{N/A}",
        "\\LN": "\\mathrm{LN\\_IC}_{50}",
        "\\PCC": "\\mathrm{PCC}",
        "\\RMSE": "\\mathrm{RMSE}"
      },
      throwOnError: false,
      errorColor: "#b00020"
    });
  }

  var links = Array.prototype.slice.call(
    document.querySelectorAll(".toc-list a[href^='#']")
  );
  var targets = [];
  links.forEach(function (link) {
    var id = decodeURIComponent(link.getAttribute("href").slice(1));
    var element = document.getElementById(id);
    if (element) {
      targets.push({ link: link, element: element });
    }
  });
  var backToTop = document.getElementById("back-to-top");
  var ticking = false;

  function update() {
    ticking = false;
    var threshold = window.scrollY + 100;
    var current = null;
    targets.forEach(function (target) {
      if (target.element.offsetTop <= threshold) {
        current = target.element;
      }
    });
    links.forEach(function (link) {
      var id = decodeURIComponent(link.getAttribute("href").slice(1));
      link.classList.toggle("is-active", current !== null && id === current.id);
    });
    if (backToTop) {
      backToTop.classList.toggle("is-visible", window.scrollY > 700);
    }
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.querySelectorAll("details.toc-mobile a").forEach(function (link) {
    link.addEventListener("click", function () {
      var details = link.closest("details");
      if (details) {
        details.removeAttribute("open");
      }
    });
  });
})();
