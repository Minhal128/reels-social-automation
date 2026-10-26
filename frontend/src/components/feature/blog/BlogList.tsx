'use client'

import { DeleteConfirmationModal } from '@/components/reusable/DeleteConfirmationModal'
import { ConfirmationModal } from '@/components/reusable/ConfirmationModal'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import Label from '@/components/ui/label'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useBulkDeleteBlogsMutation,
  useBulkPublishBlogsMutation,
  useBulkScheduleBlogsMutation,
  useBulkArchiveBlogsMutation,
  useBulkUnarchiveBlogsMutation,
  useBulkAssignTagsBlogsMutation,
} from '@/redux/api/blogApi'
import { useGetCategoriesQuery } from '@/redux/api/categoryApi'
import { useGetTagsQuery } from '@/redux/api/tagApi'
import { Blog, BlogListProps } from '@/types'
import { ChevronLeft, ChevronRight, LayoutGrid, List, Loader2, Trash2, FileText, Calendar as CalendarIcon, Clock, Archive, Tag, ChevronDown, CheckSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { BlogGridCard, BlogListRow } from './BlogCard'
import { CategoryFilter } from '@/components/reusable/CategoryFilter'
import { usePermission } from '@/hooks/usePermission'
import { PERMISSIONS } from '@/constants/permissions'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Pagination } from '@/components/reusable/Pagination'

const BlogList = ({ search, onEdit, status }: BlogListProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { hasPermission } = usePermission()
  const canManageBlogs = hasPermission(PERMISSIONS.MANAGE_BLOGS)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [categoryFilter, setCategoryFilter] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  const { data: blogsResponse, isLoading } = useGetBlogsQuery({
    page,
    limit,
    search: debouncedSearch,
    category: categoryFilter || undefined,
    status: status || undefined,
  })

  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategoriesQuery({ limit: 100 })
  const categories = categoriesData?.categories || []

  const { data: tagsData } = useGetTagsQuery({ limit: 100 })
  const allTags = tagsData?.tags || []

  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation()
  const [bulkDeleteBlogs, { isLoading: isBulkDeleting }] = useBulkDeleteBlogsMutation()
  const [bulkPublishBlogs, { isLoading: isBulkPublishing }] = useBulkPublishBlogsMutation()
  const [bulkScheduleBlogs, { isLoading: isBulkScheduling }] = useBulkScheduleBlogsMutation()
  const [bulkArchiveBlogs, { isLoading: isBulkArchiving }] = useBulkArchiveBlogsMutation()
  const [bulkUnarchiveBlogs, { isLoading: isBulkUnarchiving }] = useBulkUnarchiveBlogsMutation()
  const [bulkAssignTagsBlogs, { isLoading: isBulkAssigningTags }] = useBulkAssignTagsBlogsMutation()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null)

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isBulkMenuOpen, setIsBulkMenuOpen] = useState(false)
  const bulkMenuRef = useRef<HTMLDivElement>(null)

  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false)
  const [isAssignTagsModalOpen, setIsAssignTagsModalOpen] = useState(false)

  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date())
  const [scheduleHour, setScheduleHour] = useState<number>(12)
  const [scheduleMinute, setScheduleMinute] = useState<number>(0)
  const [scheduleAmPm, setScheduleAmPm] = useState<'AM' | 'PM'>('PM')

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])

  const blogs = blogsResponse?.blogs || []
  const totalPages = blogsResponse?.totalPages || 0

  const handleDelete = async () => {
    if (!blogToDelete) return
    try {
      await deleteBlog(blogToDelete).unwrap()
      toast.success(t('blog_deleted_successfully'))
      setIsDeleteModalOpen(false)
      setBlogToDelete(null)
    } catch (error: any) {
      toast.error(error?.data?.message || t('something_went_wrong'))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return
    try {
      await bulkDeleteBlogs(selectedIds).unwrap()
      toast.success(t('blogs_deleted_successfully', { defaultValue: 'Selected blogs deleted successfully' }))
      setIsBulkDeleteModalOpen(false)
      setSelectedIds([])
    } catch (error: any) {
      toast.error(error?.data?.message || t('something_went_wrong'))
    }
  }

  const handleBulkPublish = async () => {
    if (selectedIds.length === 0) return
    try {
      await bulkPublishBlogs(selectedIds).unwrap()
      toast.success(t('blogs_published_successfully', { defaultValue: 'Selected blogs published successfully' }))
      setSelectedIds([])
    } catch (error: any) {
      toast.error(error?.data?.message || t('something_went_wrong'))
    }
  }

  const handleConfirmSchedule = async () => {
    if (!scheduleDate || selectedIds.length === 0) return
    const finalDate = new Date(scheduleDate)
    let finalHour = scheduleHour
    if (scheduleAmPm === 'PM' && finalHour < 12) finalHour += 12
    if (scheduleAmPm === 'AM' && finalHour === 12) finalHour = 0
    finalDate.setHours(finalHour, scheduleMinute, 0, 0)

    try {
      await bulkScheduleBlogs({ ids: selectedIds, published_at: finalDate.toISOString() }).unwrap()
      toast.success(t('blogs_scheduled_successfully', { defaultValue: 'Selected blogs scheduled successfully' }))
      setIsScheduleModalOpen(false)
      setSelectedIds([])
    } catch (error: any) {
      toast.error(error?.data?.message || t('something_went_wrong'))
    }
  }

  const handleBulkArchive = async () => {
    if (selectedIds.length === 0) return
    try {
      await bulkArchiveBlogs(selectedIds).unwrap()
      toast.success(t('blogs_archived_successfully', { defaultValue: 'Selected blogs archived successfully' }))
      setIsArchiveModalOpen(false)
      setSelectedIds([])
    } catch (error: any) {
      toast.error(error?.data?.message || t('something_went_wrong'))
    }
  }

  const handleBulkUnarchive = async () => {
    if (selectedIds.length === 0) return
    try {
      await bulkUnarchiveBlogs(selectedIds).unwrap()
      toast.success(t('blogs_unarchived_successfully', { defaultValue: 'Selected blogs restored to Draft successfully' }))
      setSelectedIds([])
    } catch (error: any) {
      toast.error(error?.data?.message || t('something_went_wrong'))
    }
  }

  const selectedBlogs = blogs.filter(b => selectedIds.includes(b._id || (b as any).id))
  const hasPublishedSelected = selectedBlogs.some(b => b.status === 'published')
  const canPublishSelected = selectedIds.length > 0 && !hasPublishedSelected
  // On the archived tab every selected blog is archived → show Unarchive, hide Archive/Publish/Schedule
  const isArchivedTab = status === 'archived'
  const allSelectedAreArchived = selectedBlogs.length > 0 && selectedBlogs.every(b => b.status === 'archived')

  const handleBulkAssignTags = async () => {
    if (selectedIds.length === 0) return
    try {
      await bulkAssignTagsBlogs({ ids: selectedIds, tagIds: selectedTagIds }).unwrap()
      toast.success(t('tags_assigned_successfully', { defaultValue: 'Tags assigned successfully to selected blogs' }))
      setIsAssignTagsModalOpen(false)
      setSelectedTagIds([])
      setSelectedIds([])
    } catch (error: any) {
      toast.error(error?.data?.message || t('something_went_wrong'))
    }
  }

  const allIds = blogs.map(blog => blog._id || (blog as any).id)
  const isAllSelected = allIds.length > 0 && allIds.every(id => selectedIds.includes(id))

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => {
        const unique = new Set([...prev, ...allIds])
        return Array.from(unique)
      })
    } else {
      setSelectedIds(prev => prev.filter(id => !allIds.includes(id)))
    }
  }

  const handleSelectChange = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedIds(prev => [...prev, id])
    } else {
      setSelectedIds(prev => prev.filter(item => item !== id))
    }
  }

  const handleEdit = (blog: Blog) => {
    onEdit(blog)
  }

  const handleDetails = (blog: Blog) => {
    router.push(`/blog/${blog._id || (blog as any).id}`)
  }

  return (
    <div className="space-y-6">
      {isCategoriesLoading ? (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <Skeleton className="h-[38px] w-20 rounded-full" />
          <Skeleton className="h-[38px] w-24 rounded-full" />
          <Skeleton className="h-[38px] w-16 rounded-full" />
          <Skeleton className="h-[38px] w-28 rounded-full" />
          <Skeleton className="h-[38px] w-20 rounded-full" />
          <Skeleton className="h-[38px] w-24 rounded-full" />
          <Skeleton className="h-[38px] w-22 rounded-full" />
        </div>
      ) : (
        <CategoryFilter
          categories={categories}
          activeCategory={categoryFilter}
          onCategoryChange={(val) => {
            setCategoryFilter(val)
            setPage(1)
          }}
          allLabel={t('all_blogs', { defaultValue: 'All Posts' })}
        />
      )}

      {/* ── Toolbar: select-all + Bulk Actions dropdown + view toggle ── */}
      {isLoading ? (
        canManageBlogs && (
          <div className="flex items-center justify-between gap-3 flex-wrap px-4 py-3 rounded-border-radius-inner border border-border/40 bg-white dark:bg-white/3 h-[68px]">
            {/* Left: checkbox + count placeholder */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded bg-slate-200/60 dark:bg-white/10" />
              <Skeleton className="h-5 w-24 rounded bg-slate-200/60 dark:bg-white/10" />
            </div>

            {/* Right: Bulk Actions + view toggle placeholder */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-28 rounded-xl bg-slate-200/60 dark:bg-white/10" />
              <Skeleton className="h-11 w-20 rounded-[9px] bg-slate-200/60 dark:bg-white/10" />
            </div>
          </div>
        )
      ) : (
        canManageBlogs && blogs.length > 0 && (
          <div className="flex items-center justify-between gap-3 flex-wrap px-4 py-3 rounded-border-radius-inner border border-border/40 bg-white dark:bg-white/3">
          {/* Left: checkbox + count */}
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
              id="select-all-blogs"
              className="h-5 w-5 rounded-md border-border/60 bg-transparent data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor="select-all-blogs"
              className="text-sm font-semibold text-title-color dark:text-white cursor-pointer select-none"
            >
              {selectedIds.length > 0
                ? `${selectedIds.length} ${t('items_selected', { defaultValue: 'items selected' })}`
                : t('select_all', { defaultValue: 'Select All' })}
            </label>
          </div>

          {/* Right: Bulk Actions + view toggle */}
          <div className="flex items-center gap-2">
            {/* Bulk Actions dropdown */}
            <div className="relative" ref={bulkMenuRef}>
              <Button
                variant="outline"
                size="sm"
                disabled={selectedIds.length === 0}
                onClick={() => setIsBulkMenuOpen((o) => !o)}
                className={cn(
                  ' px-4 rounded-xl border-border/40 font-semibold gap-2 text-xs sm:text-sm transition-all',
                  selectedIds.length > 0
                    ? 'text-primary border-primary/30 bg-primary/5 hover:bg-primary/10'
                    : 'opacity-50 cursor-not-allowed dark:bg-transparent!',
                )}
              >
                <CheckSquare className="h-4 w-4" />
                {t('bulk_actions', { defaultValue: 'Bulk Actions' })}
                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', isBulkMenuOpen && 'rotate-180')} />
              </Button>

              {isBulkMenuOpen && selectedIds.length > 0 && (
                <div
                  className="absolute right-0 top-11 z-50 min-w-[180px] rounded-xl border border-border/60 bg-white dark:bg-zinc-900 shadow-2xl py-1.5 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsBulkMenuOpen(false)}
                >
                  {/* Publish */}
                  {canPublishSelected && !allSelectedAreArchived && (
                    <button
                      type="button"
                      disabled={isBulkPublishing}
                      onClick={() => {
                        setIsBulkMenuOpen(false)
                        handleBulkPublish()
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-title-color dark:text-white hover:bg-primary/5! hover:text-primary! transition-colors"
                    >
                      {isBulkPublishing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      {t('publish_selected', { defaultValue: 'Publish' })}
                    </button>
                  )}

                  {/* Schedule */}
                  {canPublishSelected && !allSelectedAreArchived && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsBulkMenuOpen(false)
                        setIsScheduleModalOpen(true)
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-title-color dark:text-white hover:bg-primary/5! hover:text-primary! transition-colors"
                    >
                      <Clock className="w-4 h-4" />
                      {t('schedule', { defaultValue: 'Schedule' })}
                    </button>
                  )}

                  {/* Archive / Unarchive */}
                  {allSelectedAreArchived ? (
                    <button
                      type="button"
                      disabled={isBulkUnarchiving}
                      onClick={() => {
                        setIsBulkMenuOpen(false)
                        handleBulkUnarchive()
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-title-color dark:text-white hover:bg-primary/5! hover:text-primary! transition-colors"
                    >
                      {isBulkUnarchiving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Archive className="w-4 h-4" />
                      )}
                      {t('unarchive', { defaultValue: 'Unarchive' })}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsBulkMenuOpen(false)
                        setIsArchiveModalOpen(true)
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-title-color dark:text-white hover:bg-primary/5! hover:text-primary! transition-colors"
                    >
                      <Archive className="w-4 h-4" />
                      {t('archive', { defaultValue: 'Archive' })}
                    </button>
                  )}

                  {/* Assign Tags */}
                  {!isArchivedTab && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsBulkMenuOpen(false)
                        setIsAssignTagsModalOpen(true)
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-title-color dark:text-white hover:bg-primary/5! hover:text-primary! transition-colors"
                    >
                      <Tag className="w-4 h-4" />
                      {t('assign_tags', { defaultValue: 'Assign Tags' })}
                    </button>
                  )}

                  <div className="h-px bg-border/40 mx-3 my-1" />

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsBulkMenuOpen(false)
                      setIsBulkDeleteModalOpen(true)
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-500/5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t('delete_selected', { defaultValue: 'Delete Selected' })}
                  </button>
                </div>
              )}
            </div>

            {/* View toggle */}
            <div className="flex items-center bg-white dark:bg-white/3 border border-glass-border  p-1 h-11! rounded-[9px]!">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={cn(
                  'h-9 w-9 flex items-center justify-center transition-colors rounded-[8px]! cursor-pointer',
                  viewMode === 'grid' ? 'primary-btn text-white' : 'text-title-color',
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={cn(
                  'h-9 w-9 flex items-center justify-center transition-colors rounded-[8px]! cursor-pointer',
                  viewMode === 'list' ? 'primary-btn text-white' : 'text-title-color',
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )
      )}

      {/* ── Blog Grid / List ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col rounded-border-radius border border-glass-border bg-white dark:bg-white/3 overflow-hidden h-full">
              {/* Image Skeleton */}
              <div className="p-3 pb-0 flex-none">
                <div className="relative aspect-[16/10] overflow-hidden rounded-border-radius-inner bg-subcard dark:bg-white/3">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                  
                  {/* Checkbox Placeholder */}
                  {canManageBlogs && (
                    <div className="absolute top-4 left-4 z-20">
                      <Skeleton className="h-4 w-4 rounded" />
                    </div>
                  )}

                  {/* Category Badges Placeholder */}
                  <div
                    className={cn(
                      'absolute top-3 flex flex-wrap gap-1.5 z-10',
                      canManageBlogs ? 'left-10' : 'left-3',
                    )}
                  >
                    <Skeleton className="h-5 w-14 rounded-full opacity-80" />
                    <Skeleton className="h-5 w-12 rounded-full opacity-80" />
                  </div>
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="p-4 flex flex-col flex-1 gap-2">
                {/* Hashtags Placeholder */}
                <div className="flex flex-wrap gap-1">
                  <Skeleton className="h-5 w-12 rounded-full opacity-70" />
                  <Skeleton className="h-5 w-16 rounded-full opacity-70" />
                </div>

                {/* Title Placeholder */}
                <div className="space-y-2 mt-1.5">
                  <Skeleton className="h-5 w-11/12 rounded-lg" />
                  <Skeleton className="h-5 w-3/4 rounded-lg" />
                </div>

                {/* Footer Placeholder */}
                <div className="mt-auto pt-3.5 flex items-center justify-between border-t border-border/60 gap-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <span className="w-px h-4 bg-muted-foreground/10" />
                    <Skeleton className="h-4 w-12 rounded-md" />
                  </div>
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : blogs.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {blogs.map((blog) => {
              const blogId = blog._id || (blog as any).id
              return (
                <BlogGridCard
                  key={blogId}
                  blog={blog}
                  onEdit={canManageBlogs ? handleEdit : undefined}
                  onClick={() => { }}
                  onReadMore={() => handleDetails(blog)}
                  onDelete={
                    canManageBlogs
                      ? (id) => {
                        setBlogToDelete(id)
                        setIsDeleteModalOpen(true)
                      }
                      : undefined
                  }
                  isSelected={selectedIds.includes(blogId)}
                  onSelectChange={canManageBlogs ? (checked) => handleSelectChange(blogId, checked) : undefined}
                />
              )
            })}
          </div>
        ) : (
          /* List view */
          <div className="rounded-border-radius border border-glass-border overflow-auto max-h-[calc(100vh-300px)] bg-white dark:bg-white/3 no-scrollbar">
            <div className="min-w-[1000px]">
              <div className="sticky top-0 z-20 flex items-center gap-0 bg-slate-50 dark:bg-slate-900 border-b border-glass-border h-14">
                {/* Checkbox placeholder — same width as row checkbox cell */}
                {canManageBlogs && <div className="flex-shrink-0 w-10" />}
                {/* Thumbnail placeholder */}
                <div className="flex-shrink-0 w-16 h-9 ml-2" />
                {/* Blog column */}
                <span className=" w-[700px]  px-4 text-sm text-subtitle-color/60 dark:text-white! text-left rtl:text-right align-middle uppercase font-semibold">
                  Blog
                </span>
                {/* Category */}
                <span className=" w-50  px-2 text-sm font-semibold uppercase text-subtitle-color/60 dark:text-white! text-left rtl:text-right align-middle">
                  Category
                </span>
                {/* Status */}
                <span className=" w-40 px-2 text-sm font-semibold uppercase text-subtitle-color/60 dark:text-white! text-left rtl:text-right align-middle">
                  Status
                </span>
                {/* Author */}
                <span className="  w-40 px-2 text-sm font-semibold uppercase text-subtitle-color/60 dark:text-white! text-left rtl:text-right align-middle">
                  Author
                </span>
                {/* Updated */}
                <span className=" w-40 px-2 text-sm font-semibold uppercase text-subtitle-color/60 dark:text-white! text-left rtl:text-right align-middle">
                  Updated
                </span>
                {/* Actions */}
                <span className="  w-40 px-2 text-center text-sm font-semibold uppercase text-subtitle-color/60 dark:text-white! align-middle">
                  Actions
                </span>
              </div>
              {blogs.map((blog) => {
                const blogId = blog._id || (blog as any).id
                return (
                  <BlogListRow
                    key={blogId}
                    blog={blog}
                    onEdit={canManageBlogs ? handleEdit : undefined}
                    onClick={() => { }}
                    onReadMore={() => handleDetails(blog)}
                    onDelete={
                      canManageBlogs
                        ? (id) => {
                          setBlogToDelete(id)
                          setIsDeleteModalOpen(true)
                        }
                        : undefined
                    }
                    isSelected={selectedIds.includes(blogId)}
                    onSelectChange={canManageBlogs ? (checked) => handleSelectChange(blogId, checked) : undefined}
                  />
                )
              })}
            </div>
            {/* List header */}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center dark:bg-white/3 justify-center py-20 text-center space-y-6 bg-white rounded-border-radius border-2 border-dashed border-glass-border">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <LayoutGrid className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-title-color dark:text-white">{t('no_blogs_found')}</h3>
            <p className="text-subtitle-color max-w-sm mx-auto">
              {t('no_blogs_desc', { defaultValue: "You haven't published any blog posts yet." })}
            </p>
          </div>
        </div>
      )}
      
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setBlogToDelete(null)
        }}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title={t('delete_blog_title')}
        description={t('delete_blog_description')}
      />

      <DeleteConfirmationModal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => {
          setIsBulkDeleteModalOpen(false)
        }}
        onConfirm={handleBulkDelete}
        isLoading={isBulkDeleting}
        title={t('delete_selected_blogs_title', { defaultValue: 'Delete Selected Blogs' })}
        description={t('delete_selected_blogs_desc', {
          defaultValue: 'Are you sure you want to delete the selected blog posts? This action cannot be undone.',
        })}
      />

      <ConfirmationModal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onConfirm={handleBulkArchive}
        isLoading={isBulkArchiving}
        title={t('archive_selected_blogs_title', { defaultValue: 'Archive Selected Blogs' })}
        description={t('archive_selected_blogs_desc', {
          defaultValue:
            'Are you sure you want to archive the selected blog posts? They will be moved to the Archived tab.',
        })}
        confirmText={t('archive', { defaultValue: 'Archive' })}
        cancelText={t('cancel')}
      />

      {/* Bulk Schedule Modal */}
      <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
        <DialogContent className="sm:max-w-[480px] max-w-[calc(100%-2rem)] dark:bg-dark-base bg-light-body border-none rounded-border-radius shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-title-color dark:text-white">
              {t('schedule_selected_blogs', { defaultValue: 'Schedule Selected Blogs' })}
            </DialogTitle>
            <DialogDescription className="text-subtitle-color text-sm mt-1">
              {t('schedule_selected_desc', {
                defaultValue: 'Set the date and time to publish the selected blogs automatically.',
              })}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date Selector */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-subtitle-color">
                  {t('date', { defaultValue: 'Date' })}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full min-h-[44px] items-center justify-start text-left font-normal rounded-border-radius-inner hover:bg-slate-50 dark:hover:bg-white/5 bg-transparent border-slate-200/60 dark:border-white/10 transition-all px-4"
                    >
                      <CalendarIcon className="mr-3 h-4 w-4 text-primary opacity-80 shrink-0" />
                      <span className="font-semibold text-sm text-title-color dark:text-white">
                        {scheduleDate ? format(scheduleDate, 'MMM d, yyyy') : t('select_date')}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 border-slate-200 dark:border-white/10 bg-white dark:bg-black rounded-xl overflow-hidden shadow-2xl z-[60]"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={scheduleDate}
                      onSelect={setScheduleDate}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="p-3 border-none bg-transparent"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selector */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-subtitle-color">
                  {t('time', { defaultValue: 'Time' })}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full min-h-[44px] items-center justify-start text-left font-normal rounded-border-radius-inner hover:bg-slate-50 dark:hover:bg-white/5 bg-transparent border-slate-200/60 dark:border-white/10 transition-all px-4"
                    >
                      <Clock className="mr-3 h-4 w-4 text-primary opacity-80 shrink-0" />
                      <span className="font-semibold text-sm text-title-color dark:text-white">
                        {`${String(scheduleHour).padStart(2, '0')}:${String(scheduleMinute).padStart(2, '0')} ${scheduleAmPm}`}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4 border-slate-200 dark:border-white/10 bg-white dark:bg-black rounded-xl shadow-2xl z-[60]">
                    <div className="space-y-4">
                      <div className="text-center font-bold text-sm text-title-color dark:text-white border-b border-slate-100 dark:border-white/5 pb-2">
                        Select Time
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        {/* Hours */}
                        <div className="flex flex-col items-center w-1/3">
                          <span className="text-[10px] uppercase font-bold text-subtitle-color mb-1.5">Hour</span>
                          <div className="h-40 overflow-y-auto w-full pr-1 no-scrollbar scroll-smooth">
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
                              const isSel = scheduleHour === h
                              return (
                                <button
                                  key={h}
                                  type="button"
                                  onClick={() => setScheduleHour(h)}
                                  className={cn(
                                    'w-full py-1 text-sm font-semibold rounded-[6px] text-center my-0.5 transition-all cursor-pointer',
                                    isSel
                                      ? 'bg-primary text-white font-bold'
                                      : 'text-title-color dark:text-white hover:bg-slate-100 dark:hover:bg-white/5',
                                  )}
                                >
                                  {String(h).padStart(2, '0')}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* Minutes */}
                        <div className="flex flex-col items-center w-1/3">
                          <span className="text-[10px] uppercase font-bold text-subtitle-color mb-1.5">Min</span>
                          <div className="h-40 overflow-y-auto w-full pr-1 no-scrollbar">
                            {Array.from({ length: 60 }, (_, i) => i).map((m) => {
                              const isSel = scheduleMinute === m
                              return (
                                <button
                                  key={m}
                                  type="button"
                                  onClick={() => setScheduleMinute(m)}
                                  className={cn(
                                    'w-full py-1 text-sm font-semibold rounded-[6px] text-center my-0.5 transition-all cursor-pointer',
                                    isSel
                                      ? 'bg-primary text-white font-bold'
                                      : 'text-title-color dark:text-white hover:bg-slate-100 dark:hover:bg-white/5',
                                  )}
                                >
                                  {String(m).padStart(2, '0')}
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        {/* AM/PM */}
                        <div className="flex flex-col items-center w-1/3 gap-1.5">
                          <span className="text-[10px] uppercase font-bold text-subtitle-color mb-0.5">AM/PM</span>
                          {['AM', 'PM'].map((ampm) => {
                            const isSel = scheduleAmPm === ampm
                            return (
                              <button
                                key={ampm}
                                type="button"
                                onClick={() => setScheduleAmPm(ampm as any)}
                                className={cn(
                                  'w-full py-1.5 text-xs font-bold rounded-[6px] text-center transition-all cursor-pointer',
                                  isSel
                                    ? 'bg-primary text-white font-extrabold shadow-sm'
                                    : 'text-title-color dark:text-white bg-slate-50 dark:bg-white/3 hover:bg-slate-100 dark:hover:bg-white/5',
                                )}
                              >
                                {ampm}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <DialogFooter className="grid grid-cols-2 gap-3 sm:space-x-0">
            <Button
              variant="outline"
              onClick={() => setIsScheduleModalOpen(false)}
              disabled={isBulkScheduling}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl"
            >
              {t('cancel')}
            </Button>
            <Button
              onClick={handleConfirmSchedule}
              disabled={isBulkScheduling}
              className="w-full bg-primary text-white rounded-xl"
            >
              {isBulkScheduling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('scheduling', { defaultValue: 'Scheduling...' })}
                </>
              ) : (
                t('confirm_schedule', { defaultValue: 'Confirm Schedule' })
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Tags Modal */}
      <Dialog open={isAssignTagsModalOpen} onOpenChange={setIsAssignTagsModalOpen}>
        <DialogContent className="sm:max-w-[480px] max-w-[calc(100%-2rem)] dark:bg-dark-base bg-light-body border-none rounded-border-radius shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-title-color dark:text-white">
              {t('assign_tags_title', { defaultValue: 'Assign Tags to Selected Blogs' })}
            </DialogTitle>
            <DialogDescription className="text-subtitle-color text-sm mt-1">
              {t('assign_tags_desc', { defaultValue: 'Select one or more tags to append to the selected blog posts.' })}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 max-h-[300px] overflow-y-auto no-scrollbar">
            {allTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag: any) => {
                  const tagId = tag._id || tag.id
                  const isSelected = selectedTagIds.includes(tagId)
                  return (
                    <button
                      key={tagId}
                      type="button"
                      onClick={() => {
                        setSelectedTagIds((prev) =>
                          prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
                        )
                      }}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-semibold select-none border transition-all cursor-pointer',
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                          : 'bg-transparent text-muted-foreground border-border/60 hover:bg-primary/5 hover:text-primary hover:border-primary/20',
                      )}
                    >
                      #{tag.title}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-muted-foreground">
                {t('no_tags_available', { defaultValue: 'No tags available' })}
              </div>
            )}
          </div>

          <DialogFooter className="grid grid-cols-2 gap-3 sm:space-x-0">
            <Button
              variant="outline"
              onClick={() => {
                setIsAssignTagsModalOpen(false)
                setSelectedTagIds([])
              }}
              disabled={isBulkAssigningTags}
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-xl"
            >
              {t('cancel')}
            </Button>
            <Button
              onClick={handleBulkAssignTags}
              disabled={isBulkAssigningTags || selectedTagIds.length === 0}
              className="w-full bg-primary text-white rounded-xl"
            >
              {isBulkAssigningTags ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('assigning', { defaultValue: 'Assigning...' })}
                </>
              ) : (
                t('assign_tags', { defaultValue: 'Assign Tags' })
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BlogList
