'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

type ImageLightboxModalProps = {
  isOpen: boolean
  image: { src: string; alt: string } | null
  onClose: () => void
}

export default function ImageLightboxModal({
  isOpen,
  image,
  onClose,
}: ImageLightboxModalProps) {
  // Close lightbox on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !image) return null

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label='Enlarged image'
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200'
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type='button'
        onClick={onClose}
        className='absolute top-5 end-5 z-[101] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white cursor-pointer'
        aria-label='Close'
      >
        <X className='h-6 w-6' />
      </button>

      {/* Modal Content */}
      <div
        className='relative max-h-[90vh] max-w-[95vw] overflow-hidden rounded-[16px] shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='relative h-[60vh] sm:h-[80vh] w-[90vw] sm:w-[85vw] max-w-[1400px]'>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className='object-contain'
            sizes='95vw'
            priority
          />
        </div>
        {image.alt && (
          <div className='absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-4 text-center'>
            <p className='font-cairo text-sm text-white/90'>{image.alt}</p>
          </div>
        )}
      </div>
    </div>
  )
}
