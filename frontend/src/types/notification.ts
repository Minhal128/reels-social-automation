export type FilterTab = 'all' | 'unread' | 'blog' | 'member' | 'social-publish' | 'ai-task'
export type SortOrder = 'latest' | 'oldest'

export interface NotificationFiltersProps {
  activeTab: FilterTab
  setActiveTab: (tab: FilterTab) => void
  sort: SortOrder
  setSort: (sort: SortOrder) => void
  unreadCount: number
  total: number
  typeCount: (type: FilterTab) => number
  handleMarkAllAsRead: () => void
  markingAll: boolean
  setPage: (page: number) => void
  setSelected: (selected: Set<string>) => void
  isLoading?: boolean
  isFetching?: boolean
}

export interface NotificationListProps {
  isLoading: boolean
  isFetching: boolean
  filtered: Notification[]
  selected: Set<string>
  activeTab: FilterTab
  toggleSelect: (id: string) => void
  handleMarkAsRead: (id: string) => void
  handleDelete: (id: string) => void
  routerPush: (url: string) => void
}

export interface NotificationRowProps {
  notification: Notification
  isSelected: boolean
  toggleSelect: (id: string) => void
  handleMarkAsRead: (id: string) => void
  handleDelete: (id: string) => void
  routerPush: (url: string) => void
}

export interface Notification {
  id: string
  _id: string
  title: string
  message: string
  type: 'social-publish' | 'ai-task' | 'system' | 'blog' | 'member'
  data?: Record<string, any>
  is_read: boolean
  created_at: string
  updated_at: string
}

export interface NotificationsResponse {
  success: boolean
  data: Notification[]
  unreadCount: number
  typeCounts?: Record<string, number>
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface NotificationSelectionBarProps {
  selectedSize: number
  filteredLength: number
  toggleSelectAll: () => void
  handleMarkSelectedAsRead: () => void
  handleDeleteSelected: () => void
  deleting: boolean
  isLoading?: boolean
  isFetching?: boolean
}