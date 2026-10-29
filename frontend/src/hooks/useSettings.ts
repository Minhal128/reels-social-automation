import { ROUTES } from '@/constants/routes'
import { useGetAdminSettingsQuery, useGetPublicSettingsQuery } from '@/redux/api/adminSettingApi'
import { useAppSelector } from '@/redux/hooks'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const useSettings = () => {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  // Determine if we are on an authentication page
  const isAuthPage = useMemo(() => {
    if (!pathname) return true
    const authPaths = Object.values(ROUTES.AUTH) as string[]
    return authPaths.some(path => pathname === path || pathname.startsWith(path + '/'))
  }, [pathname])

  // Admin + super_admin both need admin settings so logo uploads refetch immediately
  const canAccessAdminSettings = useMemo(() => {
    const role = user?.role
    return !isAuthPage && isAuthenticated && (role === 'super_admin' || role === 'admin') && !!user?.id
  }, [isAuthPage, isAuthenticated, user])

  const {
    data: publicSettings,
    isLoading: publicLoading,
    isError: publicError,
  } = useGetPublicSettingsQuery(undefined, {
    skip: canAccessAdminSettings,
  })

  const {
    data: adminSettings,
    isLoading: adminLoading,
    isError: adminError,
  } = useGetAdminSettingsQuery(undefined, {
    skip: !canAccessAdminSettings,
  })

  const rawData = canAccessAdminSettings ? adminSettings : publicSettings
  const isLoading = canAccessAdminSettings ? adminLoading : publicLoading
  const isError = canAccessAdminSettings ? adminError : publicError

  const settings = rawData?.settings || rawData?.setting || rawData

  return {
    settings,
    isLoading,
    isError,
    isAuthenticated,
  }
}

export default useSettings
