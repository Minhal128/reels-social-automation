'use client'

import { useGetBlogDashboardQuery } from '@/redux/api/blogApi'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { StatsGrid } from './components/StatsGrid'
import { ViewsOverview } from './components/ViewsOverview'
import { CategoryDistribution } from './components/CategoryDistribution'
import { StatusDistribution } from './components/StatusDistribution'
import { TopPerformingBlogs } from './components/TopPerformingBlogs'
import { RecentBlogsTable } from './components/RecentBlogsTable'
import { ContentInsights } from './components/ContentInsights'

export default function BlogDashboard() {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const { data, isLoading, error } = useGetBlogDashboardQuery()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-4 bg-white dark:bg-white/3 border-glass-border space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-20" />
            </Card>
          ))}
        </div>
        {/* Row 1 Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <Card className="xl:col-span-5 p-6 bg-white dark:bg-white/3 border-glass-border">
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-[300px] w-full" />
          </Card>
          <Card className="xl:col-span-3 p-6 bg-white dark:bg-white/3 border-glass-border">
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-[300px] w-full" />
          </Card>
          <Card className="xl:col-span-4 p-6 bg-white dark:bg-white/3 border-glass-border">
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-[300px] w-full" />
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-red-500/5 rounded-border-radius border border-red-500/20">
        <h3 className="text-xl font-bold text-red-500">Failed to load blog dashboard</h3>
        <p className="text-muted-foreground text-sm max-w-md">There was an error loading the analytics. Please try refreshing or checking your database connection.</p>
      </div>
    )
  }

  const stats = data?.statistics || {}
  const insights = data?.contentInsights || {}

  return (
    <div className="space-y-6">
      {/* 1. Stat Cards Grid */}
      <StatsGrid stats={stats} />

      {/* 2. Charts and Data Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Views Overview Chart */}
        <ViewsOverview viewsOverview={data?.charts?.viewsOverview || []} isDark={isDark} />

        {/* Top Blog Categories Chart */}
        <CategoryDistribution 
          topCategories={data?.charts?.topCategories || []} 
          totalBlogs={stats.totalBlogs || 0} 
          isDark={isDark} 
        />

        {/* Blog Status Distribution Chart */}
        <StatusDistribution 
          statusDistribution={data?.charts?.statusDistribution || []} 
          totalBlogs={stats.totalBlogs || 0} 
          isDark={isDark} 
        />

        {/* Top Performing Blogs List */}
        <TopPerformingBlogs topPerformingBlogs={data?.topPerformingBlogs || []} />

        {/* Recent Blogs Table */}
        <RecentBlogsTable recentBlogs={data?.recentBlogs || []} />

        {/* Content Insights Card */}
        <ContentInsights insights={insights} />
      </div>
    </div>
  )
}
