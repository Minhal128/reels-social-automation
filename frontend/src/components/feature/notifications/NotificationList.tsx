'use client'

import { NotificationListProps } from '@/types/notification'
import { BellOff } from 'lucide-react'
import { NotificationRow } from './NotificationRow'
import { Skeleton } from '@/components/ui/skeleton'

export function NotificationList({
  isLoading,
  isFetching,
  filtered,
  selected,
  activeTab,
  toggleSelect,
  handleMarkAsRead,
  handleDelete,
  routerPush,
}: NotificationListProps) {
  if (isLoading || isFetching) {
    return (
      <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center gap-4 px-5 py-4 border-b border-glass-border last:border-b-0 animate-pulse"
          >
            {/* Left controls + Icon + Content */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Circle Checkbox Skeleton */}
              <Skeleton className="w-5 h-5 rounded-[4px] shrink-0" />

              {/* Icon Container Skeleton */}
              <Skeleton className="w-12 h-12 rounded-border-radius-inner shrink-0" />

              {/* Body Text & Badge Block */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <Skeleton className="h-5 w-1/4 rounded" />
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <Skeleton className="h-4 w-2/3 rounded" />
                  <Skeleton className="h-5 w-16 rounded-full shrink-0" />
                </div>
              </div>
            </div>

            {/* Right details: Time, Action Button, Mark read / Delete */}
            <div className="flex flex-row md:flex-row items-center justify-between md:justify-end gap-5 shrink-0 pt-3 md:pt-0 border-t md:border-0 border-zinc-100 dark:border-zinc-800/50">
              {/* Time Ago Skeleton */}
              <Skeleton className="h-4 w-16 rounded" />

              {/* Action Button & Icons Skeleton */}
              <div className="flex items-center gap-2">
                {/* Optional view post button skeleton */}
                {i % 2 === 0 && <Skeleton className="h-8 w-24 rounded-lg shrink-0" />}

                {/* Grouped Actions (Check and Delete) */}
                <div className="flex items-center gap-2 shrink-0">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-9 w-9 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 bg-transparent">
        <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
          <BellOff className="w-8 h-8 text-zinc-400" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-base font-bold text-title-color dark:text-white">No notifications</h3>
          <p className="text-sm text-subtitle-color dark:text-zinc-400">
            {activeTab === 'unread' ? "You're all caught up!" : 'No notifications in this category.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
      {filtered.map((notification) => (
        <NotificationRow
          key={notification.id}
          notification={notification}
          isSelected={selected.has(notification.id)}
          toggleSelect={toggleSelect}
          handleMarkAsRead={handleMarkAsRead}
          handleDelete={handleDelete}
          routerPush={routerPush}
        />
      ))}
    </div>
  )
}
