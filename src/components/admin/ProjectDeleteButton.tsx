'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteProjectAction } from '@/actions/projects'

export default function ProjectDeleteButton({
  id,
  title,
  confirmMessage,
}: {
  id: string
  title: string
  confirmMessage?: string
}) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const msg =
      confirmMessage ||
      `Are you sure you want to delete "${title}"? This cannot be undone.`
    if (window.confirm(msg)) {
      startTransition(async () => {
        await deleteProjectAction(id)
      })
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
      title="Delete Project"
      aria-label="Delete Project"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
