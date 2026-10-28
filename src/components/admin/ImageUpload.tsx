'use client'

import { useState, useRef, useTransition } from 'react'
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2, Link2, X } from 'lucide-react'
import { uploadImageAction } from '@/actions/upload'

type ImageUploadProps = {
  label: string
  value: string
  onChange: (url: string) => void
  type?: 'hero' | 'portrait' | 'general'
  aspectRatio?: 'landscape' | 'portrait' | 'square'
  hint?: string
}

export default function ImageUpload({
  label,
  value,
  onChange,
  type = 'general',
  aspectRatio = 'landscape',
  hint,
}: ImageUploadProps) {
  const [isPending, startTransition] = useTransition()
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showUrlInput, setShowUrlInput] = useState(!value.startsWith('/uploads/'))
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setError(null)
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, WebP).')
      return
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('Image exceeds the maximum allowed size of 20MB.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    startTransition(async () => {
      const res = await uploadImageAction(formData)
      if (res.success && res.url) {
        onChange(res.url)
      } else {
        setError(res.error || 'Upload failed.')
      }
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const aspectClass =
    aspectRatio === 'portrait'
      ? 'aspect-[3/4] max-w-[200px]'
      : aspectRatio === 'square'
      ? 'aspect-square max-w-[200px]'
      : 'aspect-[16/9] w-full'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-medium text-[#C29959] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Link2 className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL Input' : 'Direct URL'}</span>
        </button>
      </div>

      {error && (
        <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Upload Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-[#C29959] bg-[#C29959]/5 scale-[0.99]'
            : 'border-[#DBC9AD]/70 hover:border-[#C29959] bg-[#FAF8F5]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0])
            }
          }}
        />

        {value ? (
          <div className="flex flex-col items-center gap-3">
            <div className={`relative overflow-hidden rounded-lg bg-zinc-100 border border-[#EAE4D8] ${aspectClass}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Uploaded Preview" className="w-full h-full object-cover" />
              {isPending && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#C29959]" />
                  <span className="text-xs font-medium">Optimizing with Sharp...</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#6F746F]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="truncate max-w-[260px] font-mono text-[11px]">{value}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange('')
                }}
                className="p-1 text-zinc-400 hover:text-red-600 rounded"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center gap-2 text-[#6F746F]">
            {isPending ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-[#C29959]" />
                <p className="text-xs font-medium text-[#082621]">Optimizing & converting to WebP...</p>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-[#082621]/5 flex items-center justify-center text-[#C29959]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#082621]">
                    Click to upload or drag & drop photo
                  </p>
                  <p className="text-[11px] text-[#6F746F] mt-0.5">
                    JPEG, PNG, WebP (auto-optimized to WebP)
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Direct URL text field fallback */}
      {showUrlInput && (
        <div className="pt-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/home/images/hero.webp or https://..."
            className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#C29959]"
          />
        </div>
      )}

      {hint && <p className="text-[11px] text-[#6F746F]">{hint}</p>}
    </div>
  )
}
