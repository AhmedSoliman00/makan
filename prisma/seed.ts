import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { catalogueProjects } from '../src/lib/projects-catalogue'
import { projectDetails } from '../src/lib/project-details'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Makan Landscape database...')

  // 1. Create Default Admin User
  const adminEmail = 'admin@makan.sa'
  const passwordHash = await bcrypt.hash('Admin123!@#', 10)

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      name: 'Makan Admin',
      passwordHash,
    },
  })
  console.log('Admin user initialized:', admin.email)

  // 2. Clear old data to ensure clean seed
  await prisma.projectTranslation.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.teamMemberTranslation.deleteMany({})
  await prisma.teamMember.deleteMany({})

  // 3. Seed Projects
  const detailMap = new Map<string, (typeof projectDetails)[number]>()
  for (const detail of projectDetails) {
    detailMap.set(detail.slug, detail)
    if (detail.aliases) {
      for (const alias of detail.aliases) {
        detailMap.set(alias, detail)
      }
    }
  }

  const fallbackDetail = projectDetails[0]

  for (let i = 0; i < catalogueProjects.length; i++) {
    const cp = catalogueProjects[i]
    const matched = detailMap.get(cp.slug) || fallbackDetail

    const project = await prisma.project.create({
      data: {
        slug: cp.id,
        category: cp.category,
        cityKey: cp.cityKey || 'riyadh',
        statusKey: cp.statusKey || 'completed',
        heroImage: cp.image || matched.heroImage,
        order: i,
        isFeatured: i < 3,
        translations: {
          create: [
            {
              locale: 'ar',
              breadcrumbTitle: matched.ar.breadcrumbTitle,
              title: matched.ar.title + (cp.id !== cp.slug ? ` (${cp.id})` : ''),
              categoryBadge: matched.ar.categoryBadge,
              heroCaption: matched.ar.heroCaption,
              summary: matched.ar.summary,
              description: matched.ar.description,
              metrics: JSON.stringify(matched.ar.metrics || []),
              highlightsTitle: matched.ar.highlightsTitle || '',
              highlightsCtaText: matched.ar.highlightsCtaText || '',
              highlights: JSON.stringify(matched.ar.highlights || []),
              overviewEyebrow: matched.ar.overviewEyebrow || '',
              overviewHeading: matched.ar.overviewHeading || '',
              overviewDescription: matched.ar.overviewDescription || '',
              facts: JSON.stringify(matched.ar.facts || []),
              galleryEyebrow: matched.ar.galleryEyebrow || '',
              galleryHeading: matched.ar.galleryHeading || '',
              galleryDescription: matched.ar.galleryDescription || '',
              galleryImages: JSON.stringify(matched.ar.galleryImages || []),
              masterplanEyebrow: matched.ar.masterplanEyebrow || '',
              masterplanHeading: matched.ar.masterplanHeading || '',
              masterplanDescription: matched.ar.masterplanDescription || '',
              masterplanCtaText: matched.ar.masterplanCtaText || '',
              masterplanCaption: matched.ar.masterplanCaption || '',
              masterplanEnlargeText: matched.ar.masterplanEnlargeText || '',
              masterplanImage: matched.ar.masterplanImage || '',
              similarTitle: matched.ar.similarTitle || '',
              similarSubtitle: matched.ar.similarSubtitle || '',
              similarCtaText: matched.ar.similarCtaText || '',
              similarProjects: JSON.stringify(matched.ar.similarProjects || []),
            },
            {
              locale: 'en',
              breadcrumbTitle: matched.en.breadcrumbTitle,
              title: matched.en.title + (cp.id !== cp.slug ? ` (${cp.id})` : ''),
              categoryBadge: matched.en.categoryBadge,
              heroCaption: matched.en.heroCaption,
              summary: matched.en.summary,
              description: matched.en.description,
              metrics: JSON.stringify(matched.en.metrics || []),
              highlightsTitle: matched.en.highlightsTitle || '',
              highlightsCtaText: matched.en.highlightsCtaText || '',
              highlights: JSON.stringify(matched.en.highlights || []),
              overviewEyebrow: matched.en.overviewEyebrow || '',
              overviewHeading: matched.en.overviewHeading || '',
              overviewDescription: matched.en.overviewDescription || '',
              facts: JSON.stringify(matched.en.facts || []),
              galleryEyebrow: matched.en.galleryEyebrow || '',
              galleryHeading: matched.en.galleryHeading || '',
              galleryDescription: matched.en.galleryDescription || '',
              galleryImages: JSON.stringify(matched.en.galleryImages || []),
              masterplanEyebrow: matched.en.masterplanEyebrow || '',
              masterplanHeading: matched.en.masterplanHeading || '',
              masterplanDescription: matched.en.masterplanDescription || '',
              masterplanCtaText: matched.en.masterplanCtaText || '',
              masterplanCaption: matched.en.masterplanCaption || '',
              masterplanEnlargeText: matched.en.masterplanEnlargeText || '',
              masterplanImage: matched.en.masterplanImage || '',
              similarTitle: matched.en.similarTitle || '',
              similarSubtitle: matched.en.similarSubtitle || '',
              similarCtaText: matched.en.similarCtaText || '',
              similarProjects: JSON.stringify(matched.en.similarProjects || []),
            },
          ],
        },
      },
    })
    console.log(`Created Project [${project.category}]: ${project.slug}`)
  }

  // 4. Seed Team Members
  const initialMembers = [
    {
      order: 1,
      image: '/home/people/team-member.webp',
      ar: {
        name: 'المهندس محمد عبدالله',
        role: 'شريك مؤسس وكبير مهندسي اللاندسكيب',
        description:
          'يقود الرؤية التصميمية والتخطيطية في مكان بخبرة تتجاوز 12 عاماً في تطوير المشهد العمراني والحدائق العامة والمجتمعات السكنية الكبرى بالمملكة.',
      },
      en: {
        name: 'Eng. Mohammed Abdullah',
        role: 'Co-Founder & Chief Landscape Architect',
        description:
          'Leads the spatial planning and design vision at Makan with over 12 years of experience developing signature urban realms, parks, and masterplanned communities.',
      },
    },
    {
      order: 2,
      image: '/home/people/team-member.webp',
      ar: {
        name: 'المهندسة سارة القحطاني',
        role: 'رئيس قسم عمارة البيئة',
        description:
          'متخصصة في مواءمة النظم البيئية المحلية الصحراوية مع فنون التصميم المعاصر لإنتاج مساحات خضراء بيئية تدوم للأجيال القادمة.',
      },
      en: {
        name: 'Eng. Sarah Al-Qahtani',
        role: 'Head of Landscape Architecture',
        description:
          'Specializes in harmonizing endemic desert biodiversity with forward-thinking contemporary design to create enduring ecological public spaces.',
      },
    },
    {
      order: 3,
      image: '/home/people/team-member.webp',
      ar: {
        name: 'المهندس طارق النجار',
        role: 'مدير إدارة المشاريع والتنفيذ',
        description:
          'خبير في إدارة العمليات الإنشائية وتحويل الرسومات المفاهيمية إلى واقع بجودة استثنائية مع الالتزام بأعلى معايير الحرفية والجدول الزمني.',
      },
      en: {
        name: 'Eng. Tariq Al-Najjar',
        role: 'Director of Project Management & Delivery',
        description:
          'Expert in construction governance, translating architectural blueprints into turnkey realities with uncompromising quality, safety, and timing.',
      },
    },
    {
      order: 4,
      image: '/home/people/team-member.webp',
      ar: {
        name: 'المهندسة ريم الشهري',
        role: 'مسؤولة التخطيط الحضري وصناعة المكان',
        description:
          'تركز على خلق تجارب إنسانية حيوية تمنح المساحات هوية مميزة وتُحفز التفاعل المجتمعي والشعور بالانتماء.',
      },
      en: {
        name: 'Eng. Reem Al-Shehri',
        role: 'Urban Planning & Placemaking Lead',
        description:
          'Focuses on orchestrating human-centric spatial experiences that instill destinations with character, social vitality, and community belonging.',
      },
    },
    {
      order: 5,
      image: '/home/people/team-member.webp',
      ar: {
        name: 'المهندس خالد الفهد',
        role: 'كبير مهندسي الإشراف الموقعي والجودة',
        description:
          'يشرف على التفاصيل التنفيذية للأعمال الصلبة واللينة وأنظمة الري الذكية لضمان مطابقة أعلى مواصفات الاستدامة والمتانة.',
      },
      en: {
        name: 'Eng. Khalid Al-Fahad',
        role: 'Senior Site Supervision & QA Engineer',
        description:
          'Oversees meticulous hardscape craftsmanship, native planting precision, and automated smart irrigation systems for lasting performance.',
      },
    },
    {
      order: 6,
      image: '/home/people/team-member.webp',
      ar: {
        name: 'المهندسة نورة المنصور',
        role: 'أخصائية الاستدامة وأبحاث النباتات المحلية',
        description:
          'تبحث في استراتيجيات تقليل البصمة الكربونية وترشيد المياه عبر توظيف النباتات المحلية المتأقلمة والحلول الصديقة للبيئة.',
      },
      en: {
        name: 'Eng. Noura Al-Mansour',
        role: 'Sustainability & Native Flora Specialist',
        description:
          'Researches climate resilience and water-efficiency strategies, curating drought-resilient native vegetation palettes tailored to Saudi conditions.',
      },
    },
  ]

  for (const m of initialMembers) {
    const member = await prisma.teamMember.create({
      data: {
        image: m.image,
        order: m.order,
        translations: {
          create: [
            {
              locale: 'ar',
              name: m.ar.name,
              role: m.ar.role,
              description: m.ar.description,
            },
            {
              locale: 'en',
              name: m.en.name,
              role: m.en.role,
              description: m.en.description,
            },
          ],
        },
      },
    })
    console.log(`Created Team Member: ${m.en.name}`)
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
