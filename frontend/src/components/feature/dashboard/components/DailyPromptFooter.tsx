'use client'

import { Button } from '@/components/ui/button'
import { DailyPromptFooterProps } from '@/types'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export const DailyPromptFooter = ({ toolName, toolRoute, icon: ToolIcon }: DailyPromptFooterProps) => {
  const { t } = useTranslation()

  return (
    <div className="relative z-10 flex items-center justify-between border-t border-glass-border pt-2 ">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <ToolIcon className="w-4 h-4 text-primary" />
        </div>
        <div className="text-left">
          <p className="text-xs text-subtitle-color  leading-none line-clamp-1">
            {t('recommended_tool', { defaultValue: 'Recommended Tool' })}
          </p>
          <p className="text-xs text-title-color dark:text-white font-extrabold mt-1 leading-none line-clamp-1 ">
            {toolName}
          </p>
        </div>
      </div>

      <Button
        asChild
        className="h-8.5 px-3 rounded-lg primary-btn  text-white! font-bold text-[11px] shadow-md border-0 cursor-pointer flex items-center gap-1.5 transition-all duration-300  leading-none"
      >
        <Link href={toolRoute}>
          <span>{t('try_now', { defaultValue: 'Try Now' })}</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  )
}
