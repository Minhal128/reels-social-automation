import { TFunction } from 'i18next'
import { getCommonChartOptions } from '@/data/dashboard'
import { Activity, Clock, Eye, FileText, Send } from 'lucide-react'

export interface StatsConfigItem {
  title: string
  value: string | number
  change: string
  iconType: 'total_blogs' | 'published' | 'drafts' | 'scheduled' | 'total_views' | 'avg_engagement'
  color: string
  bg: string
  desc: string
  isTrend: boolean
}

export const getStatsConfig = (t: TFunction, stats: any): StatsConfigItem[] => [
  {
    title: t('total_blogs', { defaultValue: 'Total Blogs' }),
    value: stats.totalBlogs || 0,
    change: stats.totalBlogsChange || '0',
    iconType: 'total_blogs',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10 border-purple-400/20',
    desc: t('total_created_blogs', { defaultValue: 'All created posts' }),
    isTrend: true
  },
  {
    title: t('published', { defaultValue: 'Published' }),
    value: stats.publishedCount || 0,
    change: `${stats.publishedPercentage || 0}%`,
    iconType: 'published',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    desc: t('published_percentage', { defaultValue: 'Live on website' }),
    isTrend: false
  },
  {
    title: t('drafts', { defaultValue: 'Drafts' }),
    value: stats.draftsCount || 0,
    change: `${stats.draftsPercentage || 0}%`,
    iconType: 'drafts',
    color: 'text-slate-500',
    bg: 'bg-slate-500/10 border-slate-400/20',
    desc: t('drafts_percentage', { defaultValue: 'Work in progress' }),
    isTrend: false
  },
  {
    title: t('scheduled', { defaultValue: 'Scheduled' }),
    value: stats.scheduledCount || 0,
    change: `${stats.scheduledPercentage || 0}%`,
    iconType: 'scheduled',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10 border-blue-400/20',
    desc: t('scheduled_percentage', { defaultValue: 'Queued for publish' }),
    isTrend: false
  },
  {
    title: t('total_views', { defaultValue: 'Total Views' }),
    value: stats.totalViews || 0,
    change: stats.viewsChangePct || '0%',
    iconType: 'total_views',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10 border-amber-400/20',
    desc: t('views_growth', { defaultValue: 'Traffic performance' }),
    isTrend: true
  },
  {
    title: t('avg_engagement', { defaultValue: 'Avg. Engagement' }),
    value: stats.avgEngagement || '0%',
    change: stats.engagementChangePct || '0%',
    iconType: 'avg_engagement',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10 border-pink-400/20',
    desc: t('engagement_desc', { defaultValue: 'Likes, shares & comments' }),
    isTrend: true
  }
]

export const getViewsChartOptions = (isDark: boolean, t: TFunction, categories: string[]) => {
  const common = getCommonChartOptions(isDark, t)
  return {
    ...common,
    chart: {
      ...common.chart,
      type: 'line' as const,
      height: 350,
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    stroke: {
      curve: 'smooth' as const,
      width: 3.5,
    },
    colors: ['#3b82f6'],
    xaxis: {
      ...common.xaxis,
      categories,
    },
  }
}

export const getCategoryChartOptions = (isDark: boolean, t: TFunction, labels: string[], totalBlogs: number) => {
  const common = getCommonChartOptions(isDark, t)
  return {
    ...common,
    chart: {
      ...common.chart,
      type: 'donut' as const,
    },
    labels,
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#64748b'],
    stroke: { show: false },
    legend: {
      position: 'bottom' as const,
      fontSize: '12px',
      labels: {
        colors: isDark ? '#ffffff' : '#000000',
      },
      formatter: function (val: string) {
        return val.length > 15 ? val.slice(0, 15) + '...' : val
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            name: {
              show: true,
              formatter: (val: string) => {
                return val.length > 12 ? val.substring(0, 12) + '...' : val
              }
            },
            total: {
              show: true,
              label: t('total', { defaultValue: 'Total' }),
              color: isDark ? '#a0aec0' : '#4a5568',
              formatter: () => totalBlogs
            }
          }
        }
      }
    }
  }
}

export const getStatusChartOptions = (isDark: boolean, t: TFunction, labels: string[], totalBlogs: number) => {
  const common = getCommonChartOptions(isDark, t)
  return {
    ...common,
    chart: {
      ...common.chart,
      type: 'donut' as const,
    },
    labels,
    colors: ['#10b981', '#64748b', '#3b82f6'],
    stroke: { show: false },
    legend: {
      position: 'bottom' as const,
      fontSize: '12px',
      labels: {
        colors: isDark ? '#ffffff' : '#000000',
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            name: {
              show: true,
              formatter: (val: string) => {
                return val.length > 12 ? val.substring(0, 12) + '...' : val
              }
            },
            total: {
              show: true,
              label: t('total', { defaultValue: 'Total' }),
              color: isDark ? '#a0aec0' : '#4a5568',
              formatter: () => totalBlogs
            }
          }
        }
      }
    }
  }
}

export const iconMap = {
  total_blogs: <FileText className="w-6 h-6" />,
  published: <Send className="w-6 h-6" />,
  drafts: <FileText className="w-6 h-6" />,
  scheduled: <Clock className="w-6 h-6" />,
  total_views: <Eye className="w-6 h-6" />,
  avg_engagement: <Activity className="w-6 h-6" />
}