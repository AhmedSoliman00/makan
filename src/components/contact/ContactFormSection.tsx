'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react'

export default function ContactFormSection() {
  const t = useTranslations('ContactPage')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  // Form State
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('')
  const [location, setLocation] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate lightweight instant submission feedback
    setTimeout(() => {
      setStatus('success')
      setFullName('')
      setEmail('')
      setProjectType('')
      setLocation('')
      setMessage('')
    }, 800)
  }

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className='w-full bg-[#FFFDF8] py-16 lg:py-24 transition-colors'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        <div className='flex flex-col lg:flex-row items-stretch gap-12 lg:gap-0'>
          
          {/* Main Inquiry Form Column */}
          <div className='w-full lg:flex-1 lg:pe-12 xl:pe-16'>
            {/* Form Header */}
            <div className='mb-8 sm:mb-10'>
              <h2 className='font-cairo text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#10201D] tracking-tight leading-tight'>
                {t('formSection.title')}
              </h2>
              <p className='mt-3.5 max-w-2xl font-cairo text-base sm:text-[17px] text-[#6F746F] leading-relaxed'>
                {t('formSection.subtitle')}
              </p>
            </div>

            {/* Submission Success Banner */}
            {status === 'success' && (
              <div className='mb-8 flex items-center gap-3 bg-[#F0F7F2] border border-[#A7D7B5] px-5 py-4 text-[#1E5631] font-cairo text-sm sm:text-base'>
                <CheckCircle2 className='h-5 w-5 shrink-0 text-[#2E7D32]' />
                <span>{t('formSection.success')}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Row 1: Name & Email */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6'>
                {/* Full Name */}
                <div className='space-y-2'>
                  <label
                    htmlFor='fullName'
                    className='block font-cairo font-medium text-[15px] text-[#10201D]'
                  >
                    {t('formSection.nameLabel')}
                  </label>
                  <input
                    id='fullName'
                    type='text'
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('formSection.namePlaceholder')}
                    className='w-full bg-[#FAF9F5] border border-[#EAE4D9] rounded-none px-4 py-3.5 text-[#10201D] placeholder:text-[#B6B5B0] focus:outline-none focus:border-[#C29959] focus:ring-1 focus:ring-[#C29959] transition-all font-cairo text-[15px]'
                  />
                </div>

                {/* Email Address */}
                <div className='space-y-2'>
                  <label
                    htmlFor='email'
                    className='block font-cairo font-medium text-[15px] text-[#10201D]'
                  >
                    {t('formSection.emailLabel')}
                  </label>
                  <input
                    id='email'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('formSection.emailPlaceholder')}
                    className='w-full bg-[#FAF9F5] border border-[#EAE4D9] rounded-none px-4 py-3.5 text-[#10201D] placeholder:text-[#B6B5B0] focus:outline-none focus:border-[#C29959] focus:ring-1 focus:ring-[#C29959] transition-all font-cairo text-[15px]'
                  />
                </div>
              </div>

              {/* Row 2: Project Type & City/Location */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6'>
                {/* Project Type */}
                <div className='space-y-2'>
                  <label
                    htmlFor='projectType'
                    className='block font-cairo font-medium text-[15px] text-[#10201D]'
                  >
                    {t('formSection.projectTypeLabel')}
                  </label>
                  <div className='relative'>
                    <select
                      id='projectType'
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className='w-full appearance-none bg-[#FAF9F5] border border-[#EAE4D9] rounded-none px-4 py-3.5 pe-10 text-[#10201D] focus:outline-none focus:border-[#C29959] focus:ring-1 focus:ring-[#C29959] transition-all font-cairo text-[15px] cursor-pointer'
                    >
                      <option value='' disabled>
                        {t('formSection.projectTypePlaceholder')}
                      </option>
                      <option value='residential'>{t('formSection.types.residential')}</option>
                      <option value='commercial'>{t('formSection.types.commercial')}</option>
                      <option value='hospitality'>{t('formSection.types.hospitality')}</option>
                      <option value='publicSpaces'>{t('formSection.types.publicSpaces')}</option>
                      <option value='mixedUse'>{t('formSection.types.mixedUse')}</option>
                      <option value='masterplan'>{t('formSection.types.masterplan')}</option>
                      <option value='other'>{t('formSection.types.other')}</option>
                    </select>
                    <ChevronDown className='pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6F746F]' />
                  </div>
                </div>

                {/* City / Location */}
                <div className='space-y-2'>
                  <label
                    htmlFor='location'
                    className='block font-cairo font-medium text-[15px] text-[#10201D]'
                  >
                    {t('formSection.locationLabel')}
                  </label>
                  <input
                    id='location'
                    type='text'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t('formSection.locationPlaceholder')}
                    className='w-full bg-[#FAF9F5] border border-[#EAE4D9] rounded-none px-4 py-3.5 text-[#10201D] placeholder:text-[#B6B5B0] focus:outline-none focus:border-[#C29959] focus:ring-1 focus:ring-[#C29959] transition-all font-cairo text-[15px]'
                  />
                </div>
              </div>

              {/* Row 3: Message Textarea */}
              <div className='space-y-2'>
                <label
                  htmlFor='message'
                  className='block font-cairo font-medium text-[15px] text-[#10201D]'
                >
                  {t('formSection.messageLabel')}
                </label>
                <textarea
                  id='message'
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('formSection.messagePlaceholder')}
                  className='w-full bg-[#FAF9F5] border border-[#EAE4D9] rounded-none px-4 py-3.5 text-[#10201D] placeholder:text-[#B6B5B0] focus:outline-none focus:border-[#C29959] focus:ring-1 focus:ring-[#C29959] transition-all font-cairo text-[15px] resize-none'
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={status === 'submitting'}
                className='w-full inline-flex items-center justify-center gap-3 bg-[#082621] hover:bg-[#123831] text-white font-cairo font-medium text-base py-4 px-8 rounded-none transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-70 group'
              >
                <span>
                  {status === 'submitting'
                    ? t('formSection.submitting')
                    : t('formSection.submit')}
                </span>
                <ArrowIcon className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1' />
              </button>
            </form>
          </div>

          {/* Vertical Divider between the two columns */}
          <div className='hidden lg:block w-[1px] bg-[#E5E0D7] self-stretch my-2 shrink-0' />

          {/* Contact Details Column */}
          <div className='w-full lg:w-[380px] xl:w-[420px] lg:ps-12 xl:ps-16 shrink-0 space-y-10'>
            <div>
              <h2 className='font-cairo text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#10201D] tracking-tight leading-tight'>
                {t('infoSection.title')}
              </h2>
            </div>

            {/* Contact Details List */}
            <div className='space-y-7'>
              {/* Email */}
              <div className='flex items-start gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5F1E9] text-[#C29959] transition-transform hover:scale-105'>
                  <Mail className='h-5 w-5' />
                </div>
                <div className='pt-1'>
                  <p className='font-cairo font-bold text-base text-[#10201D]'>
                    {t('infoSection.emailLabel')}
                  </p>
                  <a
                    href={`mailto:${t('infoSection.emailValue')}`}
                    className='mt-1 block font-cairo text-[15px] text-[#6F746F] hover:text-[#C29959] transition-colors'
                    dir='ltr'
                  >
                    {t('infoSection.emailValue')}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className='flex items-start gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5F1E9] text-[#C29959] transition-transform hover:scale-105'>
                  <Phone className='h-5 w-5' />
                </div>
                <div className='pt-1'>
                  <p className='font-cairo font-bold text-base text-[#10201D]'>
                    {t('infoSection.phoneLabel')}
                  </p>
                  <a
                    href={`tel:${t('infoSection.phoneValue').replace(/\s+/g, '')}`}
                    className='mt-1 block font-cairo text-[15px] text-[#6F746F] hover:text-[#C29959] transition-colors'
                    dir='ltr'
                  >
                    {t('infoSection.phoneValue')}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className='flex items-start gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5F1E9] text-[#C29959] transition-transform hover:scale-105'>
                  <MapPin className='h-5 w-5' />
                </div>
                <div className='pt-1'>
                  <p className='font-cairo font-bold text-base text-[#10201D]'>
                    {t('infoSection.locationLabel')}
                  </p>
                  <p className='mt-1 font-cairo text-[15px] text-[#6F746F] leading-relaxed'>
                    {t('infoSection.locationValue')}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className='flex items-start gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5F1E9] text-[#C29959] transition-transform hover:scale-105'>
                  <Clock className='h-5 w-5' />
                </div>
                <div className='pt-1'>
                  <p className='font-cairo font-bold text-base text-[#10201D]'>
                    {t('infoSection.hoursLabel')}
                  </p>
                  <p className='mt-1 font-cairo text-[15px] text-[#6F746F]'>
                    {t('infoSection.hoursDays')}
                  </p>
                  <p className='font-cairo text-[15px] text-[#6F746F]'>
                    {t('infoSection.hoursTime')}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className='pt-4 border-t border-[#EAE4D9]/60'>
              <h3 className='font-cairo font-bold text-lg text-[#C29959] mb-4'>
                {t('infoSection.socialTitle')}
              </h3>
              <div className='flex items-center gap-3'>
                {/* LinkedIn */}
                <a
                  href='https://linkedin.com'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='LinkedIn'
                  className='flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CEBF] text-[#10201D] font-bold text-sm transition-all hover:border-[#10201D] hover:bg-[#10201D] hover:text-white'
                >
                  in
                </a>

                {/* Instagram */}
                <a
                  href='https://instagram.com'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='Instagram'
                  className='flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CEBF] text-[#10201D] transition-all hover:border-[#10201D] hover:bg-[#10201D] hover:text-white'
                >
                  <svg className='h-4 w-4 fill-currentColor' viewBox='0 0 24 24'>
                    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                  </svg>
                </a>

                {/* X */}
                <a
                  href='https://x.com'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='X'
                  className='flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CEBF] text-[#10201D] font-bold text-sm transition-all hover:border-[#10201D] hover:bg-[#10201D] hover:text-white'
                >
                  <svg className='h-3.5 w-3.5 fill-currentColor' viewBox='0 0 24 24'>
                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href='https://youtube.com'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='YouTube'
                  className='flex h-11 w-11 items-center justify-center rounded-full border border-[#D8CEBF] text-[#10201D] transition-all hover:border-[#10201D] hover:bg-[#10201D] hover:text-white'
                >
                  <svg className='h-4 w-4 fill-currentColor' viewBox='0 0 24 24'>
                    <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
