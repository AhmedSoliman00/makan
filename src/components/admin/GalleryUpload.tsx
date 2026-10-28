'use client'

import { useState, useRef, useTransition } from 'react'
import { UploadCloud, Trash2, Loader2, Plus, Code, Eye, AlertCircle } from 'lucide-react'
import { uploadImageAction } from '@/actions/upload'

type GalleryUploadProps = {
  images: string[]
  onChange: (images: string[]) => void
}

export default function GalleryUpload({ images, onChange }: GalleryUploadProps) {
  const [isPending, startTransition] = useTransition()
  const [showRawText, setShowRawText] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (fileList: FileList) => {
    setError(null)
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'))
    if (files.length === 0) return

    const oversized = files.some((f) => f.size > 20 * 1024 * 1024)
    if (oversized) {
      setError('One or more files exceed the 20MB limit. Please choose smaller images.')
      return
    }

    startTransition(async () => {
      try {
        const uploadPromises = files.map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('type', 'gallery')
          const res = await uploadImageAction(formData)
          return res.success && res.url ? res.url : null
        })

        const results = await Promise.all(uploadPromises)
        const validUrls = results.filter((url): url is string => Boolean(url))

        if (validUrls.length > 0) {
          onChange([...images, ...validUrls])
        }
        if (validUrls.length < files.length) {
          setError('Some images failed to upload. Please try again.')
        }
      } catch (err: any) {
        setError(err.message || 'Upload failed.')
      }
    })
  }

  const handleRemove = (index: number) => {
    const next = [...images]
    next.splice(index, 1)
    onChange(next)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider">
          Project Gallery Photography ({images.length} images)
        </label>
        <button
          type="button"
          onClick={() => setShowRawText(!showRawText)}
          className="text-[11px] font-medium text-[#C29959] hover:underline flex items-center gap-1 cursor-pointer"
        >
          {showRawText ? <Eye className="w-3 h-3" /> : <Code className="w-3 h-3" />}
          <span>{showRawText ? 'Visual View' : 'Raw URLs View'}</span>
        </button>
      </div>

      {error && (
        <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {showRawText ? (
        <textarea
          rows={5}
          value={images.join('\n')}
          onChange={(e) =>
            onChange(
              e.target.value
                .split('\n')
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          placeholder="/home/images/rafed.webp&#10;/home/images/estraha.webp"
          className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#C29959]"
        />
      ) : (
        <div className="space-y-4">
          {/* Thumbnails grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-zinc-100 border border-[#EAE4D8]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add more button / dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#DBC9AD]/70 hover:border-[#C29959] rounded-xl p-4 text-center cursor-pointer bg-[#FAF8F5] transition-all flex flex-col items-center justify-center gap-2"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFiles(e.target.files)
                }
              }}
            />

            {isPending ? (
              <div className="flex items-center gap-2 text-xs font-medium text-[#082621]">
                <Loader2 className="w-4 h-4 animate-spin text-[#C29959]" />
                <span>Optimizing and uploading images to VPS...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-medium text-[#082621]">
                <Plus className="w-4 h-4 text-[#C29959]" />
                <span>Click to select multiple gallery photos (auto-converts to WebP)</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
