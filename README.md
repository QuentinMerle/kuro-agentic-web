# 👟 Kuro Agentic Web

> **Démonstrateur d'architecture d'interface agentique : du scraping DOM au « RSS de l'IA »**  
> Basé sur l'essai technique *« Du scraping au RSS de l'IA : Anatomie d'une interface agentique »*.

Ce laboratoire explore concrètement comment dépasser le scraping visuel lourd (Computer Use) et la prison du texte pur pour connecter les agents IA aux boutiques web et aux applications métier.

---

## 🎯 Les Deux Briques Architecturales

1. **WebMCP In-DOM (`navigator.modelContext`)**  
   Pour les agents intégrés au navigateur (extensions, Chrome Built-in AI, Side Panels). Le front-end enregistre ses propres fonctions métier directement dans le registre du DOM avec un schéma strict. Accès en 0 ms avec cookies de session et store réactif existants.
2. **Le « RSS de l'IA » (`/agent-feed.json`)**  
   Pour les agents externes (IDE, CLI, Desktop). Découverte à froid des actions et des micro-interfaces en une simple requête HTTP de 2 Ko sans avoir à lancer une instance Chromium headless.

---

## 🎨 Design System & Principes ("Human-Friendly")

Ce projet applique rigoureusement les directives de design de [ai-design-skills](https://github.com/elayadesign/ai-design-skills) :
- **Typographie :** Geist et Geist Mono, aucune fonte générique, aucune graisse extrême, césures maîtrisées (`text-wrap: balance` & `text-wrap: pretty`).
- **Surfaces :** Thème sombre flat (`#000000`, `#121212`, `#181818`), aucun dégradé en arrière-plan, dégradé subtil réservé au titre Hero (`#FFFFFF` → `#9B9B9B`).
- **Espacement & Rayons :** Grille de tokens stricte, formule des rayons imbriqués (`inner = outer - gap`).
- **Mouvement :** Courbe pondérée `cubic-bezier(0.22, 1, 0.36, 1)`, respect de `prefers-reduced-motion`.
- **Code :** Zéro framework lourd, TypeScript Vanilla pur, séparation modulaire stricte, aucun code spaghetti.

---

## 🚀 Démarrage rapide

```bash
# Installation des dépendances légères
npm install

# Lancement du serveur de développement Vite
npm run dev
```

Ouvrez ensuite [http://localhost:5173](http://localhost:5173) dans votre navigateur.

---

## 🧪 Ce que vous pouvez tester dans l'interface

- **Inspecteur Agentique :** Cliquez sur la pastille `/agent-feed.json` dans la barre de navigation pour comparer la découverte à froid (manifeste statique) et la découverte in-DOM (`navigator.modelContext`).
- **Simulation d'appel Agent :** Déclenchez l'exécution programmatique de `order_kuro_shoe` depuis l'inspecteur ou la barre d'actions pour voir le panier et les stocks réagir en temps réel.
- **Handoff de paiement délégué :** Ouvrez le panier pour observer la génération du checkout deep-link avec le SKU verrouillé, évitant à l'agent de manipuler des données bancaires sensibles.
