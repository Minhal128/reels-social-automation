'use client'

import { PageHeader } from '@/components/reusable/PageHeader'
import Input from '@/components/ui/input'
import { PERMISSIONS } from '@/constants/permissions'
import { usePermission } from '@/hooks/usePermission'
import { FileImage, Plus, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BlogList from './BlogList'
import { Button } from '@/components/ui/button'

const BlogManagement = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { hasPermission } = usePermission()

  const canManageBlogs = hasPermission(PERMISSIONS.MANAGE_BLOGS)

  const [blogSearch, setBlogSearch] = useState('')

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<FileImage className="w-6 h-6 text-primary animate-pulse" />}
        subtitle={t('blogs_desc', { defaultValue: 'Manage your blog articles, including creating, editing, publishing, and organizing content.' })}
        showBackButton={false}
        title={t('blog_management')}
        endContent={
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-4 rtl:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('search_blogs_placeholder', { defaultValue: 'Search blogs...' })}
                className="pl-12 rtl:pr-10 h-10 rounded-radius bg-white/3 border-border/40 focus:bg-white/3 w-full"
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
              />
            </div>
            {canManageBlogs && (
              <Button
                onClick={() => router.push('/blogs/create')}
                className="group p-button-padding! text-sm font-medium text-white! primary-btn leading-0 gap-1.5 transition-all duration-300 shrink-0 w-full sm:w-auto"
              >
                <span>{t('create_new_blog')}</span>
                <div className="w-4 opacity-100 transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden me-0">
                  <Plus className="w-5 h-5" />
                </div>
              </Button>
            )}
          </div>
        }
      />
      <BlogList
        search={blogSearch}
        onEdit={(blog) => router.push(`/blogs/edit/${blog._id || (blog as any).id}`)}
      />
    </div>
  )
}

export default BlogManagement
