# Fotos de proyectos

Dejá acá las imágenes con el nombre del `slug` del proyecto, tal como figura en
`src/data/projects.ts`:

```
casa-chacarita.jpg
recoleta-dos-ambientes.jpg
caballito-norte.jpg
barracas-planta-libre.jpg
loft-villa-crespo.jpg
```

Formatos: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`. Astro las optimiza en el
build (webp + tamaños responsivos), así que conviene subir el original más
grande que tengas, de 1400 px de ancho para arriba.

Proporciones sugeridas: la primera pieza se muestra a 16:10 y las demás a 4:3
(la segunda, vertical 4:5 en escritorio). El recorte es `object-fit: cover`, así
que cualquier foto entra, pero encuadrá el sujeto al centro.

Si falta una foto, la sección dibuja un marco de "Foto pendiente" en su lugar.
No hace falta tocar código para sumar o reemplazar imágenes.
