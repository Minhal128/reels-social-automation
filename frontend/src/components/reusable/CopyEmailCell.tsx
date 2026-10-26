'use client'

import { cn } from '@/lib/utils'
import { CopyEmailCellProps } from '@/types'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

/**
 * Renders an email string in a table cell with a copy-to-clipboard icon
 * that appears on hover. Shows a check mark briefly after copying.
 */
export const CopyEmailCell = ({ email, truncate = true }: CopyEmailCellProps) => {
  const [copied, setCopied] = useState(false)

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Fallback: Unable to copy', err)
    }
    document.body.removeChild(textArea)
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
        .catch(() => {
          fallbackCopyTextToClipboard(email)
        })
    } else {
      fallbackCopyTextToClipboard(email)
    }
  }

  return (
    <span className="group/email inline-flex items-center gap-1! max-w-full">
      <span className={cn('text-sm text-subtitle-color', truncate ? 'truncate' : 'break-all')}>{email}</span>
      <Button
        variant="ghost"
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy email'}
        className="shrink-0 opacity-0 group-hover/email:opacity-100 w-4 h-4 p-0! flex items-center justify-center transition-opacity duration-150 text-muted-foreground hover:bg-transparent!"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3 h-3" />}
      </Button>
    </span>
  )
}
