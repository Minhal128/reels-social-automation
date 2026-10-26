import { TFunction } from 'i18next'

export const getGridStatusConfig = (t: TFunction) => ({
  published: {
    label: t('published', { defaultValue: 'Published' }),
    className: 'bg-emerald-500/80 border-emerald-400/20',
  },
  draft: {
    label: t('draft', { defaultValue: 'Draft' }),
    className: 'bg-slate-500/80 border-slate-400/20',
  },
  scheduled: {
    label: t('scheduled', { defaultValue: 'Scheduled' }),
    className: 'bg-blue-500/80 border-blue-400/20',
  },
  archived: {
    label: t('archived', { defaultValue: 'Archived' }),
    className: 'bg-amber-500/80 border-amber-400/20',
  },
  unarchived: {
    label: t('draft', { defaultValue: 'Draft' }),
    className: 'bg-slate-500/80 border-slate-400/20',
  },
})

export const getRowStatusConfig = (t: TFunction) => ({
  published: {
    label: t('published', { defaultValue: 'Published' }),
    dotClass: 'bg-emerald-500',
    badgeClass: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  draft: {
    label: t('draft', { defaultValue: 'Draft' }),
    dotClass: 'bg-slate-400',
    badgeClass: 'text-slate-600 bg-slate-100 dark:bg-slate-500/10 dark:text-slate-400',
  },
  scheduled: {
    label: t('scheduled', { defaultValue: 'Scheduled' }),
    dotClass: 'bg-blue-500',
    badgeClass: 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400',
  },
  archived: {
    label: t('archived', { defaultValue: 'Archived' }),
    dotClass: 'bg-amber-500',
    badgeClass: 'text-amber-600 bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400',
  },
  unarchived: {
    label: t('draft', { defaultValue: 'Draft' }),
    dotClass: 'bg-slate-400',
    badgeClass: 'text-slate-600 bg-slate-200 dark:bg-slate-500/10 dark:text-slate-400',
  },
})
