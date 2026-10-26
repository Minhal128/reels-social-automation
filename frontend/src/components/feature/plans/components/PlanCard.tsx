import { CustomTooltip } from '@/components/reusable/CustomTooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getAiFeaturesList } from '@/data/plan'
import { cn } from '@/lib/utils'
import { BookImage, CreditCard, FilePlay, Film, Image, Info, Layout, Sparkles, Star, Video } from 'lucide-react'

const featureActiveStyles: Record<string, string> = {
  text_to_image: "bg-blue-500/3 dark:bg-blue-500/10 border-blue-500/20 border-l-blue-400 text-blue-600 dark:text-blue-400",
  image_to_image: "bg-purple-500/3 dark:bg-purple-500/10 border-purple-500/20 border-l-purple-400 text-purple-600 dark:text-purple-400",
  video_motion: "bg-amber-500/3 dark:bg-amber-500/10 border-amber-500/20 border-l-amber-400 text-amber-600 dark:text-amber-400",
  images_to_video: "bg-orange-500/3 dark:bg-orange-500/10 border-orange-500/20 border-l-orange-400 text-orange-600 dark:text-orange-400",
  text_to_video: "bg-red-500/3 dark:bg-red-500/10 border-red-500/20 border-l-red-400 text-red-600 dark:text-red-400",
  ai_caption_generator: "bg-cyan-500/3 dark:bg-cyan-500/10 border-cyan-500/20 border-l-cyan-400 text-cyan-600 dark:text-cyan-400",
  character_generation: "bg-orange-500/3 dark:bg-orange-500/10 border-orange-500/20 border-l-orange-400 text-orange-600 dark:text-orange-400",
  ecommerce_catalogue: "bg-lime-500/3 dark:bg-lime-500/10 border-lime-500/20 border-l-lime-400 text-lime-600 dark:text-lime-400",
}


export const PlanCard = ({
  plan,
  price,
  billingCycleLabel,
  isPro,
  isActive,
  isDisabled,
  onSubscribe,
  t,
  buttonText,
  isLanding = false,
}: any) => {
  const translate = t || ((key: string, options?: any) => options?.defaultValue || key)
  const aiFeaturesList = getAiFeaturesList(translate)

  const currencySymbol = plan.currency === 'INR' ? '₹' : plan.currency === 'EUR' ? '€' : plan.currency === 'GBP' ? '£' : '$'

  return (
    <div className="group relative h-full flex flex-col bg-white/3 border dark:border-white/10 border-black/10  rounded-border-radius overflow-hidden transition-all duration-500 ">

      {/* Recommended Ribbon */}
      {(plan.is_featured || plan.is_default) && (
        <div className="absolute top-6 right-[-35px] rtl:right-auto rtl:left-[-35px]  rtl:-rotate-45 rotate-45 bg-primary px-10 py-1 shadow-lg z-20">
          <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
            <Star className="w-2.5 h-2.5 fill-white" />
            {plan.is_default ? translate('most_popular') : translate('popular')}
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 sm:p-6 p-4 flex flex-col h-full bg-white dark:bg-white/3">
        {/* Header */}
        <div className="flex items-start gap-3 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-radius flex items-center justify-center transition-all duration-300 ",
                isActive ? "bg-primary/20 text-primary" : "dark:bg-white/5 dark:text-white/70 bg-white text-black/70"
              )}>
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-title-color dark:text-white leading-none mb-2 transition-colors duration-300">
                  {plan.name}
                </h3>
                <div className="flex items-center gap-2 pt-1">
                  {plan.plan_type !== 'subscription' && (
                    <p className="text-xs font-bold text-subtitle-color uppercase tracking-wider">
                      {plan.plan_type === 'top_up'
                        ? translate('top_up', { defaultValue: 'Top-up' })
                        : translate(plan.plan_type, { defaultValue: plan.plan_type })}
                    </p>
                  )}
                  {isActive && (
                    <Badge className="rounded-full px-2 py-0.5 font-bold text-xs border-none shadow-sm flex items-center gap-1 bg-green-500/10 text-green-500">
                      <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                      {translate('active')}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="sm:mb-8 mb-4 relative py-6 px-4 rounded-border-radius-inner dark:bg-gradient-to-br from-white/[0.05] to-transparent border border-glass-border dark:border-white/5 transition-all duration-500 overflow-hidden group-hover:border-primary/40">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="relative flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-subtitle-color">{currencySymbol}</span>
              <span className="text-4xl font-black text-title-color dark:text-white tracking-tighter">
                {price}
              </span>
              <span className="text-sm font-semibold text-subtitle-color">/{billingCycleLabel}</span>
            </div>
            {plan.trial_period_days > 0 && plan.plan_type === 'subscription' && (
              <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                <Info className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary">
                  {plan.trial_period_days} {translate('days_free_trial')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Feature Sections Wrapper */}
        <div className="space-y-8 mb-6 grow">
          {/* Usage Limits / Features */}
          <div className="space-y-4">
            <h4 className="text-base text-title-color flex items-center gap-2 font-semibold">
              <CreditCard className="w-5 h-5 text-primary" />
              {translate('usage_limits')}
            </h4>
            <div className="space-y-3">

              <div className=" flex items-center justify-between p-3 rounded-border-radius-inner bg-black/3 dark:bg-white/3 border border-glass-border dark:border-white/5 transition-all duration-300 ">
                <span className="text-sm text-subtitle-color font-medium group-hover:text-title-color dark:group-hover:text-white/90 transition-colors">{translate('monthly_credits')}</span>
                <span className="text-sm font-bold text-title-color dark:text-white">{plan.total_credits}</span>
              </div>

              {Object.entries(plan.features || {}).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-border-radius-inner bg-black/3 dark:bg-white/3 border border-glass-border transition-all duration-300 group-hover:border-primary/10 hover:border-primary/40 hover:-translate-y-1 hover:shadow-md hover:bg-primary/5 cursor-default">
                  <span className="text-sm text-subtitle-color font-medium capitalize group-hover:text-title-color dark:group-hover:text-white/90 transition-colors">{String(key).replace(/_/g, ' ')}</span>
                  <span className="text-sm font-bold text-title-color dark:text-white">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Capabilities Grid */}
          {plan.ai_features && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-title-color flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {translate('ai_capabilities')}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {aiFeaturesList.map((feature) => {
                  const isEnabled = plan.ai_features?.[feature.key as keyof typeof plan.ai_features];
                  return (
                    <div
                      key={feature.key}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-border-radius-inner border border-l-4 text-left transition-all duration-300 min-h-[42px] select-none text-2xs font-extrabold tracking-tight leading-tight",
                        isEnabled
                          ? (featureActiveStyles[feature.key] || "bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 border-l-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm")
                          : "bg-slate-100/30 dark:bg-white/1 border-glass-border border-l-slate-300 dark:border-l-zinc-700 text-subtitle-color/40 dark:text-zinc-500/40 font-semibold"
                      )}
                    >
                      <feature.icon className={cn("w-4 h-4 shrink-0", isEnabled ? feature.color : "text-slate-400/40 dark:text-zinc-600")} />
                      <span className="truncate flex-1">{feature.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-5 border-t border-glass-border ">
          <Button
            onClick={onSubscribe}
            disabled={isDisabled || isActive}
            className={cn(
              'w-full h-12 rounded-border-radius-inner! font-bold text-xs transition-all duration-300 active:scale-95',
              isActive
                ? 'primary-btn text-white!  cursor-not-allowed'
                : ' text-black dark:text-white  border border-glass-border   hover:bg-primary! hover:text-white! bg-white/3!'
            )}
          >
            {buttonText
              ? buttonText
              : isActive
                ? translate('subscribed')
                : plan.trial_period_days > 0 && plan.plan_type === 'subscription'
                  ? translate('start_free_trial', { defaultValue: `Start ${plan.trial_period_days}-day free trial` })
                  : translate('subscribe_now')}
          </Button>
        </div>
      </div>
    </div>
  )
}
