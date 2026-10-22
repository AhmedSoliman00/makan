import type { ProjectCategory } from './projects-catalogue'

export type ProjectMetric = {
  value: string
  label: string
  icon: 'trees' | 'users' | 'building' | 'sprout'
}

export type ProjectHighlightItem = {
  title: string
  description: string
  icon: 'community' | 'nature' | 'services' | 'location'
}

export type ProjectFact = {
  label: string
  value: string
  icon: 'units' | 'year' | 'scope' | 'location' | 'type' | 'area'
}

export type ProjectSimilar = {
  slug: string
  category: string
  title: string
  location: string
  image: string
}

export type LocalizedProjectDetail = {
  breadcrumbTitle: string
  title: string
  categoryBadge: string
  heroCaption: string
  summary: string
  description: string
  metrics: ProjectMetric[]
  highlightsTitle: string
  highlightsCtaText: string
  highlights: ProjectHighlightItem[]
  overviewEyebrow: string
  overviewHeading: string
  overviewDescription: string
  facts: ProjectFact[]
  galleryEyebrow: string
  galleryHeading: string
  galleryDescription: string
  galleryImages: string[]
  masterplanEyebrow: string
  masterplanHeading: string
  masterplanDescription: string
  masterplanCtaText: string
  masterplanCaption: string
  masterplanEnlargeText: string
  masterplanImage: string
  similarTitle: string
  similarSubtitle: string
  similarCtaText: string
  similarProjects: ProjectSimilar[]
}

export type ProjectDetail = {
  slug: string
  aliases?: string[]
  category: ProjectCategory
  heroImage: string
  ar: LocalizedProjectDetail
  en: LocalizedProjectDetail
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'king-khalid',
    aliases: ['rabwat-al-ramez'],
    category: 'residential',
    heroImage: '/home/projects/king-khalid/hero.webp',
    ar: {
      breadcrumbTitle: 'ربوة الرمز',
      title: 'الملك خالد',
      categoryBadge: 'مجتمع سكني متكامل',
      heroCaption: 'ربوة الرمز — رؤية للمكان',
      summary:
        'مجتمع سكني متكامل صمم ليجمع بين جودة الحياة والطبيعة والعمارة المعاصرة، ليوفر بيئة هادئة ومستدامة للعائلات.',
      description:
        'ربوة الرمز هو مجتمع سكني متكامل صمم ليجمع بين جودة الحياة والطبيعة والعمارة المعاصرة، حيث تتداخل المساحات الخضراء والممرات الطبيعية مع تصميم عمراني هادئ ينسجم مع البيئة المحلية.\n\nيقدم المشروع تجربة سكنية متوازنة تلبي احتياجات العائلات العصرية، من خلال بيئة متكاملة تشمل المرافق والخدمات والمساحات الخضراء، ضمن موقع استراتيجي في شمال غرب الرياض.',
      metrics: [
        {
          value: '4',
          label: 'مناطق مجتمعية رئيسية',
          icon: 'sprout',
        },
        {
          value: '220',
          label: 'وحدة سكنية',
          icon: 'building',
        },
        {
          value: '+30%',
          label: 'تحسن في جودة الحياة',
          icon: 'users',
        },
        {
          value: '+60%',
          label: 'مساحات خضراء',
          icon: 'trees',
        },
      ],
      highlightsTitle: 'أبرز مميزات المشروع',
      highlightsCtaText: 'تواصل معنا',
      highlights: [
        {
          title: 'مجتمع سكني متكامل',
          description: 'يوفر جميع مقومات الحياة العصرية',
          icon: 'community',
        },
        {
          title: 'بيئة طبيعية متوازنة',
          description: 'مساحات خضراء ومسارات طبيعية',
          icon: 'nature',
        },
        {
          title: 'مرافق وخدمات متكاملة',
          description: 'مرافق تعليمية وترفيهية وتجارية',
          icon: 'services',
        },
        {
          title: 'موقع استراتيجي',
          description: 'في شمال غرب الرياض',
          icon: 'location',
        },
      ],
      overviewEyebrow: 'نبذة عن المشروع',
      overviewHeading: 'حياة تنمو بانسجام مع الطبيعة',
      overviewDescription:
        'ربوة الرمز هو مجتمع سكني متكامل صمم ليجمع بين جودة الحياة والطبيعة والعمارة المعاصرة، حيث تتداخل المساحات الخضراء والممرات الطبيعية مع تصميم عمراني هادئ ينسجم مع البيئة المحلية.\n\nيقدم المشروع تجربة سكنية متوازنة تلبي احتياجات العائلات العصرية، من خلال بيئة متكاملة تشمل المرافق والخدمات والمساحات الخضراء، ضمن موقع استراتيجي في شمال غرب الرياض.',
      facts: [
        {
          label: 'عدد الوحدات',
          value: '220 وحدة سكنية',
          icon: 'units',
        },
        {
          label: 'سنة التطوير',
          value: '2024',
          icon: 'year',
        },
        {
          label: 'نطاق الخدمات',
          value: 'تخطيط وتصميم وتطوير شامل',
          icon: 'scope',
        },
        {
          label: 'الموقع',
          value: 'شمال غرب الرياض',
          icon: 'location',
        },
        {
          label: 'نوع المشروع',
          value: 'مجتمع سكني متكامل',
          icon: 'type',
        },
        {
          label: 'المساحة البنائية',
          value: '1,240,000 م²',
          icon: 'area',
        },
      ],
      galleryEyebrow: 'معرض الصور',
      galleryHeading: 'ملامح المكان، وروح المجتمع',
      galleryDescription: 'لقطات من المشروع تعكس طبيعة المكان وروح المجتمع.',
      galleryImages: [
        '/home/projects/king-khalid/gallery-1.webp',
        '/home/projects/king-khalid/gallery-2.webp',
        '/home/projects/king-khalid/gallery-3.webp',
      ],
      masterplanEyebrow: 'المخطط العام',
      masterplanHeading: 'رؤية متكاملة للمكان',
      masterplanDescription: 'تصميم متكامل يوازن بين الطبيعة والحياة العصرية.',
      masterplanCtaText: 'عرض المخطط العام',
      masterplanCaption: 'ربوة الرمز · المخطط العام للمشروع',
      masterplanEnlargeText: 'عرض المخطط بالحجم الكامل',
      masterplanImage: '/home/projects/king-khalid/masterplan.webp',
      similarTitle: 'أعمال مشابهة',
      similarSubtitle: 'مشاريع نوعية تصنع قيمة حقيقية للمكان والمجتمع.',
      similarCtaText: 'استكشف جميع الأعمال',
      similarProjects: [
        {
          slug: 'estraha-retreat',
          category: 'متعدد الاستخدامات',
          title: 'استراحة',
          location: 'جدة، المملكة العربية السعودية',
          image: '/home/images/estraha.webp',
        },
        {
          slug: 'rafed-project',
          category: 'مساحات عامة',
          title: 'مشروع رافد',
          location: 'الخبر، المملكة العربية السعودية',
          image: '/home/images/rafed.webp',
        },
        {
          slug: 'el-wady-al-akhdar',
          category: 'سكني',
          title: 'الوادى الأخضر',
          location: 'الرياض، المملكة العربية السعودية',
          image: '/home/images/elwady.webp',
        },
      ],
    },
    en: {
      breadcrumbTitle: 'Rabwat Al-Ramez',
      title: 'King Khalid',
      categoryBadge: 'Integrated Residential Community',
      heroCaption: 'Rabwat Al-Ramez — A Vision for the Place',
      summary:
        'An integrated residential community designed around human comfort, shaded gathering, and a distinctive sense of place.',
      description:
        'Rabwat Al-Ramez is an integrated residential community designed to unite quality of life, untouched nature, and contemporary architecture. Green pockets and natural pathways seamlessly integrate with a calm urban design that respects the local climate.\n\nThe development delivers a balanced residential experience addressing modern family needs with comprehensive amenities, services, and expansive landscapes in northwest Riyadh.',
      metrics: [
        {
          value: '4',
          label: 'Core Community Zones',
          icon: 'sprout',
        },
        {
          value: '220',
          label: 'Residential Units',
          icon: 'building',
        },
        {
          value: '+30%',
          label: 'Quality of Life Improvement',
          icon: 'users',
        },
        {
          value: '+60%',
          label: 'Green Spaces',
          icon: 'trees',
        },
      ],
      highlightsTitle: 'Project Highlights',
      highlightsCtaText: 'Contact Us',
      highlights: [
        {
          title: 'Integrated Residential Community',
          description: 'Provides all pillars of contemporary modern living',
          icon: 'community',
        },
        {
          title: 'Balanced Natural Environment',
          description: 'Generous green corridors and natural walking trails',
          icon: 'nature',
        },
        {
          title: 'Comprehensive Amenities',
          description: 'Educational, recreational, and civic destinations',
          icon: 'services',
        },
        {
          title: 'Strategic Location',
          description: 'In the northwest growth corridor of Riyadh',
          icon: 'location',
        },
      ],
      overviewEyebrow: 'Project Overview',
      overviewHeading: 'Life Growing in Harmony with Nature',
      overviewDescription:
        'Rabwat Al-Ramez is an integrated residential community designed to unite quality of life, untouched nature, and contemporary architecture. Green pockets and natural pathways seamlessly integrate with a calm urban design that respects the local climate.\n\nThe development delivers a balanced residential experience addressing modern family needs with comprehensive amenities, services, and expansive landscapes in northwest Riyadh.',
      facts: [
        {
          label: 'Residential Units',
          value: '220 Units',
          icon: 'units',
        },
        {
          label: 'Development Year',
          value: '2024',
          icon: 'year',
        },
        {
          label: 'Scope of Services',
          value: 'Masterplanning, Landscape & Turnkey Design',
          icon: 'scope',
        },
        {
          label: 'Location',
          value: 'Northwest Riyadh',
          icon: 'location',
        },
        {
          label: 'Project Type',
          value: 'Integrated Residential Community',
          icon: 'type',
        },
        {
          label: 'Built-Up Area',
          value: '1,240,000 m²',
          icon: 'area',
        },
      ],
      galleryEyebrow: 'Photo Gallery',
      galleryHeading: 'Atmosphere of Place & Spirit of Community',
      galleryDescription:
        'Captured frames reflecting the local identity and living community.',
      galleryImages: [
        '/home/projects/king-khalid/gallery-1.webp',
        '/home/projects/king-khalid/gallery-2.webp',
        '/home/projects/king-khalid/gallery-3.webp',
      ],
      masterplanEyebrow: 'Masterplan',
      masterplanHeading: 'An Integrated Vision for the Place',
      masterplanDescription:
        'A comprehensive landscape framework balancing natural systems and contemporary living.',
      masterplanCtaText: 'View Masterplan',
      masterplanCaption: 'Rabwat Al-Ramez · Masterplan Architectural Drawing',
      masterplanEnlargeText: 'Enlarge Masterplan',
      masterplanImage: '/home/projects/king-khalid/masterplan.webp',
      similarTitle: 'Similar Projects',
      similarSubtitle:
        'Distinctive developments generating lasting value for place and society.',
      similarCtaText: 'Explore All Works',
      similarProjects: [
        {
          slug: 'estraha-retreat',
          category: 'Mixed-Use',
          title: 'Estraha',
          location: 'Jeddah, Kingdom of Saudi Arabia',
          image: '/home/images/estraha.webp',
        },
        {
          slug: 'rafed-project',
          category: 'Public Spaces',
          title: 'Rafed Project',
          location: 'Khobar, Kingdom of Saudi Arabia',
          image: '/home/images/rafed.webp',
        },
        {
          slug: 'el-wady-al-akhdar',
          category: 'Residential',
          title: 'El Wady Al Akhdar',
          location: 'Riyadh, Kingdom of Saudi Arabia',
          image: '/home/images/elwady.webp',
        },
      ],
    },
  },
  {
    slug: 'rafed-project',
    category: 'publicSpaces',
    heroImage: '/home/images/rafed.webp',
    ar: {
      breadcrumbTitle: 'مشروع رافد',
      title: 'مشروع رافد',
      categoryBadge: 'مساحات عامة',
      heroCaption: 'مشروع رافد — مساحات عامة تنبض بالحياة',
      summary:
        'بيئة عامة حيوية تعيد ربط الناس بالطبيعة عبر زراعة متكيفة وشوارع مظللة وأماكن لقاء اجتماعي.',
      description:
        'يحول المشروع المساحات المفتوحة إلى بيئة حضرية أكثر ترحيباً وأماناً واستدامة. يدمج التصميم حلول التنقل المريح، والظل الطبيعي، مع الحفاظ على الهوية البصرية والثقافية للمنطقة الشرقية.',
      metrics: [
        {
          value: '3',
          label: 'ساحات مفتوحة',
          icon: 'sprout',
        },
        {
          value: '9,600',
          label: 'م² مساحة التطوير',
          icon: 'building',
        },
        {
          value: '+45%',
          label: 'تحسن في حركة المشاة',
          icon: 'users',
        },
        {
          value: '+50%',
          label: 'مساحات ظل طبيعي',
          icon: 'trees',
        },
      ],
      highlightsTitle: 'أبرز مميزات المشروع',
      highlightsCtaText: 'تواصل معنا',
      highlights: [
        {
          title: 'فضاءات عامة مفتوحة',
          description: 'تصميم يوفر أقصى درجات الراحة والانسيابية',
          icon: 'community',
        },
        {
          title: 'نباتات محلية مستدامة',
          description: 'مقاومة للجفاف وتثري التنوع الحيوي',
          icon: 'nature',
        },
        {
          title: 'مسارات مشاة مظللة',
          description: 'تشجع على المشي والحياة الصحية اليومية',
          icon: 'services',
        },
        {
          title: 'موقع حيوي متصل',
          description: 'يربط بين أهم المعالم الحضرية بالخبر',
          icon: 'location',
        },
      ],
      overviewEyebrow: 'نبذة عن المشروع',
      overviewHeading: 'فضاء عام يعيد تعريف الحياة الحضرية',
      overviewDescription:
        'مشروع رافد هو نموذج متقدم للمساحات العامة التفاعلية، حيث تلتقي المتنزهات الحضرية بالهندسة البيئية المبتكرة لتشجيع المجتمع على التفاعل مع الطبيعة في بيئة متوازنة وآمنة.',
      facts: [
        {
          label: 'المساحة الإجمالية',
          value: '9,600 م²',
          icon: 'area',
        },
        {
          label: 'سنة التطوير',
          value: '2024',
          icon: 'year',
        },
        {
          label: 'نطاق الخدمات',
          value: 'تصميم المساحات العامة والمشهد الحضري',
          icon: 'scope',
        },
        {
          label: 'الموقع',
          value: 'الخبر، المملكة العربية السعودية',
          icon: 'location',
        },
        {
          label: 'نوع المشروع',
          value: 'مساحات عامة وتطوير حضري',
          icon: 'type',
        },
        {
          label: 'الحالة',
          value: 'مكتمل بنجاح',
          icon: 'units',
        },
      ],
      galleryEyebrow: 'معرض الصور',
      galleryHeading: 'تفاعل المجتمع مع المكان',
      galleryDescription: 'صور حية تبرز انسيابية الحركة وأثر التصميم في راحة الزوار.',
      galleryImages: [
        '/home/images/rafed.webp',
        '/home/images/Mountain garden.webp',
        '/home/images/why-makan-bg.webp',
      ],
      masterplanEyebrow: 'المخطط العام',
      masterplanHeading: 'مخطط الربط المكاني والمسارات الخضراء',
      masterplanDescription: 'تصميم استراتيجي يربط أطراف المدينة بمحاور خضراء مريحة.',
      masterplanCtaText: 'عرض المخطط العام',
      masterplanCaption: 'مشروع رافد · المخطط التفصيلي للممرات والساحات',
      masterplanEnlargeText: 'عرض المخطط بالحجم الكامل',
      masterplanImage: '/home/images/rafed.webp',
      similarTitle: 'أعمال مشابهة',
      similarSubtitle: 'مشاريع نوعية تصنع قيمة حقيقية للمكان والمجتمع.',
      similarCtaText: 'استكشف جميع الأعمال',
      similarProjects: [
        {
          slug: 'king-khalid',
          category: 'سكني',
          title: 'الملك خالد',
          location: 'الرياض، المملكة العربية السعودية',
          image: '/home/projects/king-khalid/hero.webp',
        },
        {
          slug: 'estraha-retreat',
          category: 'متعدد الاستخدامات',
          title: 'استراحة',
          location: 'جدة، المملكة العربية السعودية',
          image: '/home/images/estraha.webp',
        },
        {
          slug: 'el-wady-al-akhdar',
          category: 'سكني',
          title: 'الوادى الأخضر',
          location: 'الرياض، المملكة العربية السعودية',
          image: '/home/images/elwady.webp',
        },
      ],
    },
    en: {
      breadcrumbTitle: 'Rafed Project',
      title: 'Rafed Public Realm',
      categoryBadge: 'Public Spaces',
      heroCaption: 'Rafed Public Realm — Breathing Life Into Urban Spaces',
      summary:
        'A vibrant public realm reconnecting people with landscape through climate-adapted planting and social gathering nodes.',
      description:
        'The project transforms a public environment into an inviting, shaded, and walkable neighborhood node. The design integrates comfort, native vegetation, and distinctive civic character.',
      metrics: [
        {
          value: '3',
          label: 'Civic Plazas',
          icon: 'sprout',
        },
        {
          value: '9,600',
          label: 'm² Developed Realm',
          icon: 'building',
        },
        {
          value: '+45%',
          label: 'Pedestrian Flow Increase',
          icon: 'users',
        },
        {
          value: '+50%',
          label: 'Natural Shaded Areas',
          icon: 'trees',
        },
      ],
      highlightsTitle: 'Project Highlights',
      highlightsCtaText: 'Contact Us',
      highlights: [
        {
          title: 'Open Public Realm',
          description: 'Maximum ease of movement and pedestrian connectivity',
          icon: 'community',
        },
        {
          title: 'Resilient Native Planting',
          description: 'Drought-tolerant flora enriching local biodiversity',
          icon: 'nature',
        },
        {
          title: 'Shaded Pedestrian Corridors',
          description: 'Encouraging active daily lifestyle and wellness',
          icon: 'services',
        },
        {
          title: 'Strategic Urban Node',
          description: 'Connecting key waterfront and municipal arteries',
          icon: 'location',
        },
      ],
      overviewEyebrow: 'Project Overview',
      overviewHeading: 'Redefining Public Space for Communities',
      overviewDescription:
        'Rafed is an urban revitalization benchmark uniting ecology, human scale, and microclimate engineering into a restorative civic landscape.',
      facts: [
        {
          label: 'Total Area',
          value: '9,600 m²',
          icon: 'area',
        },
        {
          label: 'Development Year',
          value: '2024',
          icon: 'year',
        },
        {
          label: 'Scope of Services',
          value: 'Public Realm Planning & Landscape Architecture',
          icon: 'scope',
        },
        {
          label: 'Location',
          value: 'Khobar, Kingdom of Saudi Arabia',
          icon: 'location',
        },
        {
          label: 'Project Type',
          value: 'Public Realm & Urban Regeneration',
          icon: 'type',
        },
        {
          label: 'Status',
          value: 'Completed',
          icon: 'units',
        },
      ],
      galleryEyebrow: 'Photo Gallery',
      galleryHeading: 'Community Engagement and Daily Life',
      galleryDescription: 'Documenting human presence and the vitality of shaded green nodes.',
      galleryImages: [
        '/home/images/rafed.webp',
        '/home/images/Mountain garden.webp',
        '/home/images/why-makan-bg.webp',
      ],
      masterplanEyebrow: 'Masterplan',
      masterplanHeading: 'Urban Circulation & Green Infrastructure',
      masterplanDescription: 'A connected civic spine balancing active zones with contemplative gardens.',
      masterplanCtaText: 'View Masterplan',
      masterplanCaption: 'Rafed Project · Master Circulation & Landscape Layout',
      masterplanEnlargeText: 'Enlarge Masterplan',
      masterplanImage: '/home/images/rafed.webp',
      similarTitle: 'Similar Projects',
      similarSubtitle: 'Signature developments creating lasting value for communities.',
      similarCtaText: 'Explore All Works',
      similarProjects: [
        {
          slug: 'king-khalid',
          category: 'Residential',
          title: 'King Khalid',
          location: 'Riyadh, Kingdom of Saudi Arabia',
          image: '/home/projects/king-khalid/hero.webp',
        },
        {
          slug: 'estraha-retreat',
          category: 'Mixed-Use',
          title: 'Estraha Retreat',
          location: 'Jeddah, Kingdom of Saudi Arabia',
          image: '/home/images/estraha.webp',
        },
        {
          slug: 'el-wady-al-akhdar',
          category: 'Residential',
          title: 'El Wady Al Akhdar',
          location: 'Riyadh, Kingdom of Saudi Arabia',
          image: '/home/images/elwady.webp',
        },
      ],
    },
  },
  {
    slug: 'estraha-retreat',
    category: 'mixedUse',
    heroImage: '/home/images/estraha.webp',
    ar: {
      breadcrumbTitle: 'استراحة',
      title: 'استراحة',
      categoryBadge: 'متعدد الاستخدامات',
      heroCaption: 'استراحة — تجربة ضيافة تنسجم مع البحر والطبيعة',
      summary:
        'وجهة ضيافة وترفيه تجمع بين العمارة الساحلية والمشهد الطبيعي الخلاب لتوفير ملاذ هادئ ومميز.',
      description:
        'تمزج استراحة بين خدمات الضيافة الفاخرة والطبيعة المفتوحة. يتميز المشروع بمسطحات مائية هادئة وحدائق نخيل وظلال وارفة تعكس أصالة المكان وتمنح الزوار تجربة استرخاء لا تُنسى.',
      metrics: [
        {
          value: '2',
          label: 'بحيرات مائية طبيعية',
          icon: 'sprout',
        },
        {
          value: '14,200',
          label: 'م² مساحة المنتجع',
          icon: 'building',
        },
        {
          value: '+40%',
          label: 'زيادة الإقبال الموسمي',
          icon: 'users',
        },
        {
          value: '+55%',
          label: 'غطاء نباتي ساحلي',
          icon: 'trees',
        },
      ],
      highlightsTitle: 'أبرز مميزات المشروع',
      highlightsCtaText: 'تواصل معنا',
      highlights: [
        {
          title: 'واحات مائية ونخيل',
          description: 'تصميم مائي يلطف درجات الحرارة ويخلق أجواء شاعرية',
          icon: 'nature',
        },
        {
          title: 'ملاذ استجمام متكامل',
          description: 'مرافق صحية وضيافة راقية بأعلى المعايير',
          icon: 'community',
        },
        {
          title: 'إطلالات طبيعية مفتوحة',
          description: 'انسجام تام بين المساحات الداخلية والخارجية',
          icon: 'services',
        },
        {
          title: 'موقع ساحلي مميز',
          description: 'على مقربة من أهم شواطئ البحر الأحمر بجدة',
          icon: 'location',
        },
      ],
      overviewEyebrow: 'نبذة عن المشروع',
      overviewHeading: 'انسجام العمارة الساحلية مع الطبيعة',
      overviewDescription:
        'يقدم مشروع استراحة مفهوماً جديداً للمنتجعات الحضرية الساحلية، حيث تُسخَّر الطبيعة لتعزيز الراحة النفسية والجسدية عبر توزيع هندسي ذكي للعناصر المائية والغطاء النباتي.',
      facts: [
        {
          label: 'المساحة الإجمالية',
          value: '14,200 م²',
          icon: 'area',
        },
        {
          label: 'سنة التطوير',
          value: '2025',
          icon: 'year',
        },
        {
          label: 'نطاق الخدمات',
          value: 'تخطيط المشهد الطبيعي والتصميم الفندقي',
          icon: 'scope',
        },
        {
          label: 'الموقع',
          value: 'جدة، المملكة العربية السعودية',
          icon: 'location',
        },
        {
          label: 'نوع المشروع',
          value: 'منتجع ضيافة ومتعدد الاستخدامات',
          icon: 'type',
        },
        {
          label: 'الحالة',
          value: 'مكتمل بنجاح',
          icon: 'units',
        },
      ],
      galleryEyebrow: 'معرض الصور',
      galleryHeading: 'لقطات من المنتجع والواحات المائية',
      galleryDescription: 'أجواء استثنائية تجمع الفخامة بجمال الطبيعة الساحلية.',
      galleryImages: [
        '/home/images/estraha.webp',
        '/home/images/Mountain garden.webp',
        '/home/images/why-makan-bg.webp',
      ],
      masterplanEyebrow: 'المخطط العام',
      masterplanHeading: 'مخطط المنتجع والمسارات المائية',
      masterplanDescription: 'توزيع دقيق يضمن الخصوصية والإطلالات البانورامية لجميع الأجنحة.',
      masterplanCtaText: 'عرض المخطط العام',
      masterplanCaption: 'استراحة · المخطط المعماري والطبيعي',
      masterplanEnlargeText: 'عرض المخطط بالحجم الكامل',
      masterplanImage: '/home/images/estraha.webp',
      similarTitle: 'أعمال مشابهة',
      similarSubtitle: 'مشاريع نوعية تصنع قيمة حقيقية للمكان والمجتمع.',
      similarCtaText: 'استكشف جميع الأعمال',
      similarProjects: [
        {
          slug: 'king-khalid',
          category: 'سكني',
          title: 'الملك خالد',
          location: 'الرياض، المملكة العربية السعودية',
          image: '/home/projects/king-khalid/hero.webp',
        },
        {
          slug: 'rafed-project',
          category: 'مساحات عامة',
          title: 'مشروع رافد',
          location: 'الخبر، المملكة العربية السعودية',
          image: '/home/images/rafed.webp',
        },
        {
          slug: 'el-wady-al-akhdar',
          category: 'سكني',
          title: 'الوادى الأخضر',
          location: 'الرياض، المملكة العربية السعودية',
          image: '/home/images/elwady.webp',
        },
      ],
    },
    en: {
      breadcrumbTitle: 'Estraha',
      title: 'Estraha Retreat',
      categoryBadge: 'Mixed-Use',
      heroCaption: 'Estraha — Coastal Hospitality Harmonized With Nature',
      summary:
        'A mixed-use hospitality retreat blending coastal architecture and curated landscapes into a rejuvenating destination.',
      description:
        'Estraha weaves hospitality, wellness, and open garden sanctuaries together. Native palm groves, tranquil water reflecting pools, and shade structures deliver an indelible sense of tranquility.',
      metrics: [
        {
          value: '2',
          label: 'Reflecting Water Bodies',
          icon: 'sprout',
        },
        {
          value: '14,200',
          label: 'm² Resort Footprint',
          icon: 'building',
        },
        {
          value: '+40%',
          label: 'Guest Retention Growth',
          icon: 'users',
        },
        {
          value: '+55%',
          label: 'Native Coastal Flora',
          icon: 'trees',
        },
      ],
      highlightsTitle: 'Project Highlights',
      highlightsCtaText: 'Contact Us',
      highlights: [
        {
          title: 'Reflecting Pools & Palms',
          description: 'Passive microclimate cooling with tranquil vistas',
          icon: 'nature',
        },
        {
          title: 'Holistic Wellness Sanctuary',
          description: 'World-class hospitality amenities surrounded by greenery',
          icon: 'community',
        },
        {
          title: 'Seamless Indoor-Outdoor Flow',
          description: 'Direct terrace access to shaded gardens and pergolas',
          icon: 'services',
        },
        {
          title: 'Prime Coastal Location',
          description: 'Moments away from the serene Red Sea coastline in Jeddah',
          icon: 'location',
        },
      ],
      overviewEyebrow: 'Project Overview',
      overviewHeading: 'Coastal Hospitality Architecture in Synergy with Landscape',
      overviewDescription:
        'Estraha pioneers experiential wellness where architecture recedes and the therapeutic presence of water, light, and desert-adapted plants takes center stage.',
      facts: [
        {
          label: 'Total Footprint',
          value: '14,200 m²',
          icon: 'area',
        },
        {
          label: 'Development Year',
          value: '2025',
          icon: 'year',
        },
        {
          label: 'Scope of Services',
          value: 'Resort Masterplanning & Landscape Architecture',
          icon: 'scope',
        },
        {
          label: 'Location',
          value: 'Jeddah, Kingdom of Saudi Arabia',
          icon: 'location',
        },
        {
          label: 'Project Type',
          value: 'Hospitality & Mixed-Use Retreat',
          icon: 'type',
        },
        {
          label: 'Status',
          value: 'Completed',
          icon: 'units',
        },
      ],
      galleryEyebrow: 'Photo Gallery',
      galleryHeading: 'Glimpses of the Oasis and Reflection Pools',
      galleryDescription: 'Curated vistas framing calm waters, stone textures, and lush flora.',
      galleryImages: [
        '/home/images/estraha.webp',
        '/home/images/Mountain garden.webp',
        '/home/images/why-makan-bg.webp',
      ],
      masterplanEyebrow: 'Masterplan',
      masterplanHeading: 'Resort Framework and Water Circulation',
      masterplanDescription: 'Careful zoning ensuring intimacy for suites and seamless social courtyards.',
      masterplanCtaText: 'View Masterplan',
      masterplanCaption: 'Estraha Retreat · Architectural Masterplan & Water Layout',
      masterplanEnlargeText: 'Enlarge Masterplan',
      masterplanImage: '/home/images/estraha.webp',
      similarTitle: 'Similar Projects',
      similarSubtitle: 'Signature developments creating lasting value for communities.',
      similarCtaText: 'Explore All Works',
      similarProjects: [
        {
          slug: 'king-khalid',
          category: 'Residential',
          title: 'King Khalid',
          location: 'Riyadh, Kingdom of Saudi Arabia',
          image: '/home/projects/king-khalid/hero.webp',
        },
        {
          slug: 'rafed-project',
          category: 'Public Spaces',
          title: 'Rafed Project',
          location: 'Khobar, Kingdom of Saudi Arabia',
          image: '/home/images/rafed.webp',
        },
        {
          slug: 'el-wady-al-akhdar',
          category: 'Residential',
          title: 'El Wady Al Akhdar',
          location: 'Riyadh, Kingdom of Saudi Arabia',
          image: '/home/images/elwady.webp',
        },
      ],
    },
  },
  {
    slug: 'el-wady-al-akhdar',
    category: 'residential',
    heroImage: '/home/images/elwady.webp',
    ar: {
      breadcrumbTitle: 'الوادى الأخضر',
      title: 'الوادى الأخضر',
      categoryBadge: 'سكني',
      heroCaption: 'الوادى الأخضر — واحة سكنية هادئة في قلب الرياض',
      summary:
        'مشهد سكني رفيع المستوى يمزج بين خصوصية العائلة والمساحات الاجتماعية المشتركة ضمن بيئة طبيعية نجدية أصيلة.',
      description:
        'يخلق التصميم توازناً استثنائياً بين الحياة الخاصة واللحظات المجتمعية المشتركة. نُسِّقت العناصر الحجرية والمائية والغطاء النباتي المحلي لإثراء الحياة اليومية مع الحفاظ على التراث العمراني الأصيل.',
      metrics: [
        {
          value: '5',
          label: 'حدائق داخلية متصلة',
          icon: 'sprout',
        },
        {
          value: '17,400',
          label: 'م² مساحة المجتمع',
          icon: 'building',
        },
        {
          value: '+35%',
          label: 'كفاءة استهلاك المياه',
          icon: 'users',
        },
        {
          value: '+65%',
          label: 'غطاء نباتي نجدي',
          icon: 'trees',
        },
      ],
      highlightsTitle: 'أبرز مميزات المشروع',
      highlightsCtaText: 'تواصل معنا',
      highlights: [
        {
          title: 'عمارة نجدية معاصرة',
          description: 'مواد محلية تعبر عن أصالة المكان برؤية حديثة',
          icon: 'community',
        },
        {
          title: 'وادٍ بيئي مستدام',
          description: 'تجميع مياه الأمطار وتغذية الغطاء الأخضر طبيعياً',
          icon: 'nature',
        },
        {
          title: 'خصوصية عائلية تامة',
          description: 'تصميم يراعي التقاليد ويمنح كل مسكن استقلاليته',
          icon: 'services',
        },
        {
          title: 'موقع مميز بالرياض',
          description: 'قريب من محاور الحركة الرئيسية والخدمات الحيوية',
          icon: 'location',
        },
      ],
      overviewEyebrow: 'نبذة عن المشروع',
      overviewHeading: 'توازن دقيق بين الخصوصية والطبيعة المشتركة',
      overviewDescription:
        'الوادى الأخضر يمثل تجربة سكنية استثنائية تحتفي بجماليات الطبيعة المحلية عبر تكامل مدروس بين المساحات المفتوحة والمسارات المشجرة والفلل السكنية الفاخرة.',
      facts: [
        {
          label: 'المساحة الإجمالية',
          value: '17,400 م²',
          icon: 'area',
        },
        {
          label: 'سنة التطوير',
          value: '2023',
          icon: 'year',
        },
        {
          label: 'نطاق الخدمات',
          value: 'تخطيط عام وتصميم المشهد والتنفيذ',
          icon: 'scope',
        },
        {
          label: 'الموقع',
          value: 'الرياض، المملكة العربية السعودية',
          icon: 'location',
        },
        {
          label: 'نوع المشروع',
          value: 'مجتمع فلل سكنية فاخرة',
          icon: 'type',
        },
        {
          label: 'الحالة',
          value: 'مكتمل بنجاح',
          icon: 'units',
        },
      ],
      galleryEyebrow: 'معرض الصور',
      galleryHeading: 'لقطات من واحات وفناءات الوادي',
      galleryDescription: 'تفاصيل عمرانية ونباتية تعكس دفء المكان وتفرده.',
      galleryImages: [
        '/home/images/elwady.webp',
        '/home/images/rafed.webp',
        '/home/images/why-makan-bg.webp',
      ],
      masterplanEyebrow: 'المخطط العام',
      masterplanHeading: 'المخطط البيئي ومحاور الحركة',
      masterplanDescription: 'توزيع متناغم يربط الفلل بالحديقة المركزية عبر ممرات خضراء آمنة.',
      masterplanCtaText: 'عرض المخطط العام',
      masterplanCaption: 'الوادى الأخضر · المخطط الرئيسي للوحدات والحدائق',
      masterplanEnlargeText: 'عرض المخطط بالحجم الكامل',
      masterplanImage: '/home/images/elwady.webp',
      similarTitle: 'أعمال مشابهة',
      similarSubtitle: 'مشاريع نوعية تصنع قيمة حقيقية للمكان والمجتمع.',
      similarCtaText: 'استكشف جميع الأعمال',
      similarProjects: [
        {
          slug: 'king-khalid',
          category: 'سكني',
          title: 'الملك خالد',
          location: 'الرياض، المملكة العربية السعودية',
          image: '/home/projects/king-khalid/hero.webp',
        },
        {
          slug: 'rafed-project',
          category: 'مساحات عامة',
          title: 'مشروع رافد',
          location: 'الخبر، المملكة العربية السعودية',
          image: '/home/images/rafed.webp',
        },
        {
          slug: 'estraha-retreat',
          category: 'متعدد الاستخدامات',
          title: 'استراحة',
          location: 'جدة، المملكة العربية السعودية',
          image: '/home/images/estraha.webp',
        },
      ],
    },
    en: {
      breadcrumbTitle: 'El Wady Al Akhdar',
      title: 'El Wady Al Akhdar',
      categoryBadge: 'Residential',
      heroCaption: 'El Wady Al Akhdar — A Serene Oasis in the Heart of Riyadh',
      summary:
        'A high-value residential landscape blending community moments, privacy, and a soft desert palette into a cohesive family environment.',
      description:
        'The design creates an elegant balance between private living and shared social spaces. Materials, water features, and planting are coordinated to enrich the daily experience of residents while preserving cultural references.',
      metrics: [
        {
          value: '5',
          label: 'Interlinked Courtyards',
          icon: 'sprout',
        },
        {
          value: '17,400',
          label: 'm² Community Area',
          icon: 'building',
        },
        {
          value: '+35%',
          label: 'Water Conservation Efficiency',
          icon: 'users',
        },
        {
          value: '+65%',
          label: 'Indigenous Najdi Planting',
          icon: 'trees',
        },
      ],
      highlightsTitle: 'Project Highlights',
      highlightsCtaText: 'Contact Us',
      highlights: [
        {
          title: 'Contemporary Najdi Heritage',
          description: 'Locally quarried stone and authentic desert craftsmanship',
          icon: 'community',
        },
        {
          title: 'Living Ecological Wadi',
          description: 'Passive stormwater harvesting sustaining native flora',
          icon: 'nature',
        },
        {
          title: 'Complete Family Privacy',
          description: 'Screened gardens and sheltered intimate gathering zones',
          icon: 'services',
        },
        {
          title: 'Prestigious Riyadh Setting',
          description: 'Immediate connectivity to major cultural and business districts',
          icon: 'location',
        },
      ],
      overviewEyebrow: 'Project Overview',
      overviewHeading: 'An Elegant Balance of Privacy and Living Landscape',
      overviewDescription:
        'El Wady Al Akhdar stands as an architectural tribute to the desert landscape, weaving private villa compounds around a communal wadi corridor.',
      facts: [
        {
          label: 'Total Area',
          value: '17,400 m²',
          icon: 'area',
        },
        {
          label: 'Development Year',
          value: '2023',
          icon: 'year',
        },
        {
          label: 'Scope of Services',
          value: 'Masterplanning, Landscape Design & Build Oversight',
          icon: 'scope',
        },
        {
          label: 'Location',
          value: 'Riyadh, Kingdom of Saudi Arabia',
          icon: 'location',
        },
        {
          label: 'Project Type',
          value: 'Exclusive Residential Villa Community',
          icon: 'type',
        },
        {
          label: 'Status',
          value: 'Completed',
          icon: 'units',
        },
      ],
      galleryEyebrow: 'Photo Gallery',
      galleryHeading: 'Glimpses of the Oasis & Villa Courtyards',
      galleryDescription: 'Curated architectural details evoking warmth and local identity.',
      galleryImages: [
        '/home/images/elwady.webp',
        '/home/images/rafed.webp',
        '/home/images/why-makan-bg.webp',
      ],
      masterplanEyebrow: 'Masterplan',
      masterplanHeading: 'Ecological Masterplan & Shaded Corridors',
      masterplanDescription: 'Harmonious zoning linking residential villas to the central green spine.',
      masterplanCtaText: 'View Masterplan',
      masterplanCaption: 'El Wady Al Akhdar · Master Layout & Planting Scheme',
      masterplanEnlargeText: 'Enlarge Masterplan',
      masterplanImage: '/home/images/elwady.webp',
      similarTitle: 'Similar Projects',
      similarSubtitle: 'Signature developments creating lasting value for communities.',
      similarCtaText: 'Explore All Works',
      similarProjects: [
        {
          slug: 'king-khalid',
          category: 'Residential',
          title: 'King Khalid',
          location: 'Riyadh, Kingdom of Saudi Arabia',
          image: '/home/projects/king-khalid/hero.webp',
        },
        {
          slug: 'rafed-project',
          category: 'Public Spaces',
          title: 'Rafed Project',
          location: 'Khobar, Kingdom of Saudi Arabia',
          image: '/home/images/rafed.webp',
        },
        {
          slug: 'estraha-retreat',
          category: 'Mixed-Use',
          title: 'Estraha Retreat',
          location: 'Jeddah, Kingdom of Saudi Arabia',
          image: '/home/images/estraha.webp',
        },
      ],
    },
  },
]

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectDetails.find(
    (project) => project.slug === slug || (project.aliases && project.aliases.includes(slug))
  )
}

export function getProjectSlugs(): { slug: string }[] {
  const slugs: { slug: string }[] = []
  for (const project of projectDetails) {
    slugs.push({ slug: project.slug })
    if (project.aliases) {
      for (const alias of project.aliases) {
        slugs.push({ slug: alias })
      }
    }
  }
  return slugs
}
