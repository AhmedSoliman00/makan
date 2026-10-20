import type { ProjectCategory } from './projects-catalogue'

export type ProjectDetail = {
  slug: string
  category: ProjectCategory
  title: string
  shortTitle: string
  location: string
  image: string
  heroImage: string
  summary: string
  description: string
  year: string
  status: string
  area: string
  client: string
  tags: string[]
  gallery: string[]
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'king-khalid',
    category: 'residential',
    title: 'King Khalid Residential Courtyard',
    shortTitle: 'King Khalid',
    location: 'Riyadh, Kingdom of Saudi Arabia',
    image: '/home/projects/king-khalid/hero.png',
    heroImage: '/home/projects/king-khalid/hero.png',
    summary:
      'A warm, contemporary residential landscape designed around human comfort, shaded gathering, and a distinctive sense of place.',
    description:
      'This residential courtyard project creates a serene retreat in the heart of a dense urban context. The landscape strategy balances planting, shade, and circulation to provide a memorable everyday experience for residents.',
    year: '2025',
    status: 'Completed',
    area: '12,800 m²',
    client: 'Private developer',
    tags: [
      'Residential',
      'Landscape Architecture',
      'Courtyard Living',
      'Sustainability',
    ],
    gallery: [
      '/home/projects/king-khalid/hero.png',
      '/home/images/Mountain garden.webp',
      '/home/images/elwady.webp',
      '/home/images/why-makan-bg.webp',
    ],
  },
  {
    slug: 'rafed-project',
    category: 'publicSpaces',
    title: 'Rafed Public Realm',
    shortTitle: 'Rafed',
    location: 'Khobar, Kingdom of Saudi Arabia',
    image: '/home/images/rafed.webp',
    heroImage: '/home/images/rafed.webp',
    summary:
      'A vibrant public realm that reconnects people to the landscape through resilient planting, shaded streets, and social gathering spaces.',
    description:
      'The project transforms a public environment into a more hospitable, safer, and active setting for daily life. The design integrates walkability, recreational comfort, and strong character through materials and planting identity.',
    year: '2024',
    status: 'Completed',
    area: '9,600 m²',
    client: 'Municipal partnership',
    tags: [
      'Public Realm',
      'Urban Landscape',
      'Placemaking',
      'Climate Adaptation',
    ],
    gallery: [
      '/home/images/rafed.webp',
      '/home/images/Mountain garden.webp',
      '/home/images/elwady.webp',
      '/home/images/why-makan-bg.webp',
    ],
  },
  {
    slug: 'estraha-retreat',
    category: 'mixedUse',
    title: 'Estraha Retreat',
    shortTitle: 'Estraha',
    location: 'Jeddah, Kingdom of Saudi Arabia',
    image: '/home/images/estraha.webp',
    heroImage: '/home/images/estraha.webp',
    summary:
      'A mixed-use hospitality retreat where landscape and architecture work together to create a restorative leisure destination.',
    description:
      'Estraha blends hospitality, gathering, and urban relaxation within a single landscape framework. Native planting and carefully composed views establish a memorable experience across a wide range of spaces.',
    year: '2025',
    status: 'Completed',
    area: '14,200 m²',
    client: 'Private resort developer',
    tags: ['Mixed-Use', 'Hospitality', 'Retreat', 'Destination Design'],
    gallery: [
      '/home/images/estraha.webp',
      '/home/images/Mountain garden.webp',
      '/home/images/rafed.webp',
      '/home/images/why-makan-bg.webp',
    ],
  },
  {
    slug: 'el-wady-al-akhdar',
    category: 'residential',
    title: 'El Wady Al Akhdar',
    shortTitle: 'El Wady',
    location: 'Riyadh, Kingdom of Saudi Arabia',
    image: '/home/images/elwady.webp',
    heroImage: '/home/images/elwady.webp',
    summary:
      'A high-value residential landscape blending community moments, privacy, and a soft desert palette into a cohesive family environment.',
    description:
      'The design creates an elegant balance between private living and shared social spaces. Materials, water features, and planting are coordinated to enrich the daily experience of residents while preserving cultural references.',
    year: '2023',
    status: 'Completed',
    area: '17,400 m²',
    client: 'Residential community group',
    tags: [
      'Residential',
      'Master Planning',
      'Family Living',
      'Desert Landscape',
    ],
    gallery: [
      '/home/images/elwady.webp',
      '/home/images/rafed.webp',
      '/home/images/estraha.webp',
      '/home/images/why-makan-bg.webp',
    ],
  },
]

export function getProjectBySlug(slug: string) {
  return projectDetails.find((project) => project.slug === slug)
}

export function getProjectSlugs() {
  return projectDetails.map((project) => ({ slug: project.slug }))
}
