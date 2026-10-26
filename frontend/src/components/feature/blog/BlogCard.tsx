'use client'

import { BlogCardProps } from '@/types'
import { BlogGridCard } from './BlogGridCard'
import { BlogListRow } from './BlogListRow'

export { BlogGridCard, BlogListRow }

export default function BlogCard(props: BlogCardProps) {
  return (
    <BlogGridCard
      {...props}
      onReadMore={props.onReadMore ?? (() => {})}
    />
  )
}
