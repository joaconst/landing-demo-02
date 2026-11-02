/**
 * Proyectos que muestra la galería.
 *
 * Para publicar una foto: dejar el archivo en `src/assets/proyectos/` con el
 * nombre del slug (por ejemplo `casa-chacarita.jpg`). Se toma solo, no hay que
 * tocar este archivo. Si falta, se dibuja el marco de "Foto pendiente".
 *
 * El orden de esta lista es el orden en pantalla: primero lo terminado.
 */

export type Estado = 'terminado' | 'obra' | 'pozo';

export interface Project {
  slug: string;
  name: string;
  barrio: string;
  m2: number;
  estado: Estado;
  year: number;
  /** Muestra la etiqueta "Render" sobre la imagen. */
  render: boolean;
}

export const ESTADOS: Record<Estado, string> = {
  terminado: 'Terminado',
  obra: 'En obra',
  pozo: 'En pozo',
};

export const PROJECTS: Project[] = [
  {
    slug: 'casa-chacarita',
    name: 'Casa Chacarita',
    barrio: 'Chacarita',
    m2: 92,
    estado: 'terminado',
    year: 2025,
    render: false,
  },
  {
    slug: 'recoleta-dos-ambientes',
    name: 'Dos ambientes, Recoleta',
    barrio: 'Recoleta',
    m2: 63,
    estado: 'terminado',
    year: 2024,
    render: false,
  },
  {
    slug: 'caballito-norte',
    name: 'Caballito Norte',
    barrio: 'Caballito',
    m2: 54,
    estado: 'obra',
    year: 2027,
    render: true,
  },
  {
    slug: 'barracas-planta-libre',
    name: 'Planta libre, Barracas',
    barrio: 'Barracas',
    m2: 78,
    estado: 'obra',
    year: 2027,
    render: true,
  },
  {
    slug: 'loft-villa-crespo',
    name: 'Loft Villa Crespo',
    barrio: 'Villa Crespo',
    m2: 41,
    estado: 'pozo',
    year: 2028,
    render: true,
  },
];
