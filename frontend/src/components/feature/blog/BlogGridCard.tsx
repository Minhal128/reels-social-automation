'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Attachment, BlogCardProps, Category, Tag } from '@/types'
import { Calendar, ChevronRight, MoreVertical, Pencil, Star, Trash2, User } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getGridStatusConfig } from '@/data/blog'
import { useUpdateBlogMutation } from '@/redux/api/blogApi'
import { toast } from 'sonner'

export function BlogGridCard({
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

  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation()

  const handleToggleFeatured = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const id = blog._id || blog.id
      const res = await updateBlog({
        id,
        data: { is_featured: !blog.is_featured }
      }).unwrap()
      toast.success(res.message || 'Blog updated successfully')
    } catch (error) {
      toast.error('Failed to update featured status')
    }
  }

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

  const statusConfig = getGridStatusConfig(t)
  const statusKey = (typeof blog.status === 'string' ? blog.status : 'draft') || 'draft'
  const statusCfg = statusConfig[statusKey] ?? statusConfig.draft
  const showStatusBadge = (onEdit || onDelete) || statusKey !== 'published'

  const handleCardClick = () => {
    if (onSelectChange) {
      onSelectChange(!isSelected)
    } else if (onReadMore) {
      onReadMore()
    }
  }

  return (
    <div
      className="@container group relative flex flex-col rounded-border-radius border border-glass-border bg-white dark:bg-white/3 overflow-hidden transition-all duration-300 h-full cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="p-3 pb-0 flex-none">
        <div className="relative aspect-[16/10] overflow-hidden rounded-border-radius-inner bg-subcard dark:bg-white/3">
          {thumbnail ? (
            <Image
              fill
              src={`${process.env.NEXT_PUBLIC_STORAGE_URL || ''}/${typeof thumbnail === 'string' ? thumbnail : thumbnail.file_path}`}
              alt={blog.title}
              unoptimized
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-primary/5 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-full">
                <span className="text-2xl font-bold text-primary">{blog.title.charAt(0)}</span>
              </div>
            </div>
          )}

          {/* Checkbox */}
          {(onEdit !== undefined || onDelete !== undefined) && onSelectChange && (
            <div className="absolute top-4 left-4 z-20" onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => onSelectChange(!!checked)}
                className="h-4 w-4  data-[state=checked]:bg-primary data-[state=checked]:border-primary "
              />
            </div>
          )}

          {/* Category badges */}
          <div
            className={cn(
              'absolute top-3 flex flex-wrap gap-1.5 z-10',
              (onEdit !== undefined || onDelete !== undefined) && onSelectChange ? 'left-10' : 'left-3',
            )}
          >
            {(blog.categories as Category[]).slice(0, 2).map((cat) => (
                <Badge
                  key={cat._id || cat.id}
                  className="bg-black/60 backdrop-blur-sm text-white border border-white/20 text-2xs font-medium px-3 py-1 rounded-full capitalize"
                  title={cat.name}
                >
                  <span className={cn("block truncate max-w-[90px]")}>
                    {cat.name}
                  </span>
                </Badge>
            ))}
          </div>

          {/* Featured star toggle */}
          {onEdit && (
            <button
              type="button"
              disabled={isUpdating}
              onClick={handleToggleFeatured}
              className={cn(
                'absolute top-3 w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all z-20 cursor-pointer',
                blog.is_featured
                  ? 'bg-amber-500 shadow-amber-500/50 text-white'
                  : 'bg-black/60 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-amber-500/80 hover:scale-105',
                (onEdit !== undefined || onDelete !== undefined) ? 'right-11' : 'right-3',
              )}
              title={blog.is_featured ? 'Remove from Featured' : 'Mark as Featured'}
            >
              <Star className={cn("w-3.5 h-3.5", blog.is_featured ? "fill-current" : "")} />
            </button>
          )}

          {/* Featured star badge for read-only view */}
          {!onEdit && blog.is_featured && (
            <div
              className={cn(
                'absolute top-3 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/50 z-10 transition-all right-3',
              )}
            >
              <Star className="w-3.5 h-3.5 text-white fill-current" />
            </div>
          )}

          {/* Menu Icon at top-right of image */}
          {(onEdit !== undefined || onDelete !== undefined) && (
            <div className="absolute top-3 right-3 z-20" onClick={(e) => e.stopPropagation()} ref={menuRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen((o) => !o)
                }}
                className="w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 bg-black/60 text-white transition-colors shadow-lg"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {menuOpen && (
                <div
                  className="absolute top-9 right-0 z-50 min-w-[140px] rounded-border-radius-inner border border-border/60 bg-white dark:bg-white/3 shadow-2xl py-1 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  {onEdit && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setMenuOpen(false)
                        onEdit(blog)
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-title-color dark:text-white hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      {t('edit', { defaultValue: 'Edit' })}
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setMenuOpen(false)
                        onDelete(blog._id || (blog as any).id)
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-rose-500 hover:bg-rose-500/5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      {t('delete', { defaultValue: 'Delete' })}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Status badge */}
          {showStatusBadge && (
            <div className="absolute bottom-3 right-3 z-10">
              <Badge
                className={cn(
                  'backdrop-blur-md text-white border text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize',
                  statusCfg.className,
                )}
              >
                {statusCfg.label}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Hashtags at the top (in place of original date) */}
        <div className="flex flex-wrap gap-1 min-w-0 overflow-hidden">
          {(blog.tags as Tag[]).map((tag) => (
            <Badge
              key={tag._id || (tag as any).id}
              className="bg-primary/10 text-primary border border-primary/10 text-2xs font-medium px-3 py-1 rounded-full truncate"
              title={`#${tag.title}`}
            >
              #{tag.title.length > 8 ? tag.title.slice(0, 8) + '…' : tag.title}
            </Badge>
          ))}
        </div>

        <h3 className="text-[17px] font-semibold leading-snug line-clamp-2 text-sidebar-title-color dark:text-white">
          {blog.title}
        </h3>

        <div className="mt-auto pt-2 flex items-center justify-between border-t border-border gap-2 ">
          {/* Left side: Date & Admin */}
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1 shrink-0">
              <Calendar className="w-4 h-4" strokeWidth={2} />
              {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <span className="w-px h-4 bg-muted-foreground/30 @max-[350px]:hidden" />
            <div className="flex items-center gap-1 shrink-0">
              <User className="w-4 h-4" strokeWidth={2} />
              {t('admin', { defaultValue: 'Admin' })}
            </div>
          </div>

          {/* Right side: Read More */}
          {onReadMore && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onReadMore()
              }}
              className="flex-shrink-0 text-primary hover:text-primary hover:bg-primary/10 rounded-full px-3 h-8 gap-1 group/btn text-xs font-bold"
            >
              {t('read_more', { defaultValue: 'Read More' })}
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
