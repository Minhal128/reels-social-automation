import { ThreadsIcon } from '@/components/ui/threadsIcon'
import { XIcon as Twitter } from '@/components/ui/XIcon'
import { FacebookIcon } from '@/components/ui/FacebookIcon'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { LinkedInIcon } from '@/components/ui/LinkedInIcon'
import { YouTubeIcon } from '@/components/ui/YouTubeIcon'
import { TikTokIcon } from '@/components/ui/TikTokIcon'
import { ROUTES } from '@/constants/routes'
import { ChannelStatsPeriod } from '@/types/components/features'
import { PlatformConfig, StatItem } from '@/types/socialMedia'
import { CalendarCheck, CalendarClock, ChartNetwork, CheckCircle2, Circle, FileText, Heart, Loader2, LucideIcon, Music2, Plug, Send, Sparkles, TrendingUp, X } from 'lucide-react'
import { JSX } from 'react/jsx-runtime'

export const platforms: PlatformConfig[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: FacebookIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    borderColor: 'border-blue-600/30',
    description: 'Management protocols for Pages and community scale.',
    features: ['Pages', 'Groups', 'Analytics'],
    isAvailable: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: InstagramIcon,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    description: 'Visual engagement systems and business growth.',
    features: ['Business', 'Creator', 'Insights'],
    isAvailable: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: LinkedInIcon,
    color: 'text-blue-700',
    bgColor: 'bg-blue-700/10',
    borderColor: 'border-blue-700/30',
    description: 'Professional networking and corporate brand presence.',
    features: ['Profile', 'Company Page', 'Professional Network'],
    isAvailable: true,
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    icon: Twitter,
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30',
    description: 'Real-time updates and micro-blogging engagement.',
    features: ['Tweets', 'Analytics', 'Real-time'],
    isAvailable: true,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: YouTubeIcon,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    description: 'Video sharing and community building platform.',
    features: ['Videos', 'Shorts', 'Analytics'],
    isAvailable: true,
  },
  {
    id: 'threads',
    name: 'Threads',
    icon: ThreadsIcon,
    color: 'text-foreground',
    bgColor: 'bg-foreground/10',
    borderColor: 'border-foreground/30',
    description: 'Text and photo-sharing app connected to Instagram.',
    features: ['Text', 'Photo', 'Sharing'],
    isAvailable: true,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: TikTokIcon,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    description: 'Short-form mobile video content and community integration.',
    features: ['Videos', 'Direct Post', 'Insights'],
    isAvailable: true,
  },
]

export const platformsConfig = [
  { id: 'facebook', label: 'Facebook', color: '#1877F2', icon: FacebookIcon, bg: 'bg-[#1877F2]' },
  {
    id: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
    icon: InstagramIcon,
    bg: 'bg-gradient-to-tr from-[#FFB700] via-[#FF006B] to-[#AD00FF]',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    color: '#000000',
    icon: Twitter,
    bg: 'bg-black border border-white/20 hover:bg-black',
  },
  { id: 'linkedin', label: 'Linkedin', color: '#0A66C2', icon: LinkedInIcon, bg: 'bg-[#0A66C2] hover:bg-[#0A66C2]' },
  { id: 'youtube', label: 'Youtube', color: '#FF0000', icon: YouTubeIcon, bg: 'bg-[#FF0000] hover:bg-[#FF0000]' },
  {
    id: 'threads',
    label: 'Threads',
    color: '#000000',
    icon: ThreadsIcon,
    bg: 'bg-black dark:bg-white border border-black/10 dark:border-white/20 hover:bg-black',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    color: '#00F2FE',
    icon: TikTokIcon,
    bg: 'bg-[#FE2C55] hover:bg-[#FE2C55]',
  },
]

export const contentTypes = [
  { id: 'post', label: 'Post' },
  { id: 'story', label: 'Story' },
  { id: 'reel', label: 'Reel' },
]

export const statuses = [
  { id: 'all', label: 'All Status' },
  { id: 'published', label: 'Published' },
  { id: 'pending', label: 'Pending / Scheduled' },
  { id: 'failed', label: 'Failed' },
  { id: 'draft', label: 'Drafts' },
]

export const  weekdayLabelsFull= ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
export const weekdayLabelsShort = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
export const hourSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
export const periodLabelKeys: Record<ChannelStatsPeriod, string> = {
  today: 'today',
  week: 'this_week',
  month: 'this_month',
  year: 'this_year',
  all: 'all_time',
}

export const platformColors: Record<string, string> = {
  facebook: '#1877F2',
  instagram: '#E4405F',
  linkedin: '#0A66C2',
  twitter: '#1DA1F2',
  youtube: '#FF0000',
  threads: '#212427',
  tiktok: '#00F2FE',
}

export const periods = [
  { value: 'month', labelKey: 'this_month', defaultLabel: 'This Month' },
  { value: 'week', labelKey: 'this_week', defaultLabel: 'This Week' },
  { value: 'year', labelKey: 'this_year', defaultLabel: 'This Year' },
  { value: 'all', labelKey: 'all_time', defaultLabel: 'All Time' },
]

export const platformIcons: Record<string, React.ComponentType<any>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  twitter: Twitter,
  youtube: YouTubeIcon,
  threads: ThreadsIcon,
  tiktok: TikTokIcon,
}

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const fallbackStats = {
  totalAccounts: 0,
  accountsTrend: 0,
  totalPosts: 0,
  postsTrend: 0,
  publishedToday: 0,
  scheduledCount: 0,
  engagement30d: 0,
  engagementTrend: 0,
}

export const statItems: StatItem[] = [
  {
    key: 'totalAccounts',
    labelKey: 'connected_accounts',
    defaultLabel: 'Connected Accounts',
    icon: ChartNetwork,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    route: ROUTES.SOCIAL_MEDIA.CHANNELS,
  },
  {
    key: 'totalPosts',
    labelKey: 'total_posts',
    defaultLabel: 'Total Posts',
    icon: Send,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    route: ROUTES.SOCIAL_MEDIA.ACTIVITY,
  },
  {
    key: 'publishedToday',
    labelKey: 'published_today',
    defaultLabel: 'Published Today',
    icon: Heart,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    route: ROUTES.SOCIAL_MEDIA.ACTIVITY,
  },
  {
    key: 'scheduledCount',
    labelKey: 'scheduled',
    defaultLabel: 'Scheduled',
    icon: CalendarClock,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    route: ROUTES.SOCIAL_MEDIA.SCHEDULED,
  },
  {
    key: 'engagement30d',
    labelKey: 'engagement_30d',
    defaultLabel: 'Engagement (30d)',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    route: ROUTES.SOCIAL_MEDIA.ANALYTICS,
    format: (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : String(v)),
  },
]

export const iconMap: Record<string, React.ComponentType<any>> = {
  Plug,
  Sparkles,
  FileText,
  CalendarCheck,
  Send,
}

export const stepRoutes: Record<string, string> = {
  connect: ROUTES.SOCIAL_MEDIA.CHANNELS,
  generate: '/dashboard',
  caption: ROUTES.SOCIAL_MEDIA.CAPTIONS,
  review: ROUTES.SOCIAL_MEDIA.COMPOSER,
  publish: ROUTES.SOCIAL_MEDIA.COMPOSER,
}

export const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
  },
  in_progress: {
    icon: Loader2,
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    animate: 'animate-spin',
  },
  pending: {
    icon: Circle,
    color: 'text-muted-foreground',
    bg: 'bg-black/5 dark:bg-white/5',
    border: 'border-black/10 dark:border-white/10',
  },
}

export const connectorAngles = [-90, -38.6, 12.8, 64.2, 115.6, 167.0, 218.4] as const

export const platformNodes: {
  id: string
  angle: number
  Icon: React.ComponentType<any>
  iconClassName?: string
}[] = [
  { id: 'instagram', angle: -90, Icon: InstagramIcon },
  { id: 'linkedin', angle: -38.6, Icon: LinkedInIcon },
  { id: 'facebook', angle: 12.8, Icon: FacebookIcon, iconClassName: 'size-4' },
  { id: 'youtube', angle: 64.2, Icon: YouTubeIcon, iconClassName: 'size-4' },
  { id: 'twitter', angle: 115.6, Icon: Twitter, iconClassName: 'size-4' },
  { id: 'threads', angle: 167.0, Icon: ThreadsIcon, iconClassName: 'size-4' },
  { id: 'tiktok', angle: 218.4, Icon: TikTokIcon, iconClassName: 'size-4' },
]

export const socialMediaPlatformIcons: Record<string, JSX.Element> = {
  facebook: <FacebookIcon className="w-5 h-5 text-[#1877F2] shrink-0" />,
  linkedin: <LinkedInIcon className="w-5 h-5 text-[#0A66C2] shrink-0" />,
  twitter: <Twitter className="w-5 h-5 text-foreground shrink-0" />,
  x: <Twitter className="w-5 h-5 text-foreground shrink-0" />,
  youtube: <YouTubeIcon className="w-5 h-5 text-red-500 shrink-0" />,
  threads: <ThreadsIcon className="w-5 h-5 text-foreground shrink-0" />,
  tiktok: <TikTokIcon className="w-5 h-5 text-foreground shrink-0" />,
}

export const storyBackgrounds = [
  { id: '#0f172a', name: 'Dark', gradient: 'linear-gradient(to right, #0f172a, #1e293b)' },
  { id: 'sunset', name: 'Sunset', gradient: 'linear-gradient(to right, #f43f5e, #f97316)' },
  { id: 'indigo', name: 'Indigo', gradient: 'linear-gradient(to right, #1e1b4b, #4f46e5)' },
  { id: 'violet', name: 'Violet', gradient: 'linear-gradient(to right, #7c3aed, #db2777)' },
  { id: 'emerald', name: 'Emerald', gradient: 'linear-gradient(to right, #064e3b, #059669)' },
]

export const textColors = ['#ffffff', '#ff007f', '#00e5ff', '#ffeb3b', '#00ff66']