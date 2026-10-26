'use client'

import MultiSelectField from '@/components/shared/form-fields/MultiSelectField'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BlogFormSidebarProps } from '@/types'
import { Image as ImageIcon, Loader2, Save, Calendar as CalendarIcon, Clock } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaPickerModal from '../../media-library/MediaPickerModal'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import Label from '@/components/ui/label'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function BlogSidebar({
  values,
  setFieldValue,
  touched,
  errors,
  categories,
  tags,
  thumbnailUrl,
  setThumbnailUrl,
  uploadAttachment,
  isUploading,
  isLoading,
  isEditing,
  onClose,
  dirty,
}: BlogFormSidebarProps) {
  const { t } = useTranslation()
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false)

  return (
    <div className="space-y-8">
      <Card className="rounded-border-radius border border-glass-border bg-white p-4 sm:p-6 space-y-8 glass-dark-card dark:bg-white/3">
        <div className="space-y-6">
          {/* Thumbnail Selection */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold">{t('thumbnail_image') || 'Thumbnail Image'}</h4>
            <div
              onClick={() => setIsMediaModalOpen(true)}
              className="w-full h-[420px] aspect-video rounded-border-radius border-2 border-dashed border-glass-border hover:border-primary/50 transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group"
            >
              {thumbnailUrl ? (
                <>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL || ''}/${thumbnailUrl}`}
                    alt="Thumbnail"
                    fill
                    className="object-cover group-hover:opacity-50 transition-all"
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <Button
                      type="button"
                      variant="secondary"
                      className="gap-2 h-12 primary-btn text-white rounded-radius"
                    >
                      <ImageIcon className="w-4 h-4" /> Change Image
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground p-4 text-center">
                  {isUploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <ImageIcon className="w-8 h-8" />}
                  <span className="text-sm font-medium">{t('click_to_upload') || 'Click to upload image'}</span>
                </div>
              )}
            </div>
          </div>

          <MediaPickerModal
            isOpen={isMediaModalOpen}
            onClose={() => setIsMediaModalOpen(false)}
            type="image"
            onSelect={(attachment) => {
              const singleAttachment = Array.isArray(attachment) ? attachment[0] : attachment
              if (!singleAttachment) return
              const isVideo = (singleAttachment.file_type && singleAttachment.file_type.startsWith('video/')) || 
                              (singleAttachment.mime_type && singleAttachment.mime_type.startsWith('video/'))
              if (isVideo) {
                toast.error('Video is not allowed. Only image files are permitted for the blog thumbnail.')
                return
              }
              setFieldValue('thumbnail_id', singleAttachment.id || (singleAttachment as any)._id)
              setThumbnailUrl(singleAttachment.file_path)
              setIsMediaModalOpen(false)
            }}
          />

          {/* Categories */}
          <MultiSelectField
            label={t('categories')}
            placeholder={t('select_categories')}
            options={categories.map((c: any) => ({ label: c.name, value: c._id || c.id }))}
            value={values.categories}
            onChange={(val) => setFieldValue('categories', val)}
            error={touched.categories && errors.categories ? (errors.categories as string) : undefined}
          />

          {/* Tags */}
          <MultiSelectField
            label={t('tags')}
            placeholder={t('select_tags')}
            options={tags.map((t: any) => ({ label: t.title, value: t._id || t.id }))}
            value={values.tags}
            onChange={(val) => setFieldValue('tags', val)}
            error={touched.tags && errors.tags ? (errors.tags as string) : undefined}
          />

          <div className="flex items-center justify-between p-3 glass-dark-card bg-black/3 dark:bg-white/3 rounded-border-radius-inner border border-glass-border">
            <span className="text-base font-bold text-title-color ">
              {t('featured') || 'Featured'}
            </span>
            <Switch
              checked={values.is_featured}
              onCheckedChange={(checked) => setFieldValue('is_featured', checked)}
              className="data-[state=checked]:bg-amber-500"
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-bold text-title-color  block px-1">
              {t('status') || 'Status'}
            </span>
            <Select
              value={values.status}
              onValueChange={(val) => {
                setFieldValue('status', val)
                if (val !== 'scheduled') {
                  setFieldValue('published_at', '')
                } else if (!values.published_at) {
                  const now = new Date()
                  const padNum = (num: number) => String(num).padStart(2, '0')
                  setFieldValue('published_at', `${now.getFullYear()}-${padNum(now.getMonth() + 1)}-${padNum(now.getDate())}T${padNum(now.getHours())}:${padNum(now.getMinutes())}`)
                }
              }}
            >
              <SelectTrigger className="w-full h-11 bg-black/3 dark:bg-white/3 border border-glass-border rounded-xl">
                <SelectValue placeholder={t('select_status') || 'Select Status'} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-black border border-glass-border">
                <SelectItem value="draft" className="cursor-pointer">{t('draft') || 'Draft'}</SelectItem>
                <SelectItem value="published" className="cursor-pointer">{t('published') || 'Published'}</SelectItem>
                <SelectItem value="scheduled" className="cursor-pointer">{t('scheduled') || 'Scheduled'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {values.status === 'scheduled' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="text-sm font-medium text-title-color dark:text-white block px-1">
                {t('publish_date') || 'Publish Date & Time'}
              </span>

              {(() => {
                const pad = (num: number) => String(num).padStart(2, '0')
                const publishedAtDate = values.published_at ? new Date(values.published_at) : new Date()
                const timePart = values.published_at ? values.published_at.split('T')[1] || '12:00' : '12:00'
                const [hStr, mStr] = timePart.split(':')
                const currentH24 = parseInt(hStr, 10) || 0
                const currentH12 = currentH24 % 12 || 12
                const currentM = parseInt(mStr, 10) || 0
                const currentAmpm = currentH24 >= 12 ? 'PM' : 'AM'

                const handleDateChange = (date: Date | undefined) => {
                  if (!date) return
                  const year = date.getFullYear()
                  const month = pad(date.getMonth() + 1)
                  const day = pad(date.getDate())
                  setFieldValue('published_at', `${year}-${month}-${day}T${timePart}`)
                }

                const handleTimeChange = (newH12: number, newM: number, newAmpm: string) => {
                  let h24 = newH12
                  if (newAmpm === 'PM' && newH12 < 12) h24 += 12
                  if (newAmpm === 'AM' && newH12 === 12) h24 = 0
                  const datePart = values.published_at ? values.published_at.split('T')[0] : `${new Date().getFullYear()}-${pad(new Date().getMonth() + 1)}-${pad(new Date().getDate())}`
                  setFieldValue('published_at', `${datePart}T${pad(h24)}:${pad(newM)}`)
                }

                const displayDate = values.published_at
                  ? format(new Date(values.published_at), 'MMM d, yyyy')
                  : t('select_date', { defaultValue: 'Select Date' })

                const displayTime = (() => {
                  const ampm = currentH24 >= 12 ? 'PM' : 'AM'
                  return `${String(currentH12).padStart(2, '0')}:${pad(currentM)} ${ampm}`
                })()

                return (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Date Picker Button */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-subtitle-color">
                        {t('date', { defaultValue: 'Date' })}
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full min-h-[44px] items-center justify-start text-left font-normal rounded-border-radius-inner hover:bg-slate-50 dark:hover:bg-white/5 bg-transparent border-slate-200/60 dark:border-white/10 transition-all px-4"
                          >
                            <CalendarIcon className="mr-3 h-4 w-4 text-primary opacity-80 shrink-0" />
                            <span className="font-semibold text-sm text-title-color dark:text-white">
                              {displayDate}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 border-slate-200 dark:border-white/10 bg-white dark:bg-black/95 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={publishedAtDate}
                            onSelect={handleDateChange}
                            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                            className="p-3 border-none bg-transparent"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time Picker Popover */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-subtitle-color">
                        {t('time', { defaultValue: 'Time' })}
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full min-h-[44px] items-center justify-start text-left font-normal rounded-border-radius-inner hover:bg-slate-50 dark:hover:bg-white/5 bg-transparent border-slate-200/60 dark:border-white/10 transition-all px-4"
                          >
                            <Clock className="mr-3 h-4 w-4 text-primary opacity-80 shrink-0" />
                            <span className="font-semibold text-sm text-title-color dark:text-white">
                              {displayTime}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-4 border-slate-200 dark:border-white/10 bg-white dark:bg-black/95 rounded-xl shadow-2xl backdrop-blur-md z-50">
                          <div className="space-y-4">
                            <div className="text-center font-bold text-sm text-title-color dark:text-white border-b border-slate-100 dark:border-white/5 pb-2">
                              Select Time
                            </div>
                            <div className="flex justify-between items-center gap-2">
                              {/* Hours Column */}
                              <div className="flex flex-col items-center w-1/3">
                                <span className="text-[10px] uppercase font-bold text-subtitle-color mb-1.5">Hour</span>
                                <div className="h-40 overflow-y-auto w-full pr-1 no-scrollbar scroll-smooth">
                                  {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
                                    const isSel = currentH12 === h
                                    return (
                                      <button
                                        key={h}
                                        type="button"
                                        onClick={() => handleTimeChange(h, currentM, currentAmpm)}
                                        className={cn(
                                          "w-full py-1 text-sm font-semibold rounded-[6px] text-center my-0.5 transition-all cursor-pointer",
                                          isSel
                                            ? "bg-primary text-white font-bold"
                                            : "text-title-color dark:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                                        )}
                                      >
                                        {String(h).padStart(2, '0')}
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>

                              {/* Minutes Column */}
                              <div className="flex flex-col items-center w-1/3">
                                <span className="text-[10px] uppercase font-bold text-subtitle-color mb-1.5">Min</span>
                                <div className="h-40 overflow-y-auto w-full pr-1 no-scrollbar">
                                  {Array.from({ length: 60 }, (_, i) => i).map((m) => {
                                    const isSel = currentM === m
                                    return (
                                      <button
                                        key={m}
                                        type="button"
                                        onClick={() => handleTimeChange(currentH12, m, currentAmpm)}
                                        className={cn(
                                          "w-full py-1 text-sm font-semibold rounded-[6px] text-center my-0.5 transition-all cursor-pointer",
                                          isSel
                                            ? "bg-primary text-white font-bold"
                                            : "text-title-color dark:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                                        )}
                                      >
                                        {String(m).padStart(2, '0')}
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>

                              {/* AM/PM Column */}
                              <div className="flex flex-col items-center w-1/3 gap-1.5">
                                <span className="text-[10px] uppercase font-bold text-subtitle-color mb-0.5">AM/PM</span>
                                {['AM', 'PM'].map((ampm) => {
                                  const isSel = currentAmpm === ampm
                                  return (
                                    <button
                                      key={ampm}
                                      type="button"
                                      onClick={() => handleTimeChange(currentH12, currentM, ampm)}
                                      className={cn(
                                        "w-full py-1.5 text-xs font-bold rounded-[6px] text-center transition-all cursor-pointer",
                                        isSel
                                          ? "bg-primary text-white font-extrabold shadow-sm"
                                          : "text-title-color dark:text-white bg-slate-50 dark:bg-white/3 hover:bg-slate-100 dark:hover:bg-white/5"
                                      )}
                                    >
                                      {ampm}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )
              })()}

              {touched.published_at && errors.published_at && (
                <div className="text-xs text-destructive px-1">
                  {errors.published_at as string}
                </div>
              )}
            </div>
          )}

          <div className="space-y-4 flex gap-3 rtl:flex-row-reverse">
            <Button
              type="submit"
              disabled={isLoading || isUploading || !dirty}
              className="w-full mb-0 h-12 rounded-radius landing-[2]! primary-btn text-base btn-color text-white! transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  {(() => {
                    if (values.status === 'draft') {
                      return t('save_as_draft_btn', { defaultValue: 'Save as Draft' })
                    }
                    if (values.status === 'scheduled') {
                      return t('schedule_blog_btn', { defaultValue: 'Schedule Blog' })
                    }
                    return isEditing
                      ? t('update_blog_btn', { defaultValue: 'Update Blog' })
                      : t('publish_blog_btn', { defaultValue: 'Publish Blog' })
                  })()}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading || isUploading}
              className="w-full h-12 rounded-radius hover:bg-destructive! font-bold dark:hover:bg-destructive! glass-dark-card dark:bg-white/3!  bg-black/3 hover:text-white! border hover:border-border/40"
            >
              {t('cancel_changes')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
