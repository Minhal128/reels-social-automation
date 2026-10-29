'use client'

import useSettings from '@/hooks/useSettings'
import { getMediaUrl } from '@/utils'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDirection } from '@/hooks/useAppDirection'

// Point every icon link at the uploaded favicon (cache-busted) so it beats the hardcoded /images/logo.png.
// Update in place, never remove: Next renders some of these <link>s, and deleting a React-owned node makes
// React's next commit throw "Cannot read properties of null (reading 'removeChild')", freezing navigation.
function applyFavicon(url: string) {
  const bust = url.includes('?') ? url : `${url}?v=${encodeURIComponent(url.split('/').pop() || String(Date.now()))}`
  const ext = (url.split('?')[0].split('.').pop() || '').toLowerCase()
  const type =
    ext === 'svg' ? 'image/svg+xml' : ext === 'ico' ? 'image/x-icon' : ext === 'webp' ? 'image/webp' : 'image/png'

  for (const rel of ['icon', 'shortcut icon', 'apple-touch-icon'] as const) {
    let links = Array.from(document.head.querySelectorAll<HTMLLinkElement>(`link[rel='${rel}']`))
    if (links.length === 0) {
      const link = document.createElement('link')
      link.rel = rel
      document.head.appendChild(link)
      links = [link]
    }
    for (const link of links) {
      link.href = bust
      if (rel !== 'apple-touch-icon') link.type = type
    }
  }
}

const DynamicMetadata = () => {
  const { settings } = useSettings()
  const { i18n } = useTranslation()
  const direction = useAppDirection()

  useEffect(() => {
    if (i18n.language) document.documentElement.lang = i18n.language
    document.documentElement.dir = direction

    if (!settings) return

    if (settings.app_name && !settings.app_name.toLowerCase().includes('pixel')) {
      document.title = settings.app_name
    }

    const faviconUrl = settings.favicon_url ? getMediaUrl(settings.favicon_url) : '/images/logo.png'
    if (faviconUrl) applyFavicon(faviconUrl)
  }, [settings, direction, i18n.language])

  return null
}

export default DynamicMetadata
