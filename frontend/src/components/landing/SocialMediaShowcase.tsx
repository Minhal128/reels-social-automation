import { useSectionRefs } from '@/context/SectionRefsContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Facebook, Linkedin, Youtube, Sparkles } from 'lucide-react'
import { XIcon as Twitter } from '@/components/ui/XIcon'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { platformContent } from '@/data/landing'
import { PlatformTabs } from './showcase/PlatformTabs'
import { PlatformContent } from './showcase/PlatformContent'
import { PlatformMockup } from './showcase/PlatformMockup'
import { DynamicPlatform, LandingPageData } from '@/types/landing'
import { ThreadsIcon } from '../ui/threadsIcon'
import { TikTokIcon } from '@/components/ui/TikTokIcon'

export default function SocialMediaShowcase({ data }: { data?: LandingPageData['social'] }) {
  const { t } = useTranslation()
  const { registerRef } = useSectionRefs()

  // Use data from props if available, otherwise use hardcoded platforms
  const dynamicPlatforms = data?.platforms || []
  const initialTab = (dynamicPlatforms.length > 0
    ? dynamicPlatforms[0]?.name
    : 'instagram').toLowerCase()

  const [activeTab, setActiveTab] = useState(initialTab)

  // Update active tab when dynamic platforms load
  useEffect(() => {
    if (dynamicPlatforms.length > 0) {
      setActiveTab(dynamicPlatforms[0]?.name?.toLowerCase())
    }
  }, [dynamicPlatforms])

  // Merge dynamic content with static content (gradients, colors, icons)
  const getPlatformConfig = (id: string) => {
    const staticConfig = platformContent[id as keyof typeof platformContent] || platformContent.instagram
    const dynamicConfig = dynamicPlatforms.find((p: DynamicPlatform) => p.name?.toLowerCase() === id)

    if (dynamicConfig) {
      return {
        ...staticConfig,
        badge: dynamicConfig.badge || staticConfig.badge,
        title: dynamicConfig.title || staticConfig.title,
        highlight: dynamicConfig.highlight || staticConfig.highlight,
        description: dynamicConfig.description || staticConfig.description,
        features: dynamicConfig.features?.length > 0
          ? dynamicConfig.features.map((f: { title: string, description: string, image_id?: any }, i: number) => ({
            title: f.title,
            description: f.description,
            image_id: f.image_id,
            icon: staticConfig.features[i]?.icon || Sparkles
          }))
          : staticConfig.features
      }
    }
    return staticConfig
  }

  const currentContent = getPlatformConfig(activeTab)

  const getPlatformIcon = (id: string) => {
    switch (id) {
      case 'facebook': return Facebook
      case 'linkedin': return Linkedin
      case 'youtube': return Youtube
      case 'twitter': return Twitter
      case 'threads': return ThreadsIcon
      case 'tiktok': return TikTokIcon
      case 'instagram':
      default: return Instagram
    }
  }

  const getPlatformColor = (id: string) => {
    switch (id) {
      case 'facebook': return '#1877F2'
      case 'linkedin': return '#0A66C2'
      case 'youtube': return '#FF0000'
      case 'twitter': return '#1DA1F2'
      case 'threads': return '#000000'
      case 'tiktok': return '#FE2C55'
      case 'instagram':
      default: return '#E1306C'
    }
  }

  const displayPlatforms = dynamicPlatforms.length > 0
    ? dynamicPlatforms.map((p: DynamicPlatform) => ({
      id: p.name?.toLowerCase(),
      name: p.name,
      icon: getPlatformIcon(p.name?.toLowerCase() || ''),
      color: getPlatformColor(p.name?.toLowerCase() || '')
    }))
    : [
      { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E1306C' },
      { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2' },
      { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
      { id: 'twitter', name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
      { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000' },
      { id: 'threads', name: 'Threads', icon: ThreadsIcon, color: '#000000' },
      { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, color: '#FE2C55' },
    ]

  return (
    <section
      id="social"
      ref={(el) => registerRef('social', el)}
      className="relative py-24 md:py-30 bg-light-body overflow-hidden"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-[10%] right-[-15%] w-[35%] h-[60%] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-40" />
      <div className="absolute top-[15%] right-[-15%] w-[25%] h-[50%] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-15%] w-[35%] h-[60%] bg-primary/15 rounded-full blur-[120px] pointer-events-none opacity-30" />
      <div className="absolute bottom-[15%] left-[-15%] w-[25%] h-[50%] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center justify-center w-full min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full  flex-1 text-center lg:text-left"
          >
            <PlatformTabs
              displayPlatforms={displayPlatforms}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <AnimatePresence mode="wait">
              <PlatformContent
                currentContent={currentContent}
                activeTab={activeTab}
                t={t}
              />
            </AnimatePresence>
          </motion.div>

          <PlatformMockup activeTab={activeTab} currentContent={currentContent} />
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        :global(.swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.4) !important;
        }
        :global(.swiper-pagination-bullet-active) {
          background: white !important;
        }
      `}</style>
    </section>
  )
// }
//         : global(.swiper - pagination - bullet) {
//   background: rgba(255, 255, 255, 0.4)!important;
// }
//         : global(.swiper - pagination - bullet - active) {
//   background: white!important;
// }
// `}</style>
//     </section>
//   )
}
