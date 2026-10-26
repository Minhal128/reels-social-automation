'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import {
  Bell,
  Bot,
  Check,
  ExternalLink,
  FileText,
  Megaphone,
  RefreshCw,
  Rss,
  Trash2,
  UserPlus,
} from 'lucide-react'

import { FacebookIcon } from '@/components/ui/FacebookIcon'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { LinkedInIcon } from '@/components/ui/LinkedInIcon'
import { ThreadsIcon } from '@/components/ui/threadsIcon'
import { TikTokIcon } from '@/components/ui/TikTokIcon'
import { XIcon as Twitter } from '@/components/ui/XIcon'
import { YouTubeIcon } from '@/components/ui/YouTubeIcon'
import { NotificationRowProps } from '@/types/notification'
import { typeConfig } from '@/data/notification'
import { useTranslation } from 'react-i18next'

export function NotificationRow({
  notification,
  isSelected,
  toggleSelect,
  handleMarkAsRead,
  handleDelete,
  routerPush,
}: NotificationRowProps) {
  const { t } = useTranslation()
  const platform = notification.data?.platform?.toLowerCase()
  const text = (notification.title + ' ' + notification.message).toLowerCase()
  const isSuccess =
    text.includes('success') ||
    text.includes('completed') ||
    text.includes('done') ||
    text.includes('publish')
  const isFailed =
    text.includes('error') ||
    text.includes('failed') ||
    text.includes('alert') ||
    text.includes('unpublish')

  const cfg = typeConfig[notification.type] ?? typeConfig.system
  const timeAgo = formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })

  // Dynamic Platform Icon select
  const getPlatformIcon = () => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon className="w-9 h-9 shrink-0" filled />
      case 'instagram':
        return <InstagramIcon className="w-9 h-9 shrink-0" filled />
      case 'linkedin':
        return <LinkedInIcon className="w-9 h-9 shrink-0" filled />
      case 'youtube':
        return <YouTubeIcon className="w-9 h-9 shrink-0" filled />
      case 'threads':
        return <ThreadsIcon className="w-9 h-9 shrink-0 text-black dark:text-white" filled />
      case 'tiktok':
        return <TikTokIcon className="w-9 h-9 shrink-0" filled />
      case 'twitter':
      case 'x':
        return <Twitter className="w-9 h-9 shrink-0" filled />
      default:
        // Fallback
        if (notification.type === 'blog') return <FileText className="w-6 h-6 text-violet-500" />
        if (notification.type === 'member') return <UserPlus className="w-6 h-6 text-emerald-500" />
        if (notification.type === 'ai-task') return <Bot className="w-6 h-6 text-sky-500" />
        return <Bell className="w-6 h-6 text-primary" />
    }
  }

  return (
    <div
      className={cn(
        'group flex flex-col md:flex-row md:items-center gap-4 px-5 py-4 border-b border-glass-border last:border-b-0 transition-all duration-200',
        !notification.is_read
          ? 'bg-white dark:bg-white/3'
          : 'bg-white dark:bg-white/3',
        '',
        // isSelected && ''
      )}
    >
      {/* Left controls + Icon + Content with Badge */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Circle Checkbox */}
        <button
          onClick={() => toggleSelect(notification.id)}
          className={cn(
            'w-5 h-5 rounded-[4px]  border flex items-center justify-center transition-all duration-200 shrink-0',
            isSelected
              ? 'bg-primary border-primary text-white'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-primary/50'
          )}
        >
          {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
        </button>

        {/* Unread dot */}
        {/* <div className="w-1.5 h-1.5 rounded-full shrink-0 flex items-center justify-center">
          {!notification.is_read ? (
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-transparent" />
          )}
        </div> */}

        {/* Icon Container with Badge */}
        <div className="relative w-12 h-12 flex items-center justify-center bg-white dark:bg-zinc-900 rounded-border-radius-inner border border-zinc-200/80 dark:border-zinc-800 shadow-xs shrink-0">
          {getPlatformIcon()}
          {platform && isSuccess && (
            <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full border border-white dark:border-zinc-950 flex items-center justify-center shadow-xs">
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
            </div>
          )}
          {platform && isFailed && (
            <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-rose-500 rounded-full border border-white dark:border-zinc-950 flex items-center justify-center shadow-xs">
              <span className="text-[10px] font-extrabold text-white leading-none">!</span>
            </div>
          )}
        </div>

        {/* Body Text & Badge Block */}
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              'text-[15px] leading-snug',
              !notification.is_read
                ? 'font-bold text-zinc-900 dark:text-white'
                : 'font-semibold text-zinc-750 dark:text-zinc-300'
            )}
          >
            {notification.title}
          </h4>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <p className="text-sm text-subtitle-color dark:text-zinc-400 leading-normal break-words">
              {notification.message}
            </p>
            {/* Category Badge (Placed immediately after content) */}
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border shrink-0',
                isFailed && notification.type === 'social-publish'
                  ? 'bg-rose-500/5 text-rose-500 border-rose-250/50 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-900/30'
                  : isSuccess && notification.type === 'social-publish'
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : cfg.bg
              )}
            >
              {notification.type === 'social-publish'
                ? t('social_media', { defaultValue: 'Social' })
                : notification.type === 'blog'
                  ? t('blogs', { defaultValue: 'Blogs' })
                  : notification.type === 'member'
                    ? t('members', { defaultValue: 'Members' })
                    : notification.type === 'system'
                      ? t('system', { defaultValue: 'System' })
                      : notification.type === 'ai-task'
                        ? t('ai_suite', { defaultValue: 'AI Tasks' })
                        : t(notification.type, { defaultValue: cfg.label })}
            </span>
          </div>
        </div>
      </div>

      {/* Right details: Time, Action Button, Mark read / Delete */}
      <div className="flex flex-row md:flex-row items-center justify-between md:justify-end gap-5 shrink-0 pt-3 md:pt-0 border-t md:border-0 border-zinc-100 dark:border-zinc-800/50">

        {/* Time Ago */}
        <span className="text-sm text-subtitle-color dark:text-zinc-500 font-medium whitespace-nowrap min-w-[80px] text-right">
          {timeAgo}
        </span>

        {/* Action Button & Icons */}
        <div
          className={cn(
            'flex items-center gap-2',
            !notification.is_read ? 'flex-wrap md:flex-nowrap justify-end' : 'flex-nowrap'
          )}
        >
          {/* Action Button */}
          {isFailed && notification.data?.historyId && (
            <Button
              size="sm"
              variant="destructive"
              className="font-semibold flex items-center gap-1.5 h-9 px-4 rounded-xl border border-rose-200 text-rose-600 bg-rose-50/50 hover:bg-rose-100 hover:text-rose-750 dark:border-rose-900/30 dark:text-rose-400 dark:bg-rose-900/10 dark:hover:bg-rose-900/20 transition-colors duration-200 text-xs mr-1"
              onClick={() =>
                routerPush(`/social-media/composer?postId=${notification.data?.historyId}`)
              }
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('retry')}</span>
            </Button>
          )}

          {/* View Post Button for successes */}
          {isSuccess && notification.data?.post_url && (
            <Button
              asChild
              size="sm"
              variant="premium"
              className="font-bold flex items-center gap-1.5 h-8 px-3 rounded-lg shadow-none transition-all duration-300 py-1 bg-primary/10 border border-primary/30 text-primary"
            >
              <a href={notification.data.post_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t('view_post')}</span>
              </a>
            </Button>
          )}

          {/* Row Action Mark Read / Delete Inline */}
          <div className="flex items-center gap-2 shrink-0">
            {!notification.is_read && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-subtitle-color hover:text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors duration-300"
                onClick={() => handleMarkAsRead(notification.id)}
                title={t('mark_as_read')}
              >
                <Check className="w-4 h-4" />
              </Button>
            )}

            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white  dark:text-rose-400 dark:hover:bg-rose-500 dark:hover:text-white rounded-xl transition-all duration-300"
              onClick={() => handleDelete(notification.id)}
              title={t('delete')}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
