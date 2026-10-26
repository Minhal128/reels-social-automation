'use client'

import { Card } from '@/components/ui/card'
import { PieChart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'
import { getCategoryChartOptions } from '@/data/blogDashboard'
import { CategoryDistributionProps } from '@/types/blog'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function CategoryDistribution({ topCategories, totalBlogs, isDark }: CategoryDistributionProps) {
  const { t } = useTranslation()
  const categorySeries = topCategories?.map((c: any) => c.count) || []
  const categoryLabels = topCategories?.map((c: any) => c.name) || []
  const categoryOptions = getCategoryChartOptions(isDark, t, categoryLabels, totalBlogs)

  return (
    <Card className="col-span-12 md:col-span-6 2xl:col-span-4 p-6 bg-white dark:bg-white/3 border-glass-border flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-[9px] bg-purple-500 text-white shrink-0">
          <PieChart className="w-5 h-5" />
        </div>
        <div>
          <h3 className="sm:text-xl text-lg mb-0 font-extrabold text-title-color dark:text-white tracking-tight flex items-center gap-2">
            {t('top_blog_categories', { defaultValue: 'Top Categories' })}
          </h3>
          <p className="text-base font-medium text-subtitle-color">
            {t('top_blog_categories_desc', { defaultValue: 'Categories distribution of your articles.' })}
          </p>
        </div>
      </div>
      <div className="h-[280px] w-full flex items-center justify-center relative">
        {categorySeries.length > 0 ? (
          <Chart
            options={categoryOptions}
            series={categorySeries}
            type="donut"
            height="100%"
          />
        ) : (
          <div className="text-muted-foreground">{t('no_chart_data')}</div>
        )}
      </div>
    </Card>
  )
}
