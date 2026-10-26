'use client'

import { Check, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { NotificationSelectionBarProps } from '@/types/notification'
import { useTranslation } from 'react-i18next'

export function NotificationSelectionBar({
  selectedSize,
  filteredLength,
  toggleSelectAll,
  handleMarkSelectedAsRead,
  handleDeleteSelected,
  deleting,
  isLoading,
  isFetching,
}: NotificationSelectionBarProps) {
  const { t } = useTranslation()
  const isAllSelected = selectedSize > 0 && selectedSize === filteredLength
  const loading = isLoading || isFetching

  return (
    <div
      className={cn(
        'flex items-center justify-between flex-wrap px-5 py-3.5 border-b border-glass-border transition-all duration-300 gap-3',
        selectedSize > 0
          ? 'bg-primary/5 dark:bg-primary/10'
          : 'bg-white dark:bg-white/3'
      )}
    >
      <div className="flex items-center gap-3">
        {loading ? (
          <>
            <Skeleton className="w-5 h-5 rounded-[4px] shrink-0" />
            <Skeleton className="h-5 w-28 rounded" />
          </>
        ) : (
          <>
            <button
              onClick={toggleSelectAll}
              className={cn(
                'w-5 h-5 rounded-[4px] border flex items-center justify-center transition-all duration-200 shrink-0',
                isAllSelected
                  ? 'bg-primary border-primary text-white'
                  : selectedSize > 0
                    ? 'bg-primary! border-primary text-white'
                    : 'border-glass-border hover:border-primary/50'
              )}
            >
              {selectedSize > 0 && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
            </button>
            <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              {selectedSize > 0 ? t('selected_count', { count: selectedSize }) : t('notifications_count', { count: filteredLength })}
            </span>
          </>
        )}
      </div>

      {selectedSize > 0 && (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-2 text-xs font-semibold text-title-color bg-white/3 border border-glass-border rounded-lg px-3 transition-colors duration-300"
            onClick={handleMarkSelectedAsRead}
          >
            <Check className="w-3.5 h-3.5" />
            {t('mark_as_read')}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-2 text-xs font-semibold text-destructive  bg-destructive/10 border border-destructive/20 rounded-lg px-3 transition-colors duration-300"
            onClick={handleDeleteSelected}
            disabled={deleting}
          >
            <Trash2 className="w-3.5 h-3.5" />
            {t('delete')}
          </Button>
        </div>
      )}
    </div>
  )
}
