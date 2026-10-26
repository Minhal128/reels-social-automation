'use client'

import { PageHeader } from '@/components/reusable/PageHeader'
import Input from '@/components/ui/input'
import { PERMISSIONS } from '@/constants/permissions'
import { usePermission } from '@/hooks/usePermission'
import { Hash, Plus, Search } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TagManagement from '@/components/feature/blog/TagManagement'
import { Button } from '@/components/ui/button'

export default function BlogTagsPage() {
  const { t } = useTranslation()
  const { hasPermission } = usePermission()
  const canManageBlogs = hasPermission(PERMISSIONS.MANAGE_BLOGS)

  const [tagSearch, setTagSearch] = useState('')
  const tagRef = useRef<any>(null)

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<Hash className="w-6 h-6 text-primary animate-pulse" />}
        subtitle={t('tags_desc', { defaultValue: 'Manage blog tags and labels for classification.' })}
        showBackButton={false}
        title={t('blog_tags', { defaultValue: 'Blog Tags' })}
        endContent={
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-4 rtl:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('search_tags', { defaultValue: 'Search tags...' })}
                className="pl-12 rtl:pr-10 h-10 rounded-radius bg-white/3 border-border/40 focus:bg-white/3"
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
              />
            </div>
            {canManageBlogs && (
              <Button
                onClick={() => tagRef.current?.handleCreate()}
                className="h-10 px-6 p-button-padding! text-sm font-medium text-white! primary-btn leading-0 gap-1.5 transition-all duration-300"
              >
                <span>{t('add_tag')}</span>
                <div className="w-4 opacity-100 transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden me-0">
                  <Plus className="w-5 h-5" />
                </div>
              </Button>
            )}
          </div>
        }
      />
      <TagManagement ref={tagRef} search={tagSearch} onSearchChange={setTagSearch} />
    </div>
  )
}
