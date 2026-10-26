'use client'

import BlogDashboard from '@/components/feature/blog/dashboard/BlogDashboard'
import { PageHeader } from '@/components/reusable/PageHeader'
import { FileImage } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export default function BlogDashboardPage() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<FileImage className="w-6 h-6 text-primary animate-pulse" />}
        subtitle={t('blogs_dashboard_desc', { defaultValue: 'Track and analyze blog performance, engagement, and traffic metrics' })}
        showBackButton={false}
        title={t('blog_dashboard', { defaultValue: 'Blog Dashboard' })}
      />
      <BlogDashboard />
    </div>
  )
}
