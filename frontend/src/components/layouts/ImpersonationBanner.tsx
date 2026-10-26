'use client'

import ImpersonationLoader from '@/components/reusable/ImpersonationLoader'
import { ROUTES } from '@/constants/routes'
import { baseApi } from '@/redux/api/baseApi'
import { useStopImpersonationMutation } from '@/redux/api/impersonationApi'
import { useAppDispatch } from '@/redux/hooks'
import { setAuth } from '@/redux/slices/authSlice'
import { authUtils, decodeToken } from '@/utils'
import { ShieldAlert, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

export default function ImpersonationBanner() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [stopImpersonation, { isLoading }] = useStopImpersonationMutation()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const token = authUtils.getToken()
  const decoded = decodeToken(token)
  const isImpersonated = decoded?.isImpersonated === true

  if (!isImpersonated) return null

  const handleStop = async () => {
    try {
      const result = await stopImpersonation().unwrap()
      toast.success(result.message || 'Impersonation stopped')

      authUtils.setToken(result.token)
      authUtils.setUser(result.user)

      dispatch(setAuth({ token: result.token, user: result.user }))
      dispatch(baseApi.util.resetApiState())

      router.push(ROUTES.MEMBERS)
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to stop impersonation')
    }
  }

  return (
    <>
      {isLoading && (
        <ImpersonationLoader
          title="Restoring Session..."
          subtitle="Please wait while we restore your admin session"
        />
      )}
      <div className="relative w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white py-2.5 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md z-[9999] border-b border-amber-400/20">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500 backdrop-blur-md animate-pulse">
          <ShieldAlert className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="font-semibold text-xs tracking-wide uppercase bg-white text-black px-2 py-0.5 rounded border border-red-500/20 text-center w-fit">
            ReadOnly Mode
          </span>
          <p className="text-sm font-medium text-amber-50">
            You are currently impersonating <span className="font-semibold underline underline-offset-2 text-white">{decoded?.email}</span>. All actions are view-only.
          </p>
        </div>
      </div>
      <Button
        onClick={handleStop}
        disabled={isLoading}
        className="flex items-center gap-2 bg-red-500! hover:bg-slate-900 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-white/10 shadow-sm disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      >
        {isLoading ? (
          <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <X className="w-3.5 h-3.5" />
        )}
        <span>{isLoading ? 'Restoring Admin...' : 'Stop'}</span>
      </Button>
    </div>
    </>
  )
}
