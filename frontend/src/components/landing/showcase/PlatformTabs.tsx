'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useRef, useEffect } from 'react'

export function PlatformTabs({ displayPlatforms, activeTab, setActiveTab }: any) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only scroll/center on mobile & tablet viewports (under 1024px)
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return
    }

    const timer = setTimeout(() => {
      if (containerRef.current) {
        const activeElement = containerRef.current.querySelector('.active-platform') as HTMLElement
        if (activeElement) {
          const container = containerRef.current
          const elementOffsetLeft = activeElement.offsetLeft
          const elementWidth = activeElement.offsetWidth
          const containerWidth = container.offsetWidth

          const targetScrollLeft = elementOffsetLeft - (containerWidth / 2) + (elementWidth / 2)

          container.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
          })
        }
      }
    }, 50)
    return () => clearTimeout(timer)
  }, [activeTab])

  return (
    <div
      ref={containerRef}
      className="relative flex flex-row  overflow-x-auto lg:overflow-x-visible whitespace-nowrap lg:whitespace-normal scroll-smooth no-scrollbar xl:w-fit  w-full gap-2 mb-10 p-1.5 bg-white/5 rounded-lg border border-white/10 mx-auto lg:mx-0 w-fit"
    >
      {displayPlatforms.map((platform: any) => (
        <Button
          key={platform.id}
          onClick={() => setActiveTab(platform.id)}
          className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 shrink-0 ${activeTab === platform.id ? 'active-platform text-white!' : 'text-white! hover:text-white/60'
            }`}
        >
          {activeTab === platform.id && (
            <motion.div
              layoutId="activePlatform"
              className="absolute inset-0 bg-secondary rounded-xl"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              style={{ backgroundColor: platform.color }}
            />
          )}
          <platform.icon className={`relative z-10 w-4 h-4 ${activeTab === platform.id ? 'text-white' : ''}`} />
          <span className="relative z-10 font-semibold text-sm">{platform.name}</span>
        </Button>
      ))}
    </div>
  )
}
