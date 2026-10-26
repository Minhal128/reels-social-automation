'use client'

import { Card } from '@/components/ui/card'
import { TopPerformingBlogsProps } from '@/types'
import { Award } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export function TopPerformingBlogs({ topPerformingBlogs }: TopPerformingBlogsProps) {
  const { t } = useTranslation()

  return (
    <Card className="col-span-12 md:col-span-6 2xl:col-span-4 p-6 bg-white dark:bg-white/3 border-glass-border flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-[9px] bg-amber-500 text-white shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="sm:text-xl text-lg mb-0 font-extrabold text-title-color dark:text-white tracking-tight flex items-center gap-2">
              {t('top_performing_blogs', { defaultValue: 'Top Performing Blogs' })}
            </h3>
            <p className="text-base font-medium text-subtitle-color">
              {t('top_performing_blogs_desc', { defaultValue: 'Top articles ranked by view counts and engagement.' })}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4 max-h-[295px] overflow-y-auto no-scrollbar">
        {topPerformingBlogs?.map((blog: any) => {
          const isPositive = !blog.change.startsWith('-')
          return (
            <div key={blog.id} className="flex items-center justify-between first:pt-0 group/item border-b border-glass-border last:border-0 pb-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-glass-border bg-slate-500/10 shrink-0">
                  {blog.thumbnail ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${blog.thumbnail.replace(/^\//, '')}`}
                      alt={blog.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {blog.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-title-color dark:text-white group-hover/item:text-primary transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h4>
                  <span className="text-xs text-subtitle-color">
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 text-right pl-4">
                <div className="text-sm font-extrabold text-title-color dark:text-white">
                  {(blog.views || 0).toLocaleString()}{' '}
                  <span className="text-[10px] font-bold text-subtitle-color">
                    {t('views', { defaultValue: 'VIEWS' })}
                  </span>
                </div>
                <span className={`text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {isPositive ? '↑' : '↓'} {blog.change.replace(/^[+-]/, '')}
                </span>
              </div>
            </div>
          )
        })}

        {(!topPerformingBlogs || topPerformingBlogs.length === 0) && (
          <div className="py-8 text-center text-muted-foreground">{t('no_blogs_found')}</div>
        )}
      </div>
    </Card>
  )
}
