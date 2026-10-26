import React from 'react'
import Image from 'next/image'
import { Calendar, Download, Trash2, Cpu } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getResolvedImageUrl } from '@/utils/image'
import { CharacterListCardProps } from '@/types/character'

export const CharacterListCard: React.FC<CharacterListCardProps> = ({
  char,
  onSelect,
  onDownload,
  onDelete,
  isDeleting,
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all cursor-pointer bg-white/3" onClick={() => onSelect(char)}>
      <div className="flex items-start gap-4 p-4">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
          <Image src={getResolvedImageUrl(char.image_url)} alt={char.name} fill unoptimized className="object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-semibold text-lg truncate">{char.name}</h3>
              {char.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{char.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="h-8 w-8 rounded-full p-0! shrink-0 bg-black/30 border border-glass-border text-black/60 dark:text-white! hover:bg-primary/40! hover:text-primary backdrop-blur-3xl flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation()
                  onDownload(char.image_url, char.name)
                }}
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                className="h-8 w-8 p-0! rounded-full bg-black/30 border border-glass-border text-black/60 dark:text-white! hover:text-red-500! hover:bg-red-500/30! dark:hover:bg-red-500! backdrop-blur-3xl flex items-center justify-center"
                disabled={isDeleting}
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(char._id || char.id, char.name)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="default">
              <Cpu className="w-3 h-3 mr-1" />
              {char.style}
            </Badge>
            <Badge variant="outline">{char.resolution}</Badge>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(char.created_at).toLocaleDateString()}
            </span>
            <span>{char.credits_used} credits</span>
          </div>

          {char.prompt && (
            <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
              <strong>Prompt:</strong> {char.prompt}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
