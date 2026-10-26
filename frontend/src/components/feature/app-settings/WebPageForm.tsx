'use client'

import CKEditorField from '@/components/shared/form-fields/CKEditorField'
import TextAreaField from '@/components/shared/form-fields/TextAreaField'
import TextInput from '@/components/shared/form-fields/TextInput'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { useCreatePageMutation, useUpdatePageMutation } from '@/redux/api/pageApi'
import { ApiError } from '@/types'
import { PageFormProps } from '@/types/components/pages'
import { authUtils } from '@/utils'
import { pageSchemas } from '@/utils/validation-schemas'
import { Form, Formik } from 'formik'
import { ArrowLeft, FileText, Globe, Loader2, Save } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export default function PageForm({ page, onClose }: PageFormProps) {
  const { t } = useTranslation()
  const [createPage, { isLoading: isCreating }] = useCreatePageMutation()
  const [updatePage, { isLoading: isUpdating }] = useUpdatePageMutation()
  const user = authUtils.getUser()

  const isEditing = !!page

  const initialValues = {
    title: page?.title || '',
    slug: page?.slug || '',
    content: page?.content || '',
    meta_title: page?.meta_title || '',
    meta_description: page?.meta_description || '',
    status: page?.status ?? true,
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (isEditing && page) {
        const id = page._id || page.id
        const res = await updatePage({ id, ...values }).unwrap()
        toast.success(res.message || t('page_updated_successfully'))
      } else {
        const res = await createPage({ ...values, created_by: user?.id }).unwrap()
        toast.success(res.message || t('page_created_successfully'))
      }
      onClose()
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError?.data?.message || t('something_went_wrong'))
    }
  }

  const isLoading = isCreating || isUpdating

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-6 duration-500">
      <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-6">
        <div className="space-y-1">

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rtl:rotate-180 bg-primary/10 text-primary hover:bg-primary/10 dark:bg-primary/20 hover:text-primary rounded-radius transition-all shrink-0"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold leading-[1.3] dark:text-white">
                <span className="text-title-color dark:text-white">
                  {(isEditing ? t('edit_page') : t('create_page')).split(' ')[0]}
                </span>
                {(isEditing ? t('edit_page') : t('create_page')).split(' ').length > 1 && (
                  <>
                    {' '}
                    <span className="text-primary title-color">
                      {(isEditing ? t('edit_page') : t('create_page')).split(' ').slice(1).join(' ')}
                    </span>
                  </>
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={pageSchemas.create(t)}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="rounded-border-radius border border-glass-border p-4 sm:p-6 bg-white dark:bg-white/3 shadow-none space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              {/* Card 1: Page Information & Content */}
              <div className="border border-glass-border dark:bg-white/3 bg-white rounded-border-radius shadow-none overflow-hidden flex flex-col h-full">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 border-b border-glass-border  dark:bg-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-title-color dark:text-white">
                      {t('page_information', { defaultValue: 'Page Information' })}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 bg-black/3 dark:bg-white/5 px-4 py-2 rounded-full border border-glass-border shrink-0 self-start sm:self-auto">
                    <span className="text-sm font-bold text-title-color dark:text-white">
                      {t('page_visibility')}
                    </span>
                    <Switch
                      checked={values.status}
                      onCheckedChange={(checked) => setFieldValue('status', checked)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6 space-y-6 flex-1 ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <TextInput
                        name="title"
                        label={t('page_title')}
                        placeholder={t('enter_page_title')}
                        className="h-14 rounded-2xl bg-background/50 border-border/40 focus:bg-background"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const val = e.target.value
                          setFieldValue('title', val)
                          const generatedSlug = val
                            .toLowerCase()
                            .trim()
                            .replace(/[\s\W-]+/g, '-')
                            .replace(/^-+|-+$/g, '')
                          setFieldValue('slug', generatedSlug)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <TextInput
                        name="slug"
                        label={t('page_slug')}
                        placeholder={t('enter_page_slug')}
                        className="h-14 rounded-2xl bg-background/50 border-border/40 focus:bg-background font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <CKEditorField
                      label={t('page_content')}
                      value={values.content}
                      onChange={(val) => setFieldValue('content', val)}
                      placeholder={t('start_typing_content')}
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: SEO Optimization Settings */}
              <div className="border border-glass-border dark:bg-white/3 bg-white rounded-border-radius shadow-none overflow-hidden flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-glass-border bg-white dark:bg-transparent">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-title-color dark:text-white">
                    {t('seo_optimization_settings')}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-6 space-y-6 flex-1">
                  <TextInput
                    name="meta_title"
                    label={t('search_engine_title')}
                    placeholder={t('enter_meta_title')}
                    className="h-14 rounded-2xl bg-background/50 border-border/40 focus:bg-background"
                  />
                  <TextAreaField
                    name="meta_description"
                    label={t('search_engine_description')}
                    placeholder={t('enter_meta_description')}
                    rows={8}
                    className="rounded-2xl bg-background/50 border-border/40 focus:bg-background"
                  />
                </div>
              </div>

            </div>

            {/* Bottom Actions Row */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-glass-border mt-8">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={isLoading}
                className="w-full sm:w-auto h-10! px-6 rounded-radius dark:bg-white/3 text-black dark:text-white bg-black/3 border border-glass-border hover:bg-destructive! hover:text-white"
              >
                {t('cancel_changes')}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto h-10! px-6 rounded-radius primary-btn text-white! transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Save className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    {isEditing ? t('update_page_btn') : t('publish_page_btn')}
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
