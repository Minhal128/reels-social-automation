import { Attachment } from './attachment'

export interface Category {
  _id: string
  id: string
  name: string
  slug: string
  description?: string
  image_id?: string | Attachment
  meta_title?: string
  meta_description?: string
  meta_image_id?: string | Attachment
  status: boolean
  parent_id?: string | Category
  children?: Category[]
  created_at: string
  updated_at: string
}

export interface Tag {
  _id: string
  id: string
  title: string
  description?: string
  status: boolean
  created_at: string
  updated_at: string
}

export interface Blog {
  _id: string
  id: string
  title: string
  slug: string
  description: string
  content: string
  thumbnail_id: string | Attachment
  meta_title?: string
  meta_description?: string
  meta_image_id?: string | Attachment
  categories: string[] | Category[]
  tags: string[] | Tag[]
  is_featured: boolean
  status: boolean | 'published' | 'draft' | 'scheduled' | 'archived' | 'unarchived'
  published_at?: string
  views?: number
  shares?: number
  comments_count?: number
  read_time?: number
  created_at: string
  updated_at: string
}

export interface BlogResponse {
  blogs: Blog[]
  totalPages: number
  currentPage: number
  total: number
}

export interface BlogCardProps {
  blog: Blog
  onEdit?: (blog: Blog) => void
  onDelete?: (id: string) => void
  onClick?: (blog: Blog) => void
  onReadMore?: () => void
  isSelected?: boolean
  onSelectChange?: (selected: boolean) => void
}

export interface BlogFormProps {
  blog: Blog | null
  onClose: () => void
}

export interface BlogDetailsProps {
  blog: Blog
  allBlogs: Blog[]
  onClose: () => void
  onNavigate: (blog: Blog) => void
  onEdit?: () => void
}

export interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  category?: Category | null
}

export interface TagModalProps {
  isOpen: boolean
  onClose: () => void
  tag?: Tag | null
}

export interface BlogDetailsSidebarProps {
  recentBlogs: Blog[]
  onNavigate: (blog: Blog) => void
  onClose: () => void
}

export interface BlogHeaderProps {
  blog: Blog
  onClose?: () => void
  onEdit?: () => void
}

export interface BlogNavigationProps {
  prevBlog: Blog | null
  nextBlog: Blog | null
  onNavigate: (blog: Blog) => void
}

export interface BlogGeneralInfoProps {
  setFieldValue: (field: string, value: any) => void
  values: any
  isEditing: boolean
}

export interface BlogFormSidebarProps {
  values: any
  setFieldValue: (field: string, value: any) => void
  touched: any
  errors: any
  categories: Category[]
  tags: Tag[]
  thumbnailUrl: string | null
  setThumbnailUrl: (url: string | null) => void
  uploadAttachment: any
  isUploading: boolean
  isLoading: boolean
  isEditing: boolean
  onClose: () => void
  dirty?: boolean
}

export interface BlogListProps {
  search: string
  onEdit: (blog: Blog) => void
  status?: string
}
export interface CategoryFormProps {
  category: Category | null
  availableCategories: Category[]
  onSuccess: () => void
  onCancel?: () => void
}

// export interface BlogDashboardProps {
//   onEdit: (blog: Blog) => void
//   onCreateNew: () => void
// }

export interface BlogDashboardStats {
  totalBlogs?: number
  totalBlogsChange?: string
  publishedCount?: number
  publishedPercentage?: number
  draftsCount?: number
  draftsPercentage?: number
  scheduledCount?: number
  scheduledPercentage?: number
  totalViews?: number
  viewsChangePct?: string
  avgEngagement?: string
  engagementChangePct?: string
}

export interface BlogDashboardInsights {
  avgReadTime?: string
  avgReadTimeChange?: string
  bounceRate?: string
  bounceRateChange?: string
  avgWordCount?: number
  wordCountChangePct?: string
  featuredCount?: number
  featuredChangePct?: string
}

export interface CategoryDistributionProps {
  topCategories: any[]
  totalBlogs: number
  isDark: boolean
}

export interface ContentInsightsProps {
  insights: any
}

export interface RecentBlogsTableProps {
  recentBlogs: any[]
}

export interface StatsGridProps {
  stats: BlogDashboardStats
}

export interface InsightsGridProps {
  insights: BlogDashboardInsights
}

export interface StatusDistributionProps {
  statusDistribution: any[]
  totalBlogs: number
  isDark: boolean
}

export interface TopPerformingBlogsProps {
  topPerformingBlogs: any[]
}

export interface ViewsOverviewProps {
  viewsOverview: any[]
  isDark: boolean
}