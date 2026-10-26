'use client'

import BlogDetails from '@/components/feature/blog/BlogDetails'
import BlogForm from '@/components/feature/blog/BlogForm'
import StatusPage from '@/components/reusable/StatusPage'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetBlogByIdQuery, useGetBlogsQuery } from '@/redux/api/blogApi'
import { Blog } from '@/types'
import { Calendar, Clock, FileQuestion, User } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { usePermission } from '@/hooks/usePermission'
import { PERMISSIONS } from '@/constants/permissions'

export default function BlogDetailsPage() {
  const { id } = useParams()
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const view = searchParams.get('view')
  
  const { hasPermission } = usePermission()
  const canManageBlogs = hasPermission(PERMISSIONS.MANAGE_BLOGS)

  const { data: blog, isLoading: isBlogLoading, error: blogError } = useGetBlogByIdQuery(id as string)
  const { data: blogsResponse, isLoading: isAllLoading } = useGetBlogsQuery({ limit: 100 })

  if (isBlogLoading || isAllLoading) {
    return (
      <div className="max-w-[1400px] mx-auto sm:p-8 p-4 animate-pulse space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {/* Header / Content Card */}
            <div className="rounded-border-radius border border-glass-border bg-white dark:bg-white/3 overflow-hidden">
              
              {/* Header Image Skeleton */}
              <div className="relative aspect-[21/9] w-full bg-subcard dark:bg-white/3 overflow-hidden flex flex-col justify-between p-4 sm:p-8">
                <Skeleton className="absolute inset-0 w-full h-full z-0" />
                
                {/* Back Button Placeholder */}
                <div className="z-10 relative">
                  <Skeleton className="h-9 w-32 rounded-xl bg-white/20 dark:bg-white/10" />
                </div>
                
                {/* Categories & Title & Edit Blog Placement */}
                <div className="z-10 relative flex justify-between items-end gap-4 w-full mt-auto">
                  <div className="space-y-3 w-2/3">
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20 rounded-full bg-white/20 dark:bg-white/10" />
                      <Skeleton className="h-6 w-12 rounded-full bg-white/20 dark:bg-white/10" />
                    </div>
                    <Skeleton className="h-8 w-full rounded-lg bg-white/20 dark:bg-white/10" />
                  </div>
                  <Skeleton className="h-9 w-24 rounded-xl bg-white/20 dark:bg-white/10 shrink-0" />
                </div>
              </div>

              {/* Meta Info Placeholder */}
              <div className="sm:px-8 px-4 py-6 border-b border-border/40 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-6 sm:gap-8 bg-muted/10">
                {/* Author */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-primary/40 animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-12 rounded" />
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                </div>

                {/* Published */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-primary/40 animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-16 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                </div>

                {/* Reading Time */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary/40 animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-20 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                </div>
              </div>

              {/* Article Content Placeholder */}
              <div className="sm:p-8 p-4 space-y-4">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-11/12 rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <div className="h-2" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            {/* Author Profile Card */}
            <div className="rounded-border-radius border border-glass-border bg-white dark:bg-white/3 sm:p-6 p-4 flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full p-0.5 border border-primary/15 flex items-center justify-center bg-slate-50 dark:bg-white/5">
                <div className="w-full h-full rounded-full flex items-center justify-center bg-primary/5">
                  <User className="w-10 h-10 text-primary/40 animate-pulse" />
                </div>
              </div>
              <div className="space-y-2 w-full flex flex-col items-center">
                <Skeleton className="h-6 w-32 rounded" />
                <Skeleton className="h-4 w-48 rounded" />
              </div>
              <div className="h-px w-full bg-border/40" />
              <div className="space-y-1.5 w-full flex flex-col items-center">
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-5/6 rounded" />
              </div>
            </div>

            {/* Recent Articles Card */}
            <div className="rounded-border-radius border border-glass-border bg-white dark:bg-white/3 sm:p-6 p-4 space-y-6">
              <Skeleton className="h-6 w-32 rounded" />
              <div className="space-y-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex gap-4">
                    {/* Thumbnail placeholder */}
                    <div className="w-20 h-20 rounded-2xl border border-border/40 bg-subcard dark:bg-white/3 overflow-hidden shrink-0">
                      <Skeleton className="w-full h-full" />
                    </div>
                    {/* Content placeholders */}
                    <div className="flex flex-col justify-center gap-2 flex-1">
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-5/6 rounded" />
                      </div>
                      <Skeleton className="h-3 w-16 rounded" />
                    </div>
                  </div>
                ))}
              </div>
              <Skeleton className="h-11 w-full rounded-xl bg-slate-200/60 dark:bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (blogError || !blog) {
    return (
      //  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      //   <h2 className="text-2xl font-bold">{t('blog_not_found', 'Blog not found')}</h2>
      //   <Button
      //     onClick={() => router.push('/blogs')}
      //     className="text-primary hover:underline font-semibold primary-btn text-white!"
      //   >
      //     {t('back_to_blogs', 'Back to Blogs')}
      //   </Button>
      //    </div>
        <StatusPage
          title={t('blog_not_found')}
          description={t('blog_not_found_desc')}
          errorCode="404"
          icon={FileQuestion}
          showHome={true}
        />
    )
  }

  const allBlogs = blogsResponse?.blogs || []

  if (view === 'edit') {
    return (
      <div className="max-w-[1400px] mx-auto sm:p-8 p-4">
        <BlogForm
          blog={blog}
          onClose={() => router.push(`/blog/${id}`)}
        />
      </div>
    )
  }

  return (
    <div>
      <BlogDetails
        blog={blog}
        allBlogs={allBlogs}
        onClose={() => router.push('/blogs')}
        onNavigate={(b: Blog) => router.push(`/blog/${b._id || b.id}`)}
        onEdit={canManageBlogs ? () => router.push(`/blogs/edit/${id}`) : undefined}
      />
    </div>
  )
}
