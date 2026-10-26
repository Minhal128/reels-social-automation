'use client'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Attachment, BlogCardProps, Category, Tag } from '@/types'
import { Calendar, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getRowStatusConfig } from '@/data/blog'

export function BlogListRow({
  blog,
  onEdit,
  onDelete,
  onReadMore,
  isSelected,
  onSelectChange,
}: BlogCardProps) {
  const { t } = useTranslation()
  const thumbnail = blog.thumbnail_id as Attachment
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [menuOpen])

  const statusConfig = getRowStatusConfig(t)
  const statusKey = (typeof blog.status === 'string' ? blog.status : 'draft') || 'draft'
  const sCfg = statusConfig[statusKey] ?? statusConfig.draft

  const handleRowClick = () => {
    if (onReadMore) {
      onReadMore()
    }
  }

  return (
    <div
      className="group flex items-center gap-0 border-b border-glass-border hover:bg-muted/30 dark:hover:bg-white/3 transition-colors cursor-pointer"
      onClick={handleRowClick}
    >
      {/* Checkbox — stops propagation so clicking it doesn't navigate */}
      {onSelectChange && (
        <div className="flex-shrink-0 w-10 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={isSelected}
            onCheckedChange={(c) => onSelectChange(!!c)}
            className="h-4 w-4 rounded border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
        </div>
      )}

      {/* Thumbnail */}
      <div className="flex-shrink-0 w-14 h-14 my-2 ml-2  overflow-hidden bg-muted relative rounded-border-radius-inner ">
        {thumbnail ? (
          <Image
            fill
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL || ''}/${typeof thumbnail === 'string' ? thumbnail : thumbnail.file_path}`}
            alt={blog.title}
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <span className="text-base font-bold text-primary">{blog.title.charAt(0)}</span>
          </div>
        )}
      </div>

      {/* Title + excerpt + tags — flex-1 to fill BLOG column */}
      <div className="flex-1 max-w-[700px] px-4 py-3">
        <p className="text-sm font-semibold text-title-color dark:text-white truncate">{blog.title}</p>
        {blog.description && <p className="text-xs text-muted-foreground truncate mt-0.5">{blog.description}</p>}
        <div className="flex flex-wrap gap-1 mt-1">
          {(blog.tags as Tag[]).slice(0, 3).map((tag) => (
            <Badge
              key={tag._id || (tag as any).id}
              className="bg-primary/10 text-primary border-primary/10 text-2xs px-2 py-0.5 rounded-full font-normal mt-0.5"
            >
              #{tag.title}
            </Badge>
          ))}
        </div>
      </div>

      {/* Category — matches w-32 header */}
      <div className="flex-shrink-0 w-50 px-2 flex items-center">
        {(blog.categories as Category[]).slice(0, 1).map((cat) => (
          <Badge
            key={cat._id || cat.id}
            className="bg-primary/10 dark:bg-white/3 text-slate-700 dark:text-white border-0 text-xs px-2.5 py-1 rounded-full capitalize font-normal max-w-full"
            title={cat.name}
          >
            <span className="truncate block w-full">{cat.name}</span>
          </Badge>
        ))}
      </div>

      {/* Status — matches w-32 header */}
      <div className="flex-shrink-0 w-40 flex items-center px-2">
        <span className={cn('text-xs px-2.5 py-0.5 rounded-full font-normal flex items-center gap-1.5 border', sCfg.badgeClass)}>
          <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', sCfg.dotClass)} />
          {sCfg.label}
        </span>
      </div>

      {/* Author — matches w-24 header */}
      <div className="flex-shrink-0 w-40 flex items-center gap-1.5 px-2">
        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold! text-primary">
          A
        </div>
        <span className="text-xs text-muted-foreground">Admin</span>
      </div>

      {/* Updated — matches w-28 header */}
      <div className="flex-shrink-0 w-40 text-xs text-muted-foreground px-2">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" strokeWidth={2} />
          {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Actions — matches w-20 header */}
      <div
        className="flex-shrink-0 w-40 px-2 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {(onEdit || onDelete) && (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-title-color hover:bg-muted transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <div
                className="absolute right-0 bottom-full mb-1 z-50! min-w-[130px] rounded-border-radius-inner border border-border/60 bg-white dark:bg-zinc-900 shadow-2xl py-1 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setMenuOpen(false)}
              >
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false)
                      onEdit(blog)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-title-color dark:text-white hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    {t('edit') || 'Edit'}
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false)
                      onDelete(blog._id || (blog as any).id)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-500 hover:bg-rose-500/5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {t('delete') || 'Delete'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
