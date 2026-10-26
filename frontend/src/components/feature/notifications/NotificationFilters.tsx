'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { tabLabels } from '@/data/notification'
import { NotificationFiltersProps, SortOrder } from '@/types/notification'
import { useTranslation } from 'react-i18next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function NotificationFilters({
  activeTab,
  setActiveTab,
  sort,
  setSort,
  unreadCount,
  total,
  typeCount,
  handleMarkAllAsRead,
  markingAll,
  setPage,
  setSelected,
  isLoading,
  isFetching,
}: NotificationFiltersProps) {
  const { t } = useTranslation()
  const loading = isLoading || isFetching

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      {/* Rounded Pills Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabLabels.map(({ key, label }) => {
          const count = key === 'all' ? total : key === 'unread' ? unreadCount : typeCount(key)
          const isActive = activeTab === key
          return (
            <Button
              key={key}
              onClick={() => {
                setActiveTab(key)
                setPage(1)
                setSelected(new Set())
              }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border cursor-pointer h-10',
                isActive
                  ? 'primary-btn text-white!   scale-[1.02]'
                  : 'bg-white! dark:bg-white/3! text-subtitle-color!'
              )}
            >
              <span>{t(key, { defaultValue: label })}</span>
              {loading ? (
                <Skeleton className="h-4 w-6 rounded-full shrink-0" />
              ) : (
                count > 0 && (
                  <span
                    className={cn(
                      'text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center transition-colors duration-300',
                      isActive ? 'bg-white/9 text-white' : 'bg-black/3 dark:bg-zinc-800 text-primary',
                    )}
                  >
                    {count}
                  </span>
                )
              )}
            </Button>
          )
        })}
      </div>

      {/* Global Action Buttons */}
      <div className="flex items-center gap-2.5 self-end sm:self-auto">
        {loading ? (
          <>
            <Skeleton className="h-10 w-36 rounded-full shrink-0" />
            <Skeleton className="h-10 w-36 rounded-full shrink-0" />
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-white! dark:bg-white/3! text-subtitle-color! hover:text-primary font-semibold h-10! rounded-full px-4 transition-all duration-300  hover:shadow-xs text-xs"
              onClick={handleMarkAllAsRead}
              disabled={markingAll || unreadCount === 0}
            >
              <Check className="w-4 h-4" />
              <span>{t('mark_all_as_read')}</span>
            </Button>

            {/* Sort selector */}
            <Select value={sort} onValueChange={(value) => setSort(value as SortOrder)}>
              <SelectTrigger className="bg-white! dark:bg-white/3! text-subtitle-color! pl-4 pr-3 rounded-full! text-xs font-semibold border border-glass-border hover:text-primary transition-all duration-300 cursor-pointer focus:outline-none h-10!  shadow-none flex items-center justify-between">
                <SelectValue placeholder={t('sort_by_latest')} />
              </SelectTrigger>
              <SelectContent align="end" className="bg-white dark:bg-zinc-950 rounded-border-radius border border-glass-border shadow-md mb-0! pb-0!">
                <SelectItem value="latest" className="text-xs font-medium cursor-pointer">
                  {t('sort_by_latest')}
                </SelectItem>
                <SelectItem value="oldest" className="text-xs font-medium cursor-pointer mb-0!">
                  {t('sort_by_oldest')}
                </SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
      </div>
    </div>
  )
}
