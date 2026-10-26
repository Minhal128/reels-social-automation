'use client'

import { Card } from '@/components/ui/card'
import { Activity } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'
import { getStatusChartOptions } from '@/data/blogDashboard'
import { StatusDistributionProps } from '@/types'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function StatusDistribution({ statusDistribution, totalBlogs, isDark }: StatusDistributionProps) {
  const { t } = useTranslation()

  const statusLabels = statusDistribution?.map((s: any) => s.status) || []
  const statusSeries = statusDistribution?.map((s: any) => s.count) || []

  const statusOptions = getStatusChartOptions(isDark, t, statusLabels, totalBlogs)

  return (
    <Card className="col-span-12 md:col-span-6 2xl:col-span-3 p-6 bg-white dark:bg-white/3 border-glass-border flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-[9px] bg-emerald-500 text-white shrink-0">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h3 className="sm:text-xl text-lg mb-0 font-extrabold text-title-color dark:text-white tracking-tight flex items-center gap-2">
            {t('blog_status_distribution', { defaultValue: 'Blog Status Distribution' })}
          </h3>
          <p className="text-base font-medium text-subtitle-color">
            {t('blog_status_desc', { defaultValue: 'Distribution of publication statuses.' })}
          </p>
        </div>
      </div>
      <div className="h-[280px] w-full flex items-center justify-center relative">
        {statusSeries.length > 0 ? (
          <Chart
            options={statusOptions}
            series={statusSeries}
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
