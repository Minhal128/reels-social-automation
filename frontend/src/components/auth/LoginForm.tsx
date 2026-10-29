'use client'
import AuthInput from '@/components/auth/AuthInput'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useGetDemoCredentialsQuery, useLoginMutation } from '@/redux/api/authApi'
import { useAppDispatch } from '@/redux/hooks'
import { setAuth } from '@/redux/slices/authSlice'
import { LoginFormValues } from '@/types/auth'
import { ApiError } from '@/types/api'
import { authUtils } from '@/utils'
import { authSchemas } from '@/utils/validation-schemas'
import { Form, Formik } from 'formik'
import { motion } from 'framer-motion'
import { ArrowRight, Lock, Mail, Shield, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const LoginForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialEmail = searchParams.get('email') || ''
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()
  const [rememberMe, setRememberMe] = useState(false)
  const [rememberedEmail, setRememberedEmail] = useState('')

  const { data: demoData } = useGetDemoCredentialsQuery()
  const isDemoMode = demoData?.demo === true

  // On mount, check if there's a saved email from Remember Me cookie
  useEffect(() => {
    const saved = authUtils.getRememberMe()
    if (saved) {
      setRememberedEmail(saved)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login(values).unwrap()

      // Handle Remember Me
      if (rememberMe) {
        authUtils.setRememberMe(values.email)
      } else {
        authUtils.clearRememberMe()
      }

      // Save token and user data
      authUtils.setToken(response.token)
      authUtils.setUser(response.user)

      // Update Redux state
      dispatch(
        setAuth({
          token: response.token,
          user: response.user,
        }),
      )

      toast.success(response.message || t('login_successful'))

      // Redirect to specified path or default dashboard
      const redirectTo = searchParams.get('redirect_to')
      // Same-origin paths only: blocks open redirects like ?redirect_to=https://evil.com or //evil.com
      if (redirectTo && /^\/(?![/\\])/.test(redirectTo)) {
        router.replace(redirectTo)
      } else {
        router.replace(ROUTES.DASHBOARD)
      }
    } catch (error) {
      const apiError = error as ApiError
      const errorMessage = apiError?.data?.message || t('login_failed')
      toast.error(errorMessage)
    }
  }

  return (
    <Formik
      initialValues={{
        email: rememberedEmail || initialEmail,
        password: '',
      }}
      enableReinitialize={true}
      validationSchema={authSchemas.login(t)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="space-y-4 text-left">
          <motion.div className='mb-2!'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <AuthInput
              label={t('email_address', { defaultValue: 'Email address' })}
              name="email"
              type="email"
              icon={Mail}
              placeholder={t('email_placeholder', { defaultValue: 'Enter your email address' })}
              className="border-gray-200 dark:border-white/10 h-[46px] rounded-border-radius-inner bg-transparent text-sm mb-0!"
            />
          </motion.div>

          <motion.div className='mb-2!'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <AuthInput
              label={t('password', { defaultValue: 'Password' })}
              name="password"
              type="password"
              icon={Lock}
              placeholder={'Enter your password'}
              className="border-gray-200 dark:border-white/10 h-[46px] rounded-border-radius-inner bg-transparent text-sm"
            />
          </motion.div>

          {/* Remember Me + Forgot Password row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex justify-between items-center"
          >
            <label
              htmlFor="rememberMe"
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <div className="relative">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 rounded border border-gray-300 dark:border-white/20 bg-white dark:bg-white/5 peer-checked:bg-primary peer-checked:border-primary transition-all duration-200 flex items-center justify-center">
                  {rememberMe && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm font-medium text-subtitle-color dark:text-gray-400 group-hover:text-title-color dark:group-hover:text-gray-200 transition-colors">
                {t('remember_me', { defaultValue: 'Remember me' })}
              </span>
            </label>

            <Link
              href={ROUTES.AUTH.FORGOT_PASSWORD}
              className="text-sm font-medium text-primary hover:underline underline-offset-4 transition-all"
            >
              {t('forgot_password_question', { defaultValue: 'Forgot password?' })}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full h-[46px] rounded-border-radius-inner! primary-btn text-white! text-sm font-semibold transition-all duration-200 border-none "
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('signing_in', { defaultValue: 'Signing in...' })}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span className="tracking-wide">{t('sign_in', { defaultValue: 'Sign in' })}</span>
                  <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
                </div>
              )}
            </Button>
          </motion.div>

          {isDemoMode && (
            <>
              <div className="relative flex items-center justify-center py-2">
                <div className="border-t border-gray-200 dark:border-gray-800 w-full absolute"></div>
                <span className="bg-white dark:bg-light-body px-3 text-[11px] font-medium text-subtitle-color relative z-10 uppercase tracking-widest">OR</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-[42px] rounded-border-radius-inner border border-glass-border! bg-transparent font-black text-title-color hover:bg-primary hover:text-white!"
                  onClick={() => {
                    setFieldValue('email', demoData?.admin?.email || '')
                    setFieldValue('password', demoData?.admin?.password || '')
                  }}
                >
                  <Shield className="w-4 h-4 " />
                  {t('admin_demo', { defaultValue: 'Admin Demo' })}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-[42px] rounded-border-radius-inner border border-glass-border! bg-transparent font-black text-title-color hover:bg-primary hover:text-white!"
                  onClick={() => {
                    setFieldValue('email', demoData?.user?.email || '')
                    setFieldValue('password', demoData?.user?.password || '')
                  }}
                >
                  <User className="w-4 h-4 " />
                  {t('user_demo', { defaultValue: 'User Demo' })}
                </Button>
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
