'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteTeamMemberAction } from '@/actions/team'

export default function TeamDeleteButton({
  id,
  name,
  confirmMessage,
}: {
  id: string
  name: string
  confirmMessage?: string
}) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const msg =
      confirmMessage ||
      `Are you sure you want to remove "${name}" from the team?`
    if (window.confirm(msg)) {
      startTransition(async () => {
        await deleteTeamMemberAction(id)
      })
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
      title="Delete Member"
      aria-label="Delete Member"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
