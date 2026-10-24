export type ProjectCategory =
  | 'residential'
  | 'publicSpaces'
  | 'mixedUse'
  | 'hospitality'

export type CityKey = 'riyadh' | 'khobar' | 'jeddah'
export type StatusKey = 'completed' | 'inProgress'

export type CatalogueProject = {
  id: string
  slug: string
  category: ProjectCategory
  image: string
  cityKey?: CityKey
  typeKey?: ProjectCategory
  statusKey?: StatusKey
}

/** Twelve portfolio entries aligned with the Figma projects grid. */
export const catalogueProjects: CatalogueProject[] = [
  {
    id: 'king-khalid',
    slug: 'king-khalid',
    category: 'residential',
    image: '/home/projects/king-khalid/hero.webp',
    cityKey: 'riyadh',
    statusKey: 'completed',
  },
  {
    id: 'rafed-project',
    slug: 'rafed-project',
    category: 'publicSpaces',
    image: '/home/images/rafed.webp',
    cityKey: 'khobar',
    statusKey: 'completed',
  },
  {
    id: 'estraha-retreat',
    slug: 'estraha-retreat',
    category: 'mixedUse',
    image: '/home/images/estraha.webp',
    cityKey: 'jeddah',
    statusKey: 'completed',
  },
  {
    id: 'rafed-project-2',
    slug: 'rafed-project',
    category: 'publicSpaces',
    image: '/home/images/rafed.webp',
    cityKey: 'khobar',
    statusKey: 'completed',
  },
  {
    id: 'estraha-retreat-2',
    slug: 'estraha-retreat',
    category: 'mixedUse',
    image: '/home/images/estraha.webp',
    cityKey: 'jeddah',
    statusKey: 'completed',
  },
  {
    id: 'el-wady-al-akhdar',
    slug: 'el-wady-al-akhdar',
    category: 'residential',
    image: '/home/images/elwady.webp',
    cityKey: 'riyadh',
    statusKey: 'completed',
  },
  {
    id: 'estraha-retreat-3',
    slug: 'estraha-retreat',
    category: 'mixedUse',
    image: '/home/images/estraha.webp',
    cityKey: 'jeddah',
    statusKey: 'completed',
  },
  {
    id: 'el-wady-al-akhdar-2',
    slug: 'el-wady-al-akhdar',
    category: 'residential',
    image: '/home/images/elwady.webp',
    cityKey: 'riyadh',
    statusKey: 'completed',
  },
  {
    id: 'rafed-project-3',
    slug: 'rafed-project',
    category: 'publicSpaces',
    image: '/home/images/rafed.webp',
    cityKey: 'khobar',
    statusKey: 'completed',
  },
  {
    id: 'el-wady-al-akhdar-3',
    slug: 'el-wady-al-akhdar',
    category: 'residential',
    image: '/home/images/elwady.webp',
    cityKey: 'riyadh',
    statusKey: 'completed',
  },
  {
    id: 'rafed-project-4',
    slug: 'rafed-project',
    category: 'publicSpaces',
    image: '/home/images/rafed.webp',
    cityKey: 'khobar',
    statusKey: 'completed',
  },
  {
    id: 'estraha-retreat-4',
    slug: 'estraha-retreat',
    category: 'mixedUse',
    image: '/home/images/estraha.webp',
    cityKey: 'jeddah',
    statusKey: 'completed',
  },
]

export type ProjectFilterId = 'all' | ProjectCategory

export const projectFilterOrder: ProjectFilterId[] = [
  'all',
  'hospitality',
  'residential',
  'mixedUse',
  'publicSpaces',
]
