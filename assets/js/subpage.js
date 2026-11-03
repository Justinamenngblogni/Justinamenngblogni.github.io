/* ============================================================
   Pages projet / expérience : bascule FR / EN
   - Le texte existe dans les deux langues (attributs data-lang="fr" / "en") ;
     le CSS masque la langue inactive selon <html lang="...">.
   - Même clé de stockage que l'accueil : la langue choisie suit le visiteur.
   - Les titres d'onglet viennent de <html data-title-fr / data-title-en>.
   ============================================================ */
(function () {
  var KEY = "portfolio_lang";
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function apply(lang) {
    root.lang = lang;
    var title = lang === "fr" ? root.dataset.titleFr : root.dataset.titleEn;
    if (title) document.title = title;
    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.langSwitch === lang);
    });
  }

  var nav = (navigator.language || "fr").toLowerCase();
  apply(saved() || (nav.indexOf("fr") === 0 ? "fr" : "en"));

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.lang);
    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        apply(btn.dataset.langSwitch);
        try { localStorage.setItem(KEY, btn.dataset.langSwitch); } catch (e) {}
      });
    });
  });
})();
