'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Attachment, BlogHeaderProps, Category } from '@/types'
import { getMediaUrl } from '@/utils'
import { ArrowLeft, Pencil, User } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export default function BlogHeader({ blog, onClose, onEdit }: BlogHeaderProps) {
  const { t } = useTranslation()
  const thumbnail = blog.thumbnail_id as Attachment

  return (
    <div className="relative aspect-[21/9] w-full overflow-hidden">
      {thumbnail?.file_path ? (
        <Image
          width={100}
          height={100}
          unoptimized
          src={getMediaUrl(thumbnail.file_path)}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-primary/5 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-10 w-10 text-primary" />
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

      {/* Back to Blogs Button - Top Left */}
      {onClose && (
        <Button
          variant="outline"
          onClick={onClose}
          className="absolute top-4 left-4 z-10 bg-black/55 border  border-white/20! text-white gap-2 px-4 py-2 h-9 rounded-xl font-semibold backdrop-blur-md transition-all text-xs"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back_to_blogs', { defaultValue: 'Back to Blogs' })}
        </Button>
      )}

      {/* Edit Button - Bottom Right */}
      {onEdit && (
        <Button
          onClick={onEdit}
          className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 z-10 bg-black/55! backdrop-blur-sm  text-white gap-2 px-4 py-2 h-9 rounded-xl font-semibold  transition-all text-xs border"
        >
          <Pencil className="h-4 w-4" />
          {t('edit_this_blog', { defaultValue: 'Edit Blog' })}
        </Button>
      )}

      <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 right-28 sm:right-40">
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
          {(blog.categories as Category[]).map((cat) => (
            <Badge
              key={cat._id || cat.id}
              className="bg-white/30 border-white/50! backdrop-blur-md border! px-3 sm:px-4 py-1 sm:py-1.5 text-white/70 rounded-full text-[10px] sm:text-xs font-bold tracking-wider"
            >
              {cat.name}
            </Badge>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight break-all whitespace-normal line-clamp-3">
          {blog.title}
        </h1>
      </div>
    </div>
  )
}
