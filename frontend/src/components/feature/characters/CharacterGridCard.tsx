import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CharacterGridCardProps } from '@/types/character'
import { getResolvedImageUrl } from '@/utils/image'
import { Calendar, Clock, Download, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const CharacterGridCard: React.FC<CharacterGridCardProps> = ({
  char,
  onSelect,
  onDownload,
  onDelete,
  isDeleting,
}) => {
  return (
    <Card
      onClick={() => onSelect(char)}
      className="group relative flex flex-col p-3 rounded-border-radius border border-border/40 bg-white dark:bg-white/3 overflow-hidden transition-all duration-500 hover:-translate-y-2 glass-dark-card h-full cursor-pointer"
    >
      {/* Media Preview Section */}
      <div className="relative flex-none aspect-[4/3] sm:aspect-video rounded-border-radius overflow-hidden transition-all duration-500 h-[300px]">
        <div className="absolute inset-0 transition-all duration-300">
          <div className="relative w-full h-full rounded-border-radius overflow-hidden hover-gradient-border shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
            <Image
              src={getResolvedImageUrl(char.image_url)}
              alt={char.name}
              fill
              unoptimized
              className="object-cover object-top rounded-border-radius transition-transform duration-700 group-hover:scale-95"
            />
            <div className="absolute inset-0 bg-black/3 dark:bg-white/8! border transition-opacity duration-500 group-hover:opacity-80 pointer-events-none" />

            {/* Status Badge Overlay */}
            <div className="absolute top-3 left-3 z-10 text-white!">
              <Badge className="px-2.5 py-0.5 text-xs font-bold rounded-md border shadow-2xl bg-black/55 border-white/30 backdrop-blur-md ">
                {char.style || 'Generated'}
              </Badge>
            </div>

            {/* Action Buttons Overlay */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onDownload(char.image_url, char.name)
                }}
                className="w-8! h-8! p-0! rounded-full bg-black/55! border border-white/30 text-white! hover:bg-black/40 hover:text-white backdrop-blur-3xl flex items-center justify-center"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(char._id || char.id, char.name)
                }}
                disabled={isDeleting}
                className="w-8! h-8! p-0! rounded-full bg-black/55! border border-white/30 text-white! hover:bg-black/40 hover:text-white backdrop-blur-3xl flex items-center justify-center transition-all duration-300 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 flex flex-col flex-1">
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5 min-w-0">
              <h3
                className="text-sm font-semibold text-title-color dark:text-white truncate transition-colors"
                title={char.name}
              >
                {char.name}
              </h3>
              {char.description && (
                <p className="text-xs text-muted-foreground line-clamp-1" title={char.description}>
                  {char.description}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-3xs sm:text-xs font-semibold text-subtitle-color dark:text-white bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md  uppercase tracking-wider">
                  {char.resolution}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-auto pt-3 border-t border-glass-border flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="text-subtitle-color font-medium truncate text-sm">
              {new Date(char.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              {new Date(char.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
