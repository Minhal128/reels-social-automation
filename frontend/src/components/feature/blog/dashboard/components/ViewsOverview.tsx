'use client'

import { Card } from '@/components/ui/card'
import { ChartNetwork } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'
import { getViewsChartOptions } from '@/data/blogDashboard'
import { ViewsOverviewProps } from '@/types'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export function ViewsOverview({ viewsOverview, isDark }: ViewsOverviewProps) {
  const { t } = useTranslation()

  const viewsSeries = [{
    name: t('views', { defaultValue: 'Views' }),
    data: viewsOverview?.map((d: any) => d.views) || []
  }]

  const categories = viewsOverview?.map((d: any, index: number) => {
    if (index % 7 === 0) {
      return d.date
    }
    return ''
  }) || []

  const viewsOptions = getViewsChartOptions(isDark, t, categories)

  return (
    <Card className="col-span-12 md:col-span-6 2xl:col-span-5 p-6 bg-white dark:bg-white/3 border-glass-border flex flex-col justify-between">
      <div className="flex justify-between items-start mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-[9px] bg-blue-500 text-white shrink-0">
            <ChartNetwork className="w-5 h-5" />
          </div>
          <div>
            <h3 className="sm:text-xl text-lg mb-0 font-extrabold text-title-color dark:text-white tracking-tight flex items-center gap-2">
              {t('views_overview', { defaultValue: 'Views Overview' })}
            </h3>
            <p className="text-base font-medium text-subtitle-color">
              {t('views_overview_desc', { defaultValue: 'Daily blog page views overview over the last 30 days.' })}
            </p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-full dark:bg-white/5 bg-light-body border border-glass-border text-xs font-bold text-title-color">
          {t('last_30_days', { defaultValue: 'Last 30 Days' })}
        </div>
      </div>
      <div className="h-[320px] w-full">
        {viewsOverview?.length > 0 ? (
          <Chart
            options={viewsOptions}
            series={viewsSeries}
            type="line"
            height="100%"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">{t('no_chart_data')}</div>
        )}
      </div>
    </Card>
  )
}
