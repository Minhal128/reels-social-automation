'use client'

import React from 'react'

interface ImpersonationLoaderProps {
  title?: string
  subtitle?: string
}

export default function ImpersonationLoader({
  title = 'Starting Impersonation...',
  subtitle = 'Please wait while we set up your session',
}: ImpersonationLoaderProps) {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center gap-5 text-center max-w-md px-6">
        <div className="relative">
          {/* Subtle outer glow */}
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl animate-pulse" />
          {/* The spinner */}
          <div className="relative w-14 h-14 rounded-full border-[3.5px] border-primary/15 border-t-primary animate-spin" />
        </div>
        <div className="space-y-1.5 mt-2">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-outfit">
            {title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
