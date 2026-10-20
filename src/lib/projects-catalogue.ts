export type ProjectCategory =
  | 'residential'
  | 'publicSpaces'
  | 'mixedUse'
  | 'hospitality';

export type CatalogueProject = {
  id: string;
  category: ProjectCategory;
  image: string;
};

/** Twelve portfolio entries aligned with the Figma projects grid. */
export const catalogueProjects: CatalogueProject[] = [
  { id: 'el-wady-1', category: 'residential', image: '/home/images/elwady.webp' },
  { id: 'rafed-1', category: 'publicSpaces', image: '/home/images/rafed.webp' },
  { id: 'estraha-1', category: 'mixedUse', image: '/home/images/estraha.webp' },
  { id: 'rafed-2', category: 'publicSpaces', image: '/home/images/rafed.webp' },
  { id: 'estraha-2', category: 'mixedUse', image: '/home/images/estraha.webp' },
  { id: 'el-wady-2', category: 'residential', image: '/home/images/elwady.webp' },
  { id: 'estraha-3', category: 'mixedUse', image: '/home/images/estraha.webp' },
  { id: 'el-wady-3', category: 'residential', image: '/home/images/elwady.webp' },
  { id: 'rafed-3', category: 'publicSpaces', image: '/home/images/rafed.webp' },
  { id: 'el-wady-4', category: 'residential', image: '/home/images/elwady.webp' },
  { id: 'rafed-4', category: 'publicSpaces', image: '/home/images/rafed.webp' },
  { id: 'estraha-4', category: 'mixedUse', image: '/home/images/estraha.webp' },
];

export type ProjectFilterId = 'all' | ProjectCategory;

export const projectFilterOrder: ProjectFilterId[] = [
  'all',
  'hospitality',
  'residential',
  'mixedUse',
  'publicSpaces',
];
