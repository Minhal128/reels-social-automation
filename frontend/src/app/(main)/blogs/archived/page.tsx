'use client'

import { PageHeader } from '@/components/reusable/PageHeader'
import Input from '@/components/ui/input'
import { Archive, Search } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import BlogList from '@/components/feature/blog/BlogList'

export default function BlogArchivedPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [blogSearch, setBlogSearch] = useState('')

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Archive className="w-6 h-6 text-primary animate-pulse" />}
        subtitle={t('archived_blogs_desc', { defaultValue: 'View and manage your archived blog articles.' })}
        showBackButton={false}
        title={t('archived_blogs', { defaultValue: 'Archived Blogs' })}
        endContent={
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-4 rtl:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('search_blogs_placeholder', { defaultValue: 'Search blogs...' })}
                className="pl-12 rtl:pr-10 h-10 rounded-radius bg-white/3 border-border/40 focus:bg-white/3"
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
              />
            </div>
          </div>
        }
      />
      <BlogList
        search={blogSearch}
        status="archived"
        onEdit={(blog) => {
          router.push(`/blogs/edit/${blog._id || (blog as any).id}`)
        }}
      />
    </div>
  )
}
