'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { History } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { RecentBlogsTableProps } from '@/types'

export function RecentBlogsTable({ recentBlogs }: RecentBlogsTableProps) {
  const { t } = useTranslation()

  return (
    <Card className="col-span-12 md:col-span-6 2xl:col-span-5 p-6 bg-white dark:bg-white/3 border-glass-border flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-[9px] bg-pink-500 text-white shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="sm:text-xl text-lg mb-0 font-extrabold text-title-color dark:text-white tracking-tight flex items-center gap-2">
              {t('recent_blogs', { defaultValue: 'Recent Blogs' })}
            </h3>
            <p className="text-base font-medium text-subtitle-color">
              {t('recent_blogs_desc', { defaultValue: 'Quick view of your recently added blog posts.' })}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar -mx-6 max-h-[295px] overflow-y-auto">
        <div className="inline-block min-w-full align-middle px-6">
          <table className="min-w-full divide-y divide-glass-border">
            <thead>
              <tr className="text-left text-xs font-bold text-subtitle-color">
                <th scope="col" className="pb-3 pr-4">{t('blog_title', { defaultValue: 'Blog' })}</th>
                <th scope="col" className="pb-3 px-4">{t('date', { defaultValue: 'Date' })}</th>
                <th scope="col" className="pb-3 px-4">{t('status', { defaultValue: 'Status' })}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {recentBlogs?.map((blog: any) => (
                <tr key={blog.id} className="hover:bg-slate-500/5 transition-all group/row">
                  <td className="py-3.5 pr-4 whitespace-nowrap min-w-[200px] max-w-[280px]">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-glass-border bg-slate-500/10 shrink-0">
                        {blog.thumbnail ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${blog.thumbnail.replace(/^\//, '')}`}
                            alt={blog.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {blog.title.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="truncate font-bold text-sm text-title-color dark:text-white max-w-[250px]">
                        {blog.title}
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-xs font-semibold text-subtitle-color">
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {blog.status === 'published' && (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-400/20 px-2 py-0.5 rounded-full capitalize text-3xs font-bold">
                        {t('published')}
                      </Badge>
                    )}
                    {blog.status === 'draft' && (
                      <Badge className="bg-slate-500/10 text-slate-400 border border-slate-400/20 px-2 py-0.5 rounded-full capitalize text-3xs font-bold">
                        {t('draft')}
                      </Badge>
                    )}
                    {blog.status === 'scheduled' && (
                      <Badge className="bg-blue-500/10 text-blue-400 border border-blue-400/20 px-2 py-0.5 rounded-full capitalize text-3xs font-bold">
                        {t('scheduled')}
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}

              {(!recentBlogs || recentBlogs.length === 0) && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-muted-foreground">{t('no_blogs_found')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
