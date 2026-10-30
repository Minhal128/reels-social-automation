'use client'

import LandingFooter from '@/components/landing/LandingFooter'
import LandingHeader from '@/components/landing/LandingHeader'
import { SectionRefsProvider } from '@/context/SectionRefsContext'
import { useGetBlogBySlugQuery } from '@/redux/api/blogApi'
import { useGetLandingPageQuery } from '@/redux/api/landingPageApi'
import { formatDate, getMediaUrl } from '@/utils'
import DOMPurify from 'dompurify'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string

  const { data: blog, isLoading } = useGetBlogBySlugQuery(slug)
  const { data: landingData } = useGetLandingPageQuery()
  const footerData = landingData?.landing_page?.footer

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-white/60 mb-8">Article not found</p>
        <Link href="/" className="px-6 py-3 bg-primary text-black font-bold rounded-xl">
          Go Back Home
        </Link>
      </div>
    )
  }

  const thumbnail = typeof blog.thumbnail_id === 'object' ? getMediaUrl(blog.thumbnail_id?.file_path) : ''
  const category = (blog.categories as { name?: string }[])?.[0]?.name

  return (
    <SectionRefsProvider>
      <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white">
        <LandingHeader />

        <main className="relative pt-32 pb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

          <article className="container mx-auto px-6 max-w-4xl relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Link href="/#blog" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-primary mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to blog
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-white/60">
                {category && (
                  <span className="px-3 py-1 rounded-full bg-primary/80 border border-primary/30 text-white text-xs font-medium">
                    {category}
                  </span>
                )}
                <span>{formatDate(blog.published_at || blog.created_at)}</span>
                <span>·</span>
                <span>{blog.read_time || 5} min read</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
                {blog.title}
              </h1>
              <p className="text-lg text-white/70 mb-10">{blog.description}</p>

              {thumbnail && (
                <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 mb-12">
                  <Image src={thumbnail} alt={blog.title} fill unoptimized className="object-cover" />
                </div>
              )}

              <div
                className="prose prose-invert prose-primary max-w-none
                  prose-headings:text-white prose-p:text-white/70 prose-p:leading-relaxed
                  prose-li:text-white/70 prose-strong:text-white prose-a:text-primary
                  hover:prose-a:text-primary/80 transition-colors"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content || '') }}
              />
            </motion.div>
          </article>
        </main>

        <LandingFooter data={footerData} />
      </div>
    </SectionRefsProvider>
  )
}
