import { FilterTab } from "@/types/notification";
import { Bot, FileText, Megaphone, Rss, UserPlus } from "lucide-react";

export const tabLabels: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'social-publish', label: 'Social' },
  { key: 'ai-task', label: 'AI Tasks' },
  { key: 'blog', label: 'Blogs' },
  { key: 'member', label: 'Members' },
]

export const typeConfig: Record<
  string,
  { icon: React.ReactNode; bg: string; label: string }
> = {
  blog: {
    icon: <FileText className="w-4 h-4" />,
    bg: 'bg-violet-500/10 text-violet-500 dark:bg-violet-500/20',
    label: 'Blogs',
  },
  member: {
    icon: <UserPlus className="w-4 h-4" />,
    bg: 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20',
    label: 'Members',
  },
  system: {
    icon: <Megaphone className="w-4 h-4" />,
    bg: 'bg-rose-500/10 text-rose-500 dark:bg-rose-500/20',
    label: 'System',
  },
  'ai-task': {
    icon: <Bot className="w-4 h-4" />,
    bg: 'bg-sky-500/10 text-sky-500 dark:bg-sky-500/20',
    label: 'AI Tasks',
  },
  'social-publish': {
    icon: <Rss className="w-4 h-4" />,
    bg: 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20',
    label: 'Social',
  },
}