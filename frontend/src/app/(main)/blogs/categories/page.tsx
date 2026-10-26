'use client'

import { PageHeader } from '@/components/reusable/PageHeader'
import Input from '@/components/ui/input'
import { PERMISSIONS } from '@/constants/permissions'
import { usePermission } from '@/hooks/usePermission'
import { FolderTree, Search, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CategoryManagement from '@/components/feature/blog/CategoryManagement'
import { Button } from '@/components/ui/button'

export default function BlogCategoriesPage() {
  const { t } = useTranslation()
  const { hasPermission } = usePermission()
  const canManageBlogs = hasPermission(PERMISSIONS.MANAGE_BLOGS)
  
  const [categorySearch, setCategorySearch] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const categoryRef = useRef<any>(null)

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<FolderTree className="w-6 h-6 text-primary animate-pulse" />}
        subtitle={t('categories_desc', { defaultValue: 'Manage blog categories and hierarchical folders.' })}
        showBackButton={false}
        title={t('blog_categories', { defaultValue: 'Blog Categories' })}
        endContent={
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-4 rtl:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('search_categories', { defaultValue: 'Search categories...' })}
                className="pl-12 rtl:pr-10 h-10 rounded-radius bg-white/3 border-border/40 focus:bg-white/3"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
              />
            </div>
            {canManageBlogs && isEditing && (
              <Button
                onClick={() => categoryRef.current?.handleCreate()}
                className="h-10 px-6 p-button-padding! text-sm font-medium text-white! primary-btn leading-0 gap-1.5 transition-all duration-300"
              >
                <span>{t('add_category', { defaultValue: 'Add Category' })}</span>
                <div className="w-4 opacity-100 transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden me-0">
                  <Plus className="w-5 h-5" />
                </div>
              </Button>
            )}
          </div>
        }
      />
      <CategoryManagement
        ref={categoryRef}
        search={categorySearch}
        onSearchChange={setCategorySearch}
        canManageBlogs={canManageBlogs}
        onSelectedCategoryChange={(category) => setIsEditing(!!category)}
      />
    </div>
  )
}
