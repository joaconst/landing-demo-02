# Umbral

Landing de una sola página para **Umbral**, una marca ficticia de crédito hipotecario en
Argentina. Astro estático, CSS propio y ~4 KB de JavaScript: sin framework de UI, sin Tailwind,
sin librerías de animación.

Incluye un simulador de cuota que calcula de verdad —sistema francés, UVA vs. tasa fija, CFT e
ingreso mínimo sugerido— y funciona sin JavaScript.

## Correr

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview
npm run check
```

Node 18 o superior.

## Estructura

```
src/
├─ pages/index.astro          orden de las secciones
├─ layouts/Base.astro         head, fuentes, SEO
├─ components/                hero, simulador, tasas, caso, proyectos, FAQ
├─ data/projects.ts           proyectos de la galería
├─ assets/proyectos/          fotos (se cargan por nombre de slug)
├─ lib/mortgage.ts            cálculo puro, sin DOM
└─ styles/tokens.css          paleta y tipografía
```

## Fotos

Dejar el archivo en `src/assets/proyectos/` con el slug del proyecto
(`casa-chacarita.jpg`) y entra sola, optimizada. Si falta, se dibuja un marco de
«Foto pendiente». Ver `LEEME.md`.

## Estado

Demo. Las tasas, los casos y los proyectos son ilustrativos; la marca es ficticia.
El sitio va con `noindex, nofollow`. Antes de publicar, revisar la lista de
«Por validar» en [`LEEME.md`](./LEEME.md).
