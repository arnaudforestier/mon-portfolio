# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# MonPortfolio

## Description

Portfolio développeur — site statique HTML/CSS/JS vanilla.

## Architecture

- `index.html` — Page unique (single-page)
- `css/style.css` — Styles globaux
- `js/main.js` — Interactivité
- `assets/images/` — Images et icônes

## Conventions de code

- HTML sémantique (`header`, `main`, `section`, `footer`)
- CSS : méthodologie BEM pour le nommage des classes
- JavaScript : vanilla uniquement, pas de framework ni librairie
- Variables et fonctions en anglais
- Contenu visible en français
- Mobile-first : concevoir d'abord pour mobile, puis adapter pour desktop

## Design

- Palette : fond sombre (`#0a0a0a`), texte clair (`#e0e0e0`), accent (`#64ffda`)
- Police : Inter (Google Fonts)
- Espacement généreux, design aéré
- Animations subtiles (transitions CSS, pas de librairie)

## Interdictions

- Pas de jQuery
- Pas de framework CSS (Bootstrap, Tailwind)
- Pas de bundler (Webpack, Vite)
- Ne jamais modifier ce fichier CLAUDE.md sans permission explicite

## Commandes

- Ouvrir le site : `open index.html` (macOS) / `xdg-open index.html` (Linux)
