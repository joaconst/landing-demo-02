# Umbral — landing demo

Landing de una sola página para **Umbral**, una marca ficticia de crédito hipotecario en
Argentina. Construida con Astro estático, CSS propio y ~4 KB de JavaScript para el simulador.
No usa frameworks de UI, ni Tailwind, ni librerías de animación.

## Cómo verla

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/
npm run check     # tipos y diagnóstico de Astro
```

Requiere Node 18 o superior (probado con Node 24 y Astro 5.18).

## Estructura

```
src/
├─ pages/index.astro            orden de las secciones
├─ layouts/Base.astro           head, fuentes, SEO, observer de entradas
├─ components/
│  ├─ Logo.astro  Nav.astro  Hero.astro
│  ├─ Guarantees.astro          tira de tres promesas
│  ├─ Simulator.astro           simulador + lógica de interfaz
│  ├─ HowItWorks.astro          pasos 01 / 02 / 03
│  ├─ Rates.astro               comparativa UVA / fija / mixta
│  ├─ CaseStudy.astro           plano SVG + expediente de ejemplo
│  ├─ Projects.astro            galería de proyectos + carga de fotos
│  ├─ ProjectPlaceholder.astro  marco "Foto pendiente" (5 dibujos)
│  ├─ Faq.astro                 acordeón nativo
│  ├─ FinalCta.astro  Footer.astro
├─ data/projects.ts             listado y estado de cada proyecto
├─ assets/proyectos/            fotos (ver "Fotos" más abajo)
├─ lib/mortgage.ts              cálculo puro (sin DOM)
└─ styles/tokens.css · global.css
public/
├─ favicon.svg  og.png  apple-touch-icon.png
```

## Identidad

**Paleta** (`src/styles/tokens.css`)

| Token | Valor | Uso |
| --- | --- | --- |
| `--paper` | `#f1ece4` | fondo principal |
| `--paper-2` | `#e6ded2` | bandas y marcos |
| `--ink` | `#191219` | texto |
| `--plum` | `#46263f` | primario: simulador, CTA, logo |
| `--plum-700` | `#381d32` | hover |
| `--brick` | `#b44f2a` | acento gráfico (planos, barra de cuota) |
| `--brick-ink` | `#8a3919` | acento con contraste AA en texto pequeño |
| `--sage` | `#55684a` | reservado para estados de éxito |

Contrastes verificados: hueso sobre berenjena 11,5:1; berenjena sobre hueso 11,5:1; texto
secundario `#4b3f4b` sobre hueso 8,4:1; `--brick-ink` sobre hueso 6,6:1. El ladrillo `#b44f2a`
queda solo en elementos grandes o gráficos (3,9:1), nunca en párrafos.

**Tipografía** — Newsreader Variable para titulares (eje óptico 72) y Archivo Variable para
texto e interfaz. Archivo es de Omnibus-Type, fundidora de Buenos Aires: el detalle conecta con
el mercado del producto. Sin tipografía monoespaciada.

**Motivo** — el arco: portal de entrada en el hero, recorte conceptual y línea de cierre. El
plano de la sección de caso es dibujo SVG original, no una foto de stock.

**Movimiento** — una sola coreografía de entrada (el portal se abre en capas y el titular sube
por líneas), un contador breve al mover el simulador y entradas suaves por sección. Todo se
desactiva con `prefers-reduced-motion` y nada depende de JavaScript para verse.

**Fotografía** — el hero y el caso usan gráfica arquitectónica SVG original (portal de arcos y
plano), no fotos de stock. La galería de proyectos es el único lugar pensado para fotos reales;
mientras falten, cada hueco dibuja un marco de «Foto pendiente».

## Fotos de proyectos

Están en `src/assets/proyectos/`. El nombre del archivo es el `slug` del proyecto en
`src/data/projects.ts`, y se levanta solo:

```
src/assets/proyectos/casa-chacarita.jpg   →  Casa Chacarita
src/assets/proyectos/caballito-norte.jpg  →  Caballito Norte
```

No hay que tocar el componente: un `import.meta.glob` toma cualquier `.jpg`, `.jpeg`, `.png`,
`.webp` o `.avif` y Astro lo optimiza con `<Image>` (webp, tamaños responsivos, `lazy`,
dimensiones fijas para que no salte el layout). Si un archivo falta, se dibuja el marco de
«Foto pendiente» en su lugar y la grilla no se rompe.

- La primera pieza va a 16:10; la segunda es vertical 4:5 en escritorio; las demás a 4:3.
  El recorte es `object-fit: cover`, así que conviene subir 1400 px de ancho o más y encuadrar
  el sujeto al centro.
- Para sumar un proyecto: agregar una entrada en `data/projects.ts` (nombre, barrio, m²,
  estado, año, `render: true|false`) y subir la foto con ese slug.
- El estado (`terminado`, `obra`, `pozo`) aparece en el epígrafe; `render: true` muestra la
  etiqueta «Render». El orden de la lista es el orden en pantalla: primero lo terminado.

En celular la galería es un carrusel horizontal con snap; en escritorio, una grilla de seis
columnas con una pieza destacada.

## Simulador

Todo se calcula en el navegador; no se envía ningún dato. Los valores por defecto se renderizan
en el HTML, así que la página sigue siendo legible sin JavaScript.

- Sistema francés: `cuota = C · i / (1 − (1+i)^−n)`, con `i = TNA / 12`.
- UVA proyecta la cuota con inflación anual asumida; tasa fija la mantiene constante.
- CFT: TIR mensual de la cuota con seguro incluido, anualizada.
- Ingreso mínimo sugerido: cuota / 0,30.
- Aporte inicial: saldo no financiado + 6 % de gastos de escritura.

Supuestos en `src/lib/mortgage.ts`: UVA TNA 6,5 % a 30 años y hasta 80 %; fija TNA 12,5 % a 15
años y hasta 60 %; mixta 8 % los primeros tres años; seguro 0,4 % anual; tipo de cambio
$1.450; inflación 25 %. Cambiar esos valores cambia toda la página, incluida la tabla de tasas
y el caso de ejemplo, que se calculan con las mismas funciones.

## Verificación hecha

- `astro check`: 0 errores, 0 advertencias.
- Edge headless a 375 × 812 y 1440 × 900: sin desborde horizontal, sin errores de consola,
  sin imágenes rotas, sin contenido oculto.
- Repetido con «Reducir movimiento» y sin JavaScript: la página mide exactamente lo mismo y se
  ve completa.
- Contador, límites por tipo de tasa, barra fija del celular, carrusel de proyectos y acordeón
  probados con interacción real.
- Galería verificada con fotos de prueba: `<Image>` genera las variantes webp, la imagen cubre
  el marco sin deformarse y los epígrafes quedan alineados.
- Áreas táctiles principales ≥ 44 px; foco visible; etiquetas y `aria-live` en el simulador.

## Por validar

1. **Marca y copy**: «Umbral» es ficticia. Revisar nombre, tono y promesas antes de publicar.
2. **Tasas y productos**: son ilustrativos (noviembre 2026). Reemplazar por datos reales con
   fuente y fecha visibles.
3. **Caso de Caballito**: precio, cuota y «74 días» son un ejemplo, no una operación real.
4. **Correo**: `hola@umbral.demo` es un marcador; usar el buzón real.
5. **Legal**: revisar «Umbral no es una entidad financiera», la mención de CFT/UVA y el
   tratamiento de datos si se agrega un formulario.
6. **Promesas operativas**: «48 horas» y «60 a 90 días» necesitan validación del negocio.
7. **Proyectos**: los cinco (nombres, barrios, metros, años) son inventados. Reemplazarlos por
   obras reales y subir las fotos; si son renders, dejar `render: true` para que se etiqueten.
8. **Backend**: los CTA son anclas al simulador; no hay formulario ni envío de leads.
9. **SEO**: la demo va con `noindex, nofollow`. Quitarlo en producción y ajustar `site` en
   `astro.config.mjs`.
10. **Analítica**: no hay ninguna instalada.

## Publicación

`npm run build` genera un sitio estático en `dist/`. Se puede subir a Netlify, Vercel o
Cloudflare Pages sin configuración extra. Antes de publicar: reemplazar tasas y datos,
resolver los puntos de «Por validar» y quitar el `noindex`.
