# Justin Amen N'GBLOGNI — Portfolio

Portfolio professionnel hébergé sur GitHub Pages.
Stack : HTML5 · CSS3 · JavaScript vanilla — sans dépendances ni build step.

🔗 **Live** : https://<votre-username>.github.io

---

## 📁 Structure

```
.
├── index.html              # Page principale (toutes sections)
├── assets/
│   ├── css/style.css       # Styles (palette, typo, layouts)
│   ├── js/main.js          # i18n FR/EN, menu mobile, scroll, reveal
│   ├── images/
│   │   ├── profile.svg     # ← À remplacer par votre photo
│   │   └── projects/       # ← À remplacer par vos visuels de projets
│   └── docs/
│       └── CV_Justin.pdf   # ← À déposer ici
└── README.md
```

## 🚀 Aperçu en local

Le site fonctionne en ouvrant directement `index.html` dans un navigateur — les traductions sont embarquées dans `main.js`, donc pas besoin de serveur.

Pour un confort de développement (rechargement live), vous pouvez aussi :

```bash
# Option 1 — Python (déjà installé sur la plupart des machines)
python3 -m http.server 8000
# puis ouvrir http://localhost:8000

# Option 2 — VS Code
# Installer l'extension "Live Server", clic droit sur index.html → "Open with Live Server"
```

## 🌍 Déploiement sur GitHub Pages

1. Pousser le code sur la branche `main` :
   ```bash
   git add .
   git commit -m "Initial portfolio"
   git push origin main
   ```
2. Sur GitHub : **Settings** → **Pages**
3. **Source** : `Deploy from a branch`
4. **Branch** : `main` / `/ (root)` → **Save**
5. Le site est en ligne à `https://<votre-username>.github.io` en ~1 minute.

## ✏️ Personnalisation

### Remplacer les images
- **Profil** : remplacer `assets/images/profile.svg` par votre photo (format conseillé : carré ou portrait, 600×750 px). Si vous utilisez un autre format, modifier la balise `<img src="...">` dans `index.html`.
- **Projets** : remplacer les 3 SVG dans `assets/images/projects/` par vos captures (4:3 conseillé, 1200×900 px).

### Modifier les textes
Toute la copie bilingue se trouve en haut de `assets/js/main.js`, dans l'objet `TRANSLATIONS`. Modifier `fr` et `en` en parallèle pour garder la cohérence.

### Ajuster la palette
Les couleurs sont définies en haut de `assets/css/style.css` sous `:root` :
```css
--ink:    #0d1117;   /* texte principal */
--paper:  #f7f3ea;   /* fond crème */
--accent: #b04a2b;   /* terracotta */
```

### Ajouter un nouveau projet
Dans `index.html`, copier le bloc `<article class="project">` et adapter. Ajouter les clés correspondantes dans `TRANSLATIONS.fr.projects` et `TRANSLATIONS.en.projects` dans `main.js`.

## 📦 Dépendances externes

- **Google Fonts** : Fraunces · Manrope · JetBrains Mono (chargées via CDN)
- Aucune librairie JS, aucun framework, aucun build.

## 📝 Licence

© 2026 Justin Amen N'GBLOGNI. Tous droits réservés.
Le code de ce portfolio est partagé à titre indicatif.
