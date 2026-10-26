'use client'

import { DeleteConfirmationModal } from '@/components/reusable/DeleteConfirmationModal'
import { PageHeader } from '@/components/reusable/PageHeader'
import { Pagination } from '@/components/reusable/Pagination'
import {
  useDeleteNotificationsMutation,
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from '@/redux/api/notificationApi'
import { FilterTab, SortOrder } from '@/types/notification'
import { Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { NotificationFilters } from '../../../components/feature/notifications/NotificationFilters'
import { NotificationList } from '../../../components/feature/notifications/NotificationList'
import { NotificationSelectionBar } from '../../../components/feature/notifications/NotificationSelectionBar'

export default function NotificationsPage() {  
  const router = useRouter()
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [sort, setSort] = useState<SortOrder>('latest')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Modal states for delete confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [notificationToDelete, setNotificationToDelete] = useState<string | string[] | null>(null)

  const isReadFilter = activeTab === 'unread' ? false : undefined
  const typeFilter = activeTab !== 'all' && activeTab !== 'unread' ? activeTab : undefined

  // Main paginated query (filtered by is_read when on Unread tab, and type when on specific tab)
  const { data, isLoading, isFetching } = useGetNotificationsQuery(
    {
      page,
      limit,
      ...(isReadFilter !== undefined ? { is_read: isReadFilter } : {}),
      ...(typeFilter ? { type: typeFilter } : {}),
    },
    { refetchOnMountOrArgChange: true },
  )

  const { data: countsData } = useGetNotificationsQuery({ page: 1, limit: 1 }, { refetchOnMountOrArgChange: true })

  const [markAsRead] = useMarkAsReadMutation()
  const [markAllAsRead, { isLoading: markingAll }] = useMarkAllAsReadMutation()
  const [deleteNotifications, { isLoading: deleting }] = useDeleteNotificationsMutation()

  // Client-side sorting (filtering is done by the backend)
  const filtered = useMemo(() => {
    let list = data?.data ?? []
    if (sort === 'oldest') {
      list = [...list].reverse()
    }
    return list
  }, [data, sort])

  // Selection actions
  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((n) => n.id)))
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap()
      toast.success(t('notification_marked_as_read'))
    } catch {
      toast.error(t('notification_failed_to_mark_as_read'))
    }
  }

  const handleMarkSelectedAsRead = async () => {
    try {
      await Promise.all([...selected].map((id) => markAsRead(id).unwrap()))
      toast.success(t('notifications_marked_as_read_success', { count: selected.size }))
      setSelected(new Set())
    } catch {
      toast.error(t('notification_failed_to_mark_as_read'))
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap()
      toast.success(t('all_notifications_marked_as_read'))
    } catch {
      toast.error(t('failed_to_mark_all_as_read'))
    }
  }

  const handleDeleteSelected = async () => {
    if (selected.size === 0) return
    setNotificationToDelete([...selected])
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSingle = async (id: string) => {
    setNotificationToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!notificationToDelete) return
    const ids = Array.isArray(notificationToDelete) ? notificationToDelete : [notificationToDelete]
    try {
      await deleteNotifications(ids).unwrap()
      toast.success(
        Array.isArray(notificationToDelete)
          ? `${ids.length} notification(s) deleted`
          : 'Notification deleted'
      )
      setSelected((prev) => {
        const next = new Set(prev)
        ids.forEach((id) => next.delete(id))
        return next
      })
      setIsDeleteModalOpen(false)
      setNotificationToDelete(null)
    } catch {
      toast.error(t('failed_to_delete_notification'))
    }
  }

  // Use countsData for stable unread count (independent of current tab filter)
  const unreadCount = countsData?.unreadCount ?? 0
  const total = data?.pagination?.total ?? 0
  const totalPages = data?.pagination?.totalPages ?? 1

  // For per-type badge counts use countsData typeCounts (unfiltered) to avoid flipping
  const typeCount = (type: FilterTab) => (type === 'unread' ? unreadCount : (countsData?.typeCounts?.[type] ?? 0))

  return (
    <div className="h-full lg:h-[calc(100vh-100px)]  flex flex-col overflow-hidden gap-4 pb-4">
      <PageHeader
        icon={<Bell className="w-5 h-5 text-title-color" />}
        title={t('notifications')}
        subtitle={t('notifications_subtitle')}
        showBackButton={false}
      />

      <NotificationFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sort={sort}
        setSort={setSort}
        unreadCount={unreadCount}
        total={countsData?.pagination?.total ?? total}
        typeCount={typeCount}
        handleMarkAllAsRead={handleMarkAllAsRead}
        markingAll={markingAll}
        setPage={setPage}
        setSelected={setSelected}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      <div className="glass-card rounded-2xl bg-white/3 dark:bg-white/3 border border-glass-border overflow-hidden h-fit max-h-[calc(100vh-240px)] md:max-h-[calc(100vh-280px)] flex flex-col min-h-0">
        {(filtered.length > 0 || isLoading || isFetching) && (
          <NotificationSelectionBar
            selectedSize={selected.size}
            filteredLength={filtered.length}
            toggleSelectAll={toggleSelectAll}
            handleMarkSelectedAsRead={handleMarkSelectedAsRead}
            handleDeleteSelected={handleDeleteSelected}
            deleting={deleting}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        )}

        <NotificationList
          isLoading={isLoading}
          isFetching={isFetching}
          filtered={filtered}
          selected={selected}
          activeTab={activeTab}
          toggleSelect={toggleSelect}
          handleMarkAsRead={handleMarkAsRead}
          handleDelete={handleDeleteSingle}
          routerPush={router.push}
        />
      </div>

      {total > 0 && (
        <div className="mt-2 shrink-0">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            rowsPerPage={limit}
            onRowsPerPageChange={(rows) => {
              setLimit(rows)
              setPage(1)
            }}
            showRowsPerPage={false}
            totalResults={total}
          />
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setNotificationToDelete(null)
        }}
        onConfirm={confirmDelete}
        title={
          Array.isArray(notificationToDelete)
            ? t('delete_notifications_title')
            : t('delete_notification_title')
        }
        description={
          Array.isArray(notificationToDelete)
            ? t('delete_notifications_description')
            : t('delete_notification_description')
        }
        isLoading={deleting}
      />
    </div>
  )
}
