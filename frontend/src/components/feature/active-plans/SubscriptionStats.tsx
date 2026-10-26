'use client'

import { Card } from '@/components/ui/card'
import { subscriptionStatsConfig } from '@/data/subscription'
import { useTranslation } from 'react-i18next'
import { Skeleton } from '@/components/ui/skeleton'

const SubscriptionStats = ({ statsData, isLoading }: any) => {
  const { t } = useTranslation()

  const stats = statsData || {}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 sm:gap-6 gap-4 mb-8 pt-4">
      {subscriptionStatsConfig.map((stat, i) => {
        const value = stats[stat.key] || 0;
        return (
          <Card key={i} className="relative p-5 group border-0 cursor-pointer! backdrop-blur-md transition-all duration-300">
            {isLoading ? (
              <div className="relative z-10 flex gap-4">
                <Skeleton className="w-12 h-12 rounded-full bg-slate-200/80 dark:bg-white/10" />
                <div className="space-y-2">
                  <Skeleton className="w-16 h-6 bg-slate-200/80 dark:bg-white/10 rounded" />
                  <Skeleton className="w-28 h-4 bg-slate-200/80 dark:bg-white/10 rounded" />
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex gap-4">
                <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color} w-12 h-12 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-title-color dark:text-white">
                    {stat.isCurrency ? `$${value}` : value}
                  </p>
                  <p className="text-base font-medium text-muted-foreground mt-1">{t(stat.labelKey)}</p>
                </div>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}

export default SubscriptionStats
