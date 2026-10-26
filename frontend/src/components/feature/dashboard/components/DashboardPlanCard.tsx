'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'
import { dashboardItemVariants } from '@/data/dashboard'
import { useAppSelector } from '@/redux/hooks'
import { PlanCardProps } from '@/types/components/campaignHub'
import { motion } from 'framer-motion'
import { ArrowRight, CircleCheck, Clock, Crown, Settings, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const DashboardPlanCard = ({ currentPurchasePlan, t }: PlanCardProps) => {
  const router = useRouter()
  const { user } = useAppSelector((state) => state.auth)
  const email = user?.email || ''

  const calculateDaysLeft = (plan: any) => {
    const expiryDate = plan?.current_period_end || plan?.expires_at
    const now = new Date()

    if (expiryDate) {
      const expiry = new Date(expiryDate)
      const diffTime = expiry.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    }

    if (!plan?.created_at) return 0
    const created = new Date(plan.created_at)
    const expiry = new Date(created)
    const cycle = plan.plan_id?.billing_cycle

    if (cycle === 'monthly') {
      expiry.setDate(expiry.getDate() + 30)
    } else if (cycle === 'yearly') {
      expiry.setDate(expiry.getDate() + 365)
    } else {
      return 0
    }

    const diffTime = expiry.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getExpiryDate = (plan: any) => {
    const expiryDate = plan?.current_period_end || plan?.expires_at
    if (expiryDate) return new Date(expiryDate)

    if (!plan?.created_at) return null
    const created = new Date(plan.created_at)
    const expiry = new Date(created)
    const cycle = plan.plan_id?.billing_cycle

    if (cycle === 'monthly') {
      expiry.setDate(expiry.getDate() + 30)
    } else if (cycle === 'yearly') {
      expiry.setDate(expiry.getDate() + 365)
    } else {
      return null
    }
    return expiry
  }

  const daysLeft = currentPurchasePlan ? calculateDaysLeft(currentPurchasePlan) : 0
  const expiry = currentPurchasePlan ? getExpiryDate(currentPurchasePlan) : null
  const formattedExpiryDate = expiry
    ? expiry.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    : ''

  const billingCycle = currentPurchasePlan?.plan_id?.billing_cycle || 'monthly'
  const totalDays = billingCycle === 'yearly' ? 365 : 30
  const progressPercent = totalDays > 0 ? Math.min(100, Math.max(0, (daysLeft / totalDays) * 100)) : 0

  return (
    <motion.section className="col-span-1 h-[240px]" variants={dashboardItemVariants}>
      <div className="h-full rounded-border-radius transition-all duration-500">
        <Card
          onClick={() => router.push(ROUTES.PLANS)}
          className="h-full bg-white dark:bg-white/3 border border-glass-border rounded-border-radius transition-all duration-700 relative overflow-hidden cursor-pointer shadow-none! flex flex-col p-3 justify-between"
        >
          {currentPurchasePlan ? (
            <>
              {/* Header Row */}
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-sm">
                    <Crown className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <h4 className="text-base font-bold text-title-color dark:text-white mb-0 tracking-tight flex items-center gap-1.5 leading-none">
                      {currentPurchasePlan?.plan_id?.name || t('active_plan', { defaultValue: 'Subscribed Plan' })}
                    </h4>
                    <span className="text-xs text-subtitle-color font-medium leading-relaxed mt-0.5 line-clamp-1">
                      {t('subscription_active_desc', { defaultValue: 'Your subscription is active' })}
                    </span>
                  </div>
                </div>

                {/* Active Tag on the right side */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-3xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/20 rounded-full shrink-0">
                  <CircleCheck className="w-3.5 h-3.5 stroke-[2.5px]" />
                  {t('active')}
                </span>
              </div>

              {/* Middle Price Banner */}
              <div className="bg-subcard dark:bg-white/3 rounded-border-radius-inner p-2.5 flex justify-between items-center border border-glass-border">
                <div className="text-left leading-none min-w-0">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xl font-extrabold text-title-color">
                      {currentPurchasePlan.plan_id?.currency === 'INR' ? '₹' : '$'}
                      {currentPurchasePlan.plan_id?.amount}
                    </span>
                    <span className="text-2xs font-semibold text-primary ml-0.5">
                      /{currentPurchasePlan.plan_id?.billing_cycle === 'monthly' ? t('month') : t('year')}
                    </span>
                  </div>
                  <span className="text-xs text-subtitle-color block truncate mt-1">
                    {t('billed_cycle_with_email', {
                      cycle: currentPurchasePlan.plan_id?.billing_cycle === 'monthly'
                        ? t('monthly_capitalized', { defaultValue: 'Monthly' })
                        : t('annually_capitalized', { defaultValue: 'Annually' }),
                      email
                    })}
                  </span>
                </div>
                <div className="flex flex-col items-end leading-none text-right shrink-0">
                  <span className="text-[10px] font-semibold text-subtitle-color uppercase tracking-wider block mb-1">
                    {t('total_credits', { defaultValue: 'Total Credits' })}
                  </span>
                  <div className="flex items-center justify-end gap-1 text-primary font-extrabold text-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                    <span>
                      {currentPurchasePlan.plan_id?.total_credits === -1
                        ? t('unlimited', { defaultValue: 'Unlimited' })
                        : currentPurchasePlan.plan_id?.total_credits?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-2xs leading-none">
                  <div className="flex items-center gap-1 font-bold text-subtitle-color">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {daysLeft} {t('days_left')}
                  </div>

                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)',
                      backgroundSize: '1rem 1rem',
                    }}
                  />
                </div>
                <div className="flex justify-between text-2xs text-subtitle-color leading-none mt-1">
                  <span>{t('today', { defaultValue: 'Today' })}</span>
                  {t('renewal_on', { date: formattedExpiryDate, defaultValue: 'Renewal on {{date}}' })}
                </div>
              </div>

              {/* Manage Subscription Button */}
              <Button
                variant="outline"
                className="w-full h-8.5 primary-btn text-white!  border-none font-bold rounded-xl flex items-center px-3 text-xs  transition-all shrink-0"
              >
                {/* <Settings className="w-3.5 h-3.5" /> */}
                <span>{t('manage_subscription', { defaultValue: 'Manage Subscription' })}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </>
          ) : (
            <>
              {/* No active plan state */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8.5 h-8.5 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 shadow-sm text-slate-400 dark:text-slate-600">
                    <Crown className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 leading-none">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {t('no_plan', { defaultValue: 'No active plan' })}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 text-2xs font-bold text-suntitle-color bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-full">
                        {t('inactive', { defaultValue: 'Inactive' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-1 flex justify-center items-center flex-1 min-h-[90px] w-full">
                <Image
                  src="/images/plan.png"
                  alt={t('no_plan', { defaultValue: 'No Plan Image' })}
                  width={500}
                  height={500}
                  unoptimized
                  className="max-h-24 object-contain"
                />
              </div>

              <div className="w-full shrink-0">
                <Link href={ROUTES.PLANS} className="w-full block" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="premium"
                    className="w-full h-8.5 text-xs font-bold primary-btn text-white! rounded-xl flex items-center justify-center gap-1 shadow-none!"
                  >
                    <span>{t('get_plan', { defaultValue: 'Get a Plan' })}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </motion.section>
  )
}
