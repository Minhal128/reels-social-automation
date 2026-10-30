'use client'

import { ROUTES } from '@/constants/routes'
import { Feature } from '@/types/landing'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getResolvedImageUrl } from '@/utils/image'
import { TFunction } from 'i18next'

// ponytail: keyed by the seeded feature titles; a renamed/unknown title falls back to the dashboard.
const FEATURE_ROUTES: Record<string, string> = {
  'Text to Image': ROUTES.TEXT_TO_IMAGE,
  'Image to Image': ROUTES.IMAGE_TO_IMAGE,
  'Text to Video': ROUTES.TEXT_TO_VIDEO,
  'Image to Video': ROUTES.IMAGE_TO_VIDEO,
  'Video Motion': ROUTES.VIDEO_MOTION,
  'Character Generation': ROUTES.CHARACTERS,
  'Ecommerce Catalogue': ROUTES.ECOMMERCE_CATALOGUE,
}

export function FeatureCard({
  feature,
  index,
  total,
  t,
  scrollYProgress,
}: {
  feature: Feature
  index: number
  total: number
  t: any
  scrollYProgress: any
}) {
  const router = useRouter()
  const sectionPart = 1 / total
  const start = index * sectionPart
  const y = useTransform(scrollYProgress, [start - 0.15, start], [index === 0 ? 0 : 800, 0])
  const opacity = useTransform(scrollYProgress, [start - 0.15, start], [index === 0 ? 1 : 0, 1])
  const nextStart = (index + 1) * sectionPart
  const scale = useTransform(scrollYProgress, [nextStart - 0.15, nextStart], [1, 0.9])

  // Dimming effect for cards that are covered
  const brightness = useTransform(scrollYProgress, [nextStart - 0.15, nextStart], [1, 0.4])

  // Cards are stacked; a card still fading in sits on top and would swallow clicks meant for the visible one
  const pointerEvents = useTransform(opacity, (o) => (o >= 0.9 ? 'auto' : 'none'))

  // Feature pages need auth; logged-out visitors were bounced straight back to the landing page
  const featureRoute = FEATURE_ROUTES[feature.title] || ROUTES.DASHBOARD

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        filter: `brightness(${brightness})`,
        zIndex: index + 1,
        pointerEvents,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="w-full h-full"
    >
      <div
        className={`group relative w-full h-full rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[4rem] p-4 md:p-8 lg:p-12 border border-white/10 overflow-hidden bg-light-body transition-all duration-700 hover:border-primary/30`}
      >
        <div
          className={`absolute -top-40 -right-40 w-96 h-96 ${feature.bg} blur-[150px] -z-10 opacity-20 group-hover:opacity-40 transition-opacity duration-1000`}
        />

        <div
          className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-10 lg:gap-20 items-center justify-between h-full`}
        >
          <div className="w-full md:w-1/2 space-y-3 md:space-y-6 lg:space-y-8 flex flex-col justify-center text-center md:text-left">
            <div className="space-y-2 lg:space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient mb-3">
                {t(feature.title)}
              </h3>
              <p className="text-base md:text-sm lg:text-lg text-subtitle-color leading-relaxed max-w-xl mx-auto lg:mx-0">{t(feature.description)}</p>
            </div>

            <div className="flex flex-wrap gap-3 lg:gap-5 justify-center md:justify-start">
              <motion.button
                onClick={() => router.push(`${ROUTES.AUTH.LOGIN}?redirect_to=${encodeURIComponent(featureRoute)}`)}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 md:px-5 md:py-2.5 lg:px-8 lg:py-4 h-9 md:h-11 lg:h-12 rounded-xl primary-btn text-white font-bold flex items-center gap-2 lg:gap-3 group transition-all text-xs md:text-sm lg:text-base"
              >
                {t('get_started') || 'Get Started'}
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex-1 md:h-full relative flex items-center justify-center min-h-[160px] sm:min-h-[200px] md:min-h-0">
            <motion.div className="relative w-full aspect-[2/1] sm:aspect-[2.2/1] md:aspect-[15/11] max-h-full rounded-2xl lg:rounded-border-radius overflow-hidden shadow-2xl flex-shrink-0">
              <Image
                src={getResolvedImageUrl(
                  (feature?.image_id)?.file_path || feature?.image_id,
                  '/images/landing/feature/text-to-image.png'
                )}
                alt={feature.title || 'Feature'}
                fill
                unoptimized
                className="object-contain"
              />
              <div className="absolute inset-0" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
