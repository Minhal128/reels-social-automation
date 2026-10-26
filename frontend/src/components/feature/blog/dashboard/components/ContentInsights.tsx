'use client'

import { Card } from '@/components/ui/card'
import { ContentInsightsProps } from '@/types'
import { Sparkles, BookOpen, MousePointer, FileText, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ContentInsights({ insights }: ContentInsightsProps) {
  const { t } = useTranslation()

  return (
    <Card className="col-span-12 md:col-span-6 2xl:col-span-3 p-6 bg-white dark:bg-white/3 border-glass-border flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-[9px] bg-indigo-500 text-white shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="sm:text-xl text-lg mb-0 font-extrabold text-title-color dark:text-white tracking-tight flex items-center gap-2">
            {t('content_insights', { defaultValue: 'Content Insights' })}
          </h3>
          <p className="text-base font-medium text-subtitle-color">
            {t('content_insights_desc', { defaultValue: 'Additional engagement metrics.' })}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Avg Read Time */}
        <div className="p-4 rounded-2xl bg-subcard dark:bg-white/2 border border-glass-border flex flex-col justify-between min-h-[100px]">
          <div className="flex justify-between items-center text-muted-foreground">
            <BookOpen className="w-5 h-5 text-purple-400" strokeWidth={2.5} />
            <span className={`text-2xs font-bold flex items-center gap-0.5 ${insights.avgReadTimeChange?.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}`}>
              {insights.avgReadTimeChange}
            </span>
          </div>
          <div>
            <div className="text-lg font-black text-title-color dark:text-white leading-tight mt-2">{insights.avgReadTime}</div>
            <div className="text-xs text-subtitle-color font-normal">{t('avg_read_time', { defaultValue: 'Read Time' })}</div>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="p-4 rounded-2xl bg-subcard dark:bg-white/2 border border-glass-border flex flex-col justify-between min-h-[100px]">
          <div className="flex justify-between items-center text-muted-foreground">
            <MousePointer className="w-5 h-5 text-rose-400" strokeWidth={2.5} />
            <span className={`text-2xs font-bold flex items-center gap-0.5 ${insights.bounceRateChange?.startsWith('+') ? 'text-rose-500' : 'text-emerald-500'}`}>
              {insights.bounceRateChange}
            </span>
          </div>
          <div>
            <div className="text-lg font-black text-title-color dark:text-white leading-tight mt-2">{insights.bounceRate}</div>
            <div className="text-xs text-subtitle-color font-normal">{t('bounce_rate', { defaultValue: 'Bounce Rate' })}</div>
          </div>
        </div>

        {/* Avg Word Count */}
        <div className="p-4 rounded-2xl bg-subcard dark:bg-white/2 border border-glass-border flex flex-col justify-between min-h-[100px]">
          <div className="flex justify-between items-center text-muted-foreground">
            <FileText className="w-5 h-5 text-blue-400" strokeWidth={2.5} />
            <span className={`text-2xs font-bold flex items-center gap-0.5 ${insights.wordCountChangePct?.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}`}>
              {insights.wordCountChangePct}
            </span>
          </div>
          <div>
            <div className="text-lg font-black text-title-color dark:text-white leading-tight mt-2">{(insights.avgWordCount || 0).toLocaleString()}</div>
            <div className="text-xs text-subtitle-color font-normal">{t('avg_word_count', { defaultValue: 'Avg Word Count' })}</div>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="p-4 rounded-2xl bg-subcard dark:bg-white/2 border border-glass-border flex flex-col justify-between min-h-[100px]">
          <div className="flex justify-between items-center text-muted-foreground">
            <Star className="w-5 h-5 text-amber-400" strokeWidth={2.5} />
            <span className={`text-2xs font-bold flex items-center gap-0.5 ${insights.featuredChangePct?.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}`}>
              {insights.featuredChangePct}
            </span>
          </div>
          <div>
            <div className="text-lg font-black text-title-color dark:text-white leading-tight mt-2">{(insights.featuredCount || 0).toLocaleString()}</div>
            <div className="text-xs text-subtitle-color font-normal">{t('featured_posts', { defaultValue: 'Featured Posts' })}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-border-radius-inner bg-primary/10 text-primary text-xs font-medium border border-primary/30 flex items-center justify-between">
        <span>{t('insights_tip', { defaultValue: 'Longer reads decrease bounce rate.' })}</span>
      </div>
    </Card>
  )
}
