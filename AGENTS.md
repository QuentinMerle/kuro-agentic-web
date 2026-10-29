# Design System & Engineering Rules: Kuro Agentic Web

Ce fichier de règles s'inspire directement du standard [ai-design-skills](https://github.com/elayadesign/ai-design-skills) d'Elaya Design et des principes d'artisanat web de Vibrisse Studio.

---

## 1. Philosophie du code : "Human-Friendly, Zéro Spaghetti"

- **Clarté chirurgicale :** Préférer du TypeScript Vanilla lisible et modulaire à des abstractions prématurées ou des dépendances lourdes.
- **Séparation des responsabilités :**
  - `core/` : Logique pure, types, polyfill WebMCP déterministe et store réactif.
  - `design-system/` : Tokens CSS stricts, variables et réinitialisation typographique.
  - `components/` : Custom Elements (Shadow DOM) ou composants DOM modulaires sans couplage caché.
- **Zéro magie noire :** Pas de prompts géants ni d'effets de bord invisibles. Le code doit être auto-documenté et lisible par n'importe quel développeur.

---

## 2. Système Visuel (Tokens & Directives)

### A. Typographie
- **Fontes autorisées :** `Geist`, `Geist Mono`.
- **Interdites :** `Inter`, `Roboto`, `Arial`, `Helvetica`, `Open Sans`.
- **Zéro italique.**
- **Zéro graisse extrême (900 / black) :** Plafonner au `semibold` (600) ou `bold` (700).
- **Règles rédactionnelles :**
  - Pas de césures maladroites ou de mots orphelins : `text-wrap: balance` sur les titres, `text-wrap: pretty` sur les paragraphes.
  - Pas de tirets superflus à l'intérieur des phrases.

### B. Couleurs & Surfaces (Dark Theme strict)
- **Fonds plats obligatoires :** Zéro dégradé en arrière-plan.
  - Noir profond : `#000000`
  - Fond primaire : `#121212`
  - Cartes et panneaux : `#181818`, `#1F1F1F`
  - Bordures et séparateurs : `#272727`
  - Survol / Focus : `#313131`
- **Dégradé de texte :** Exclusivement sur le titre Hero principal : `#FFFFFF` → `#9B9B9B` (gauche vers droite).

### C. Échelle d'espacement (Spacing Tokens)
Résoudre impérativement les marges et paddings sur cette grille :
- `space-25`: 2px
- `space-50`: 4px
- `space-75`: 8px
- `space-100`: 12px
- `space-200`: 16px
- `space-300`: 24px
- `space-400`: 32px
- `space-500`: 40px
- `space-600`: 48px
- `space-700`: 64px
- `space-800`: 80px
- `space-900`: 96px

### D. Rayon de courbure (Nested Radius Formula)
Pour tout élément imbriqué avec un écart (gap/padding) inférieur à 32px :
`rayon_interne = rayon_externe - ecart` (si résultat > 2px).
- Boutons principaux : padding vertical 8px, padding horizontal 16px, radius 8px (`rounded-md`).
- Cartes principales : radius 16px (`rounded-2xl`).

### E. Mouvement & Transitions
- Courbe d'animation standard : `cubic-bezier(0.22, 1, 0.36, 1)` (*ease out quint*).
- Durée : `300ms` pour les survols de couleur et d'opacité, `500ms` pour les translations de panneaux.
- Animer **uniquement** `transform` et `opacity`. Jamais `top`, `left`, `width`, ou `height`.
- Respect strict de `prefers-reduced-motion`.

---

## 3. Spécifications Agentiques

- **Le fichier `/agent-feed.json`** sert de manifeste d'actions statique pour la découverte externe.
- **L'objet `navigator.modelContext`** permet la découverte locale dans le DOM par l'IA intégrée au navigateur.
- **Le composant 3D** communique en JSON-RPC 2.0 via `window.parent.postMessage` lorsqu'il est dans un iframe hôte (`context="agent"`).
