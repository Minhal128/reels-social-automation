import React from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { CharacterSkeletonProps } from '@/types/character'

export const CharacterSkeleton: React.FC<CharacterSkeletonProps> = ({ viewMode }) => {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col p-3 rounded-border-radius border border-border/40 bg-white/3 glass-card overflow-hidden animate-pulse h-full"
          >
            {/* Media Preview Section Skeleton */}
            <div className="relative flex-none aspect-[4/3] sm:aspect-video rounded-border-radius overflow-hidden bg-slate-200/80 dark:bg-white/10" />

            <div className="py-4 flex flex-col flex-1">
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <Skeleton className="h-5 w-2/3 bg-slate-200/80 dark:bg-white/10 rounded" />
                    <Skeleton className="h-4 w-1/2 bg-slate-200/80 dark:bg-white/10 rounded" />
                  </div>
                  <Skeleton className="h-5 w-12 bg-slate-200/80 dark:bg-white/10 rounded-md shrink-0" />
                </div>

                <div className="rounded-[8px] bg-black/3 dark:bg-white/5 p-3 border border-glass-border mt-2 space-y-1.5">
                  <Skeleton className="h-3 w-10 bg-slate-200/80 dark:bg-white/10 rounded" />
                  <Skeleton className="h-3.5 w-full bg-slate-200/80 dark:bg-white/10 rounded" />
                  <Skeleton className="h-3.5 w-4/5 bg-slate-200/80 dark:bg-white/10 rounded" />
                </div>
              </div>

              {/* Footer info skeleton */}
              <div className="mt-auto pt-3 border-t border-glass-border flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-20 bg-slate-200/80 dark:bg-white/10 rounded" />
                <Skeleton className="h-4 w-16 bg-slate-200/80 dark:bg-white/10 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Card key={idx} className="bg-white/3 animate-pulse">
          <div className="flex items-start gap-4 p-4">
            <div className="w-24 h-24 rounded-lg bg-slate-200/80 dark:bg-white/10 shrink-0" />

            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-1/3 bg-slate-200/80 dark:bg-white/10 rounded" />
                  <Skeleton className="h-4 w-2/3 bg-slate-200/80 dark:bg-white/10 rounded" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-5 w-16 bg-slate-200/80 dark:bg-white/10 rounded" />
                <Skeleton className="h-5 w-12 bg-slate-200/80 dark:bg-white/10 rounded" />
                <Skeleton className="h-5 w-24 bg-slate-200/80 dark:bg-white/10 rounded" />
                <Skeleton className="h-5 w-16 bg-slate-200/80 dark:bg-white/10 rounded" />
              </div>

              <Skeleton className="h-4 w-5/6 bg-slate-200/80 dark:bg-white/10 rounded" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
