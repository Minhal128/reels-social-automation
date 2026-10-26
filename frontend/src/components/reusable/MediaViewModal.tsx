'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { MediaModalContentProps, MediaViewModalProps } from '@/types'
import { formatDate } from '@/utils'
import {
  AlertCircle,
  Calendar,
  Clock,
  Copy,
  Download,
  ImageIcon,
  Loader2,
  Save,
  Trash2,
  Zap,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  FileText,
  Cpu,
} from 'lucide-react'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const MediaViewModal: React.FC<MediaViewModalProps> = ({
  isOpen,
  onClose,
  title: titleProp,
  status: statusProp,
  mediaUrl: mediaUrlProp,
  isVideo = false,
  isLoadingMedia = false,
  errorMessage,
  prompt: promptProp,
  creditsUsed: creditsUsedProp,
  createdAt: createdAtProp,
  description: descriptionProp,
  onDownload,
  onDelete,
  isDeleting = false,
  onSaveToMedia,
  isSavingToMedia = false,
  customBadges: customBadgesProp,
  isCharacter = false,
  characterList: characterListProp = [],
  currentCharacterIndex: currentCharacterIndexProp,
  onNavigateCharacter,
  onUseCharacter,
  customResolution: customResolutionProp,
  customStyle: customStyleProp,
  customFileSize: customFileSizeProp,
  customModel: customModelProp,
  customUsageCount: customUsageCountProp,
}) => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const [cachedProps, setCachedProps] = useState<MediaModalContentProps | null>(null)

  useEffect(() => {
    if (isOpen && titleProp) {
      setCachedProps({
        title: titleProp,
        mediaUrl: mediaUrlProp,
        prompt: promptProp,
        description: descriptionProp,
        createdAt: createdAtProp,
        creditsUsed: creditsUsedProp,
        customResolution: customResolutionProp,
        customStyle: customStyleProp,
        customFileSize: customFileSizeProp,
        customModel: customModelProp,
        customUsageCount: customUsageCountProp,
        characterList: characterListProp,
        currentCharacterIndex: currentCharacterIndexProp,
        customBadges: customBadgesProp,
        status: statusProp,
      })
    }
  }, [
    isOpen,
    titleProp,
    mediaUrlProp,
    promptProp,
    descriptionProp,
    createdAtProp,
    creditsUsedProp,
    customResolutionProp,
    customStyleProp,
    customFileSizeProp,
    customModelProp,
    customUsageCountProp,
    characterListProp,
    currentCharacterIndexProp,
    customBadgesProp,
    statusProp,
  ])

  const title = isOpen ? titleProp : cachedProps?.title || ''
  const mediaUrl = isOpen ? mediaUrlProp : cachedProps?.mediaUrl || null
  const prompt = isOpen ? promptProp : cachedProps?.prompt || null
  const description = isOpen ? descriptionProp : cachedProps?.description || null
  const createdAt = isOpen ? createdAtProp : cachedProps?.createdAt || null
  const creditsUsed = isOpen ? creditsUsedProp : cachedProps?.creditsUsed || undefined
  const customResolution = isOpen ? customResolutionProp : cachedProps?.customResolution || ''
  const customStyle = isOpen ? customStyleProp : cachedProps?.customStyle || ''
  const customFileSize = isOpen ? customFileSizeProp : cachedProps?.customFileSize || ''
  const customModel = isOpen ? customModelProp : cachedProps?.customModel || ''
  const customUsageCount = isOpen ? customUsageCountProp : cachedProps?.customUsageCount ?? undefined
  const characterList = isOpen ? characterListProp : cachedProps?.characterList || []
  const currentCharacterIndex = isOpen ? currentCharacterIndexProp : (cachedProps?.currentCharacterIndex ?? 0)
  const customBadges = isOpen ? customBadgesProp : cachedProps?.customBadges || null
  const status = isOpen ? statusProp : cachedProps?.status || undefined
  
  const [actualFileSize, setActualFileSize] = useState<string | null>(null)

  useEffect(() => {
    if (!mediaUrl) {
      setActualFileSize(null)
      return
    }

    if (customFileSize && customFileSize !== '2.4 MB') {
      setActualFileSize(customFileSize)
      return
    }

    let isMounted = true
    const fetchSize = async () => {
      try {
        const response = await fetch(mediaUrl, { method: 'HEAD' })
        if (!isMounted) return

        const contentLength = response.headers.get('content-length')
        if (contentLength) {
          const bytes = parseInt(contentLength, 10)
          if (!isNaN(bytes)) {
            if (bytes >= 1048576) {
              setActualFileSize((bytes / 1048576).toFixed(2) + ' MB')
            } else if (bytes >= 1024) {
              setActualFileSize((bytes / 1024).toFixed(2) + ' KB')
            } else {
              setActualFileSize(bytes + ' Bytes')
            }
            return
          }
        }
      } catch (error) {
      }

      try {
        const controller = new AbortController()
        const response = await fetch(mediaUrl, { signal: controller.signal })
        controller.abort()
        if (!isMounted) return

        const contentLength = response.headers.get('content-length')
        if (contentLength) {
          const bytes = parseInt(contentLength, 10)
          if (!isNaN(bytes)) {
            if (bytes >= 1048576) {
              setActualFileSize((bytes / 1048576).toFixed(2) + ' MB')
            } else if (bytes >= 1024) {
              setActualFileSize((bytes / 1024).toFixed(2) + ' KB')
            } else {
              setActualFileSize(bytes + ' Bytes')
            }
            return
          }
        }
      } catch (error) {
      }

      if (isMounted) {
        setActualFileSize(null)
      }
    }

    fetchSize()
    return () => {
      isMounted = false
    }
  }, [mediaUrl, customFileSize])

  const thumbnailsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (thumbnailsContainerRef.current && typeof currentCharacterIndex === 'number') {
      const container = thumbnailsContainerRef.current
      const activeChild = container.children[currentCharacterIndex] as HTMLElement
      if (activeChild) {
        activeChild.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [currentCharacterIndex])

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!prompt) return
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    toast.success(t('prompt_copied', { defaultValue: 'Prompt copied to clipboard!' }))
    setTimeout(() => setCopied(false), 2000)
  }

  const isCompleted = !isLoadingMedia && !errorMessage

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          'max-w-[calc(100%-2rem)]! rounded-3xl! border border-glass-border text-title-color dark:text-white p-0! sm:p-0! [&>button:last-child]:hidden',
          isCharacter
            ? 'fixed! left-[50%]! top-[50%]! translate-x-[-50%]! translate-y-[-50%]! w-[calc(100vw-32px)]! md:w-[calc(100vw-96px)]! max-w-[1600px]! h-[calc(100vh-32px)]! md:h-[calc(100vh-96px)]! max-h-[1200px]! rounded-3xl! border border-slate-200! dark:border-zinc-800! bg-white! dark:bg-[#0c0d10]! shadow-2xl! overflow-hidden flex flex-col md:flex-row'
            : 'sm:max-w-2xl! p-6! flex flex-col',
        )}
      >
        {isCharacter ? (
          /* Character Split Layout Mode */
          <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
            {/* Left Column - Image & Carousel */}
            <div className="md:w-1/2 w-full bg-zinc-950 relative flex flex-col items-center justify-center h-[45%] md:h-full overflow-hidden">
              {/* Back Arrow button overlay */}
              <Button
                onClick={onClose}
                type="button"
                className="absolute top-6 left-6 z-35 w-10 h-10 rounded-full bg-white! p-0! text-zinc-900 flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer!"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>

              {/* Image Preview Container */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {isLoadingMedia || !mediaUrl ? (
                  <div className="w-full h-full animate-pulse bg-zinc-900/60 dark:bg-zinc-950/60 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-zinc-700/50 animate-pulse" />
                  </div>
                ) : errorMessage ? (
                  <div className="flex flex-col items-center justify-center text-rose-500 gap-3">
                    <AlertCircle className="w-12 h-12" />
                    <span className="text-xs font-medium uppercase tracking-widest">{t('failed')}</span>
                  </div>
                ) : (
                  <>
                    <Image
                      src={mediaUrl}
                      alt="Blurred background"
                      fill
                      unoptimized
                      className="object-cover blur-md scale-110 opacity-30 select-none pointer-events-none"
                    />
                    <Image
                      width={800}
                      height={1000}
                      unoptimized
                      src={mediaUrl}
                      alt={title}
                      className="relative z-10 w-full h-full object-cover"
                    />
                  </>
                )}
              </div>

              {/* Carousel Thumbnails */}
              {characterList && characterList.length > 0 && onNavigateCharacter && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 flex items-center gap-1.5 max-w-[90%]">
                  {characterList.length > 1 && (
                    <Button
                      type="button"
                      onClick={() =>
                        onNavigateCharacter((currentCharacterIndex! - 1 + characterList.length) % characterList.length)
                      }
                      className="w-8 h-8 rounded-full bg-black/40 border-white/30 border p-0! text-white! flex items-center justify-center hover:bg-black/70 hover:scale-105 transition-all shrink-0 cursor-pointer!"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  )}

                  <div
                    ref={thumbnailsContainerRef}
                    className="flex items-center p-2 gap-2 overflow-x-auto no-scrollbar max-w-full"
                  >
                    {characterList.map((char: any, idx: number) => {
                      const isActive = idx === currentCharacterIndex
                      const resolvedUrl = char.image_url.startsWith('http')
                        ? char.image_url
                        : `${process.env.NEXT_PUBLIC_STORAGE_URL || ''}/${char.image_url.replace(/^\//, '')}`
                      return (
                        <Button
                          key={char._id || char.id || idx}
                          type="button"
                          onClick={() => onNavigateCharacter(idx)}
                          className={cn(
                            'relative w-22 h-22 rounded-sm overflow-hidden border-2 transition-all flex-shrink-0 bg-zinc-950',
                            isActive ? 'border-primary scale-105' : 'border-transparent hover:opacity-100',
                          )}
                        >
                          <Image src={resolvedUrl} alt={char.name} fill unoptimized className="object-cover" />
                        </Button>
                      )
                    })}
                  </div>

                  {characterList.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => onNavigateCharacter((currentCharacterIndex! + 1) % characterList.length)}
                      className="w-8 h-8 rounded-full bg-black/40 border-white/30 border p-0! text-white! flex items-center justify-center hover:bg-black/70 hover:scale-105 transition-all shrink-0 cursor-pointer!"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="md:w-1/2 w-full p-8 md:p-10 flex flex-col justify-between overflow-y-auto h-[55%] md:h-full bg-white dark:bg-[#0c0d10] no-scrollbar relative">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="pr-8 mt-2">
                    <h3 className="text-3xl font-black text-title-color dark:text-white leading-tight mb-2">{title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {customBadges ? (
                        customBadges
                      ) : (
                        <>
                          <Badge className="px-2.5 py-0.5 text-xs font-bold rounded-md border shadow-2xl bg-primary text-white!">
                            {customStyle || 'Realistic'}
                          </Badge>
                          <span className="text-3xs sm:text-xs font-semibold text-subtitle-color dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {customResolution || '1024x1024'}
                          </span>
                        </>
                      )}
                      {creditsUsed !== undefined && (
                        <span className="text-xs font-bold text-amber-500 flex items-center gap-1 ml-1">
                          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>
                            {creditsUsed} {t('credits', { defaultValue: 'Credits' })}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions row */}
                  <div className="flex flex-wrap items-center gap-3 border-b border-glass-border pb-6 mb-6">
                    {onDownload && (
                      <Button
                        onClick={onDownload}
                        className="h-10 px-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#16181f] hover:bg-primary/20! hover:text-primary dark:hover:bg-white/5 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-sm"
                      >
                        <Download className="w-4 h-4 text-slate-500" />{' '}
                        {t('download_media', { defaultValue: 'Download Media' })}
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        onClick={onDelete}
                        type="button"
                        className="w-10 h-10 p-0! rounded-xl border border-slate-250 dark:border-white/10 bg-white dark:bg-[#16181f] hover:bg-rose-500/10! hover:text-rose-500 text-slate-500 flex items-center justify-center shadow-sm transition-all cursor-pointer"
                        title={t('delete', { defaultValue: 'Delete' })}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Description */}
                  {description && (
                    <div className="space-y-1.5 mb-6">
                      <span className="text-sm font-black text-title-color block">
                        {t('description', { defaultValue: 'Description' })}
                      </span>
                      <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 rounded-2xl p-4">
                        <p className="text-sm font-medium leading-relaxed text-subtitle-color dark:text-white/80 select-text whitespace-pre-wrap">
                          {description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Prompt */}
                  {prompt && (
                    <div className="space-y-1.5 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-title-color block">
                          {t('prompt', { defaultValue: 'Prompt' })}
                        </span>
                        <Button
                          onClick={handleCopy}
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2.5 rounded-lg text-xs font-bold text-primary hover:bg-primary/10 gap-1.5"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          {copied ? t('copied', { defaultValue: 'Copied' }) : t('copy', { defaultValue: 'Copy' })}
                        </Button>
                      </div>
                      <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 rounded-2xl p-4">
                        <p className="text-xs font-normal leading-relaxed text-slate-650 dark:text-zinc-450 select-text whitespace-pre-wrap leading-relaxed font-sans">
                          {prompt}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Details grid */}
                  <div className="space-y-2 mb-6">
                    <span className="text-sm font-black text-title-color block">
                      {t('details', { defaultValue: 'Details' })}
                    </span>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 p-3 rounded-2xl flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-normal text-subtitle-color block">Created on</span>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                            {createdAt ? formatDate(createdAt) : 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 p-3 rounded-2xl flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-normal text-subtitle-color block">Time</span>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                            {createdAt
                              ? new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 p-3 rounded-2xl flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-normal text-subtitle-color block">Resolution</span>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                            {customResolution || '1024 x 1024'}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 p-3 rounded-2xl flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-normal text-subtitle-color block">Style</span>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                            {customStyle || 'Realistic'}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 p-3 rounded-2xl flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-normal text-subtitle-color block">Credits</span>
                          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                            {creditsUsed !== undefined ? `${creditsUsed} Credits` : 'N/A'}
                          </span>
                        </div>
                      </div>

                      {actualFileSize ? (
                        <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 p-3 rounded-2xl flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-normal text-subtitle-color block">File Size</span>
                            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                              {actualFileSize}
                            </span>
                          </div>
                        </div>
                      ) : customModel ? (
                        <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 p-3 rounded-2xl flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 shrink-0">
                            <Cpu className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-normal text-subtitle-color block">Model</span>
                            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate block capitalize">
                              {customModel.replace(/_/g, ' ')}
                            </span>
                          </div>
                        </div>
                      ) : customUsageCount !== undefined ? (
                        <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 p-3 rounded-2xl flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-normal text-subtitle-color block">Usage</span>
                            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                              {customUsageCount} {customUsageCount === 1 ? 'time' : 'times'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-[#F8FAFC] dark:bg-[#15161e] border border-slate-150/40 dark:border-white/5 p-3 rounded-2xl flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-normal text-subtitle-color block">File Size</span>
                            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate block">
                              N/A
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom action card banner */}
                <div className="mt-4 p-5 rounded-3xl bg-[#EEF2FF] dark:bg-[#121420] border border-indigo-100 dark:border-indigo-900/30 flex flex-wrap lg:flex-nowrap items-start sm:items-center justify-between gap-4">
                  <div className="min-w-0 w-full">
                    <h4 className="text-sm font-bold text-[#4F46E5] dark:text-indigo-400">
                      Use {title} in your next project
                    </h4>
                    <p className="text-xs text-[#4F46E5]/80 dark:text-indigo-400/80 mt-1">
                      Create videos, images or content using this character
                    </p>
                  </div>
                  {onUseCharacter && (
                    <Button
                      onClick={onUseCharacter}
                      className="primary-btn hover:bg-[#4338CA] text-white! font-bold px-5 h-11 rounded-xl w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 text-xs shadow-md shadow-indigo-500/25"
                    >
                      Start Creating <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="border-b border-glass-border pb-4 flex flex-row items-center justify-between space-y-0">
              <div className="space-y-1 min-w-0 flex-1">
                <DialogTitle className="text-xl font-bold text-title-color dark:text-white flex items-center gap-2 truncate">
                  {title}
                </DialogTitle>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {status && (
                    <Badge
                      className={cn('px-2.5 py-0.5 text-[10px] font-bold rounded-md border shadow-2xl', status.color)}
                    >
                      {status.label}
                    </Badge>
                  )}
                  {customBadges}
                  {typeof creditsUsed === 'number' && (
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                      <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>
                        {creditsUsed} {t('credits', { defaultValue: 'credits' })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </DialogHeader>

            {/* Content Body */}
            <div className="py-4 space-y-5 overflow-y-auto max-h-[70vh] no-scrollbar">
              {/* Main Media Player / Container */}
              <div className="relative w-full aspect-video bg-black/5 dark:bg-black/60 rounded-xl overflow-hidden border border-glass-border flex items-center justify-center">
                {isLoadingMedia || !mediaUrl ? (
                  <div className="w-full h-full animate-pulse bg-zinc-900/10 dark:bg-zinc-950/60 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-zinc-400/50 dark:text-zinc-700/50 animate-pulse" />
                  </div>
                ) : errorMessage ? (
                  <div className="flex flex-col items-center justify-center text-rose-500 gap-3">
                    <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-widest">
                      {t('failed', { defaultValue: 'Failed' })}
                    </span>
                  </div>
                ) : isVideo ? (
                  <video
                    src={mediaUrl}
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <>
                    <Image
                      src={mediaUrl}
                      alt="Blurred background"
                      fill
                      unoptimized
                      className="object-cover blur-md scale-110 dark:opacity-60 select-none pointer-events-none"
                    />
                    <Image
                      width={600}
                      height={400}
                      unoptimized
                      src={mediaUrl}
                      alt={title}
                      className="relative z-10 w-full h-full object-contain"
                    />
                  </>
                )}
              </div>

              {/* Action buttons inside the modal */}
              {isCompleted && (onDownload || onSaveToMedia || onDelete) && (
                <div className="flex items-center justify-end gap-2 border-b border-glass-border pb-4">
                  {onSaveToMedia && (
                    <Button
                      onClick={onSaveToMedia}
                      disabled={isSavingToMedia}
                      className="px-4 h-9 rounded-lg bg-black/5 dark:bg-white/5 border border-glass-border text-title-color dark:text-white hover:bg-black/10 dark:hover:bg-white/10 gap-2 text-xs font-semibold disabled:opacity-50"
                    >
                      {isSavingToMedia ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {t('save_to_media_library', { defaultValue: 'Save to Media Library' })}
                    </Button>
                  )}
                  {onDownload && (
                    <Button
                      onClick={onDownload}
                      className="px-4 h-9 rounded-lg bg-black/5 dark:bg-white/5 border border-glass-border text-title-color dark:text-white hover:bg-black/10 dark:hover:bg-white/10 gap-2 text-xs font-semibold"
                    >
                      <Download className="w-4 h-4" />
                      {t('download_media', { defaultValue: 'Download Media' })}
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      onClick={onDelete}
                      disabled={isDeleting}
                      className="px-4 h-9 rounded-lg bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/20 dark:border-rose-500/30 text-rose-500 dark:text-rose-350 hover:bg-rose-500/20 dark:hover:bg-rose-500/30 gap-2 text-xs font-semibold disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t('delete', { defaultValue: 'Delete' })}
                    </Button>
                  )}
                </div>
              )}

              {/* Error Message for Failed Task */}
              {errorMessage && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-rose-500 mb-1">
                    {t('error_message', { defaultValue: 'Error Message' })}
                  </h4>
                  <p className="text-xs text-rose-400 select-text whitespace-pre-wrap">{errorMessage}</p>
                </div>
              )}

              {/* Description Section */}
              {description && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-title-color dark:text-white/90">
                    {t('description', { defaultValue: 'Description' })}
                  </h4>
                  <div className="bg-black/3 dark:bg-white/5 rounded-xl p-4 border border-glass-border">
                    <p className="text-sm leading-relaxed text-subtitle-color dark:text-white/80 select-text whitespace-pre-wrap">
                      {description}
                    </p>
                  </div>
                </div>
              )}

              {/* Prompt Section */}
              {prompt && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-title-color dark:text-white/90">
                      {t('prompt', { defaultValue: 'Prompt' })}
                    </h4>
                    <Button
                      onClick={handleCopy}
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 rounded-lg text-subtitle-color dark:text-white/70 hover:text-title-color dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 gap-1.5 text-xs font-semibold"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copied ? t('copied', { defaultValue: 'Copied' }) : t('copy', { defaultValue: 'Copy' })}
                    </Button>
                  </div>
                  <div className="bg-black/3 dark:bg-white/5 rounded-xl p-4 border border-glass-border">
                    <p className="text-sm leading-relaxed text-subtitle-color dark:text-white/80 select-text whitespace-pre-wrap">
                      {prompt}
                    </p>
                  </div>
                </div>
              )}

              {/* Footer Timestamp Details */}
              {createdAt && (
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-glass-border">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
