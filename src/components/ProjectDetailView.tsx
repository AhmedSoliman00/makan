'use client'

import { useState } from 'react'
import type { LocalizedProjectDetail } from '@/lib/project-details'
import ProjectBreadcrumb from './project-detail/ProjectBreadcrumb'
import ProjectHero from './project-detail/ProjectHero'
import ProjectMetricsBar from './project-detail/ProjectMetricsBar'
import ProjectStorySection from './project-detail/ProjectStorySection'
import ProjectGallery from './project-detail/ProjectGallery'
import ProjectMasterplan from './project-detail/ProjectMasterplan'
import ProjectSimilarWorks from './project-detail/ProjectSimilarWorks'
import ImageLightboxModal from './project-detail/ImageLightboxModal'

type ProjectDetailViewProps = {
  project: LocalizedProjectDetail
  heroImage: string
  locale: string
}

export default function ProjectDetailView({
  project,
  heroImage,
  locale,
}: ProjectDetailViewProps) {
  const isRtl = locale === 'ar'
  const [lightboxImage, setLightboxImage] = useState<{
    src: string
    alt: string
  } | null>(null)

  return (
    <div className='w-full bg-[#fffdf8] text-[#10201D]'>
      <ProjectBreadcrumb
        breadcrumbTitle={project.breadcrumbTitle}
        locale={locale}
      />

      <ProjectHero
        title={project.title}
        categoryBadge={project.categoryBadge}
        heroCaption={project.heroCaption}
        heroImage={heroImage}
        isRtl={isRtl}
      />

      {project.metrics && project.metrics.length > 0 && (
        <ProjectMetricsBar metrics={project.metrics} />
      )}

      <ProjectStorySection
        highlightsTitle={project.highlightsTitle}
        highlightsCtaText={project.highlightsCtaText}
        highlights={project.highlights}
        overviewEyebrow={project.overviewEyebrow}
        overviewHeading={project.overviewHeading}
        overviewDescription={project.overviewDescription}
        facts={project.facts}
        isRtl={isRtl}
      />

      {project.galleryImages && project.galleryImages.length > 0 && (
        <ProjectGallery
          eyebrow={project.galleryEyebrow}
          heading={project.galleryHeading}
          description={project.galleryDescription}
          images={project.galleryImages}
          projectTitle={project.title}
          onImageClick={(src, alt) => setLightboxImage({ src, alt })}
        />
      )}

      {project.masterplanImage && project.masterplanImage.trim() !== '' && (
        <ProjectMasterplan
          eyebrow={project.masterplanEyebrow}
          heading={project.masterplanHeading}
          description={project.masterplanDescription}
          ctaText={project.masterplanCtaText}
          image={project.masterplanImage}
          caption={project.masterplanCaption}
          enlargeText={project.masterplanEnlargeText}
          isRtl={isRtl}
          onEnlargeClick={() =>
            setLightboxImage({
              src: project.masterplanImage,
              alt: project.masterplanCaption,
            })
          }
        />
      )}

      {project.similarProjects && project.similarProjects.length > 0 && (
        <ProjectSimilarWorks
          title={project.similarTitle}
          subtitle={project.similarSubtitle}
          ctaText={project.similarCtaText}
          similarProjects={project.similarProjects}
          isRtl={isRtl}
        />
      )}

      <ImageLightboxModal
        isOpen={Boolean(lightboxImage)}
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  )
}
