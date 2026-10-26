'use client'

import { Card } from '@/components/ui/card'
import { getStatsConfig, iconMap } from '@/data/blogDashboard'
import { StatsGridProps } from '@/types'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function StatsGrid({ stats }: StatsGridProps) {
  const { t } = useTranslation()
  const statsConfig = getStatsConfig(t, stats)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
      {statsConfig.map((stat, i) => {
        const isPositive = stat.change.startsWith('+')
        const isNeutral = stat.change === '0' || stat.change === '0%'
        const showArrow = stat.isTrend && !isNeutral
        const colorClass = !stat.isTrend
          ? (stat.title === t('published', { defaultValue: 'Published' }) && Number(stat.value) > 0 ? 'text-emerald-500' : 'text-slate-400')
          : (isNeutral ? 'text-slate-400' : isPositive ? 'text-emerald-500' : 'text-rose-500')

        return (
          <Card key={i} className="p-4 bg-white dark:bg-white/3 border-glass-border hover-scale transition-all duration-300 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-2">
              <span className="text-md font-semibold text-subtitle-color">{stat.title}</span>
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                {iconMap[stat.iconType]}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-title-color dark:text-white leading-tight">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </h3>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold flex items-center gap-0.5 ${colorClass}`}>
                  {showArrow && (isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />)}
                  {stat.change}
                </span>
                <span className="text-xs text-subtitle-color truncate">{stat.desc}</span>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
