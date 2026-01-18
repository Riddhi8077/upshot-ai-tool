import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import PricingCard from "./PricingCard"
import { Sparkles, Zap, Crown } from "lucide-react"

const plans = [
  {
    name: 'Generate 1 Post',
    price: '₹9',
    priceUSD: '$0.11',
    period: 'one-time',
    description: 'Perfect for trying out our service',
    icon: Sparkles,
    features: [
      '1 AI text generation',
      '1 AI image generation',
      'Content download',
      'Basic support'
    ],
    cta: 'Try Now',
    popular: false,
  },
  {
    name: 'Basic',
    price: '₹99',
    priceUSD: '$1.19',
    period: 'per month',
    description: 'Perfect for individuals and small creators',
    icon: Sparkles,
    features: [
      'Unlimited text generation',
      '10 AI image generations/month', 
      'Content history',
      'Email support',
      'Basic templates'
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹349',
    priceUSD: '$4.20',
    period: 'per month',
    description: 'Best for professionals and businesses',
    icon: Zap,
    features: [
      'Everything in Basic',
      '50 AI image generations/month',
      'Priority generation',
      'Custom templates',
      'Analytics dashboard',
      'Priority support',
      'API access'
    ],
    cta: 'Go Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    priceUSD: '',
    period: '',
    description: 'For large teams and organizations',
    icon: Crown,
    features: [
      'Everything in Pro',
      'Unlimited image generations',
      'Custom integrations',
      'Dedicated support',
      'Training sessions',
      'SLA guarantee',
      'Custom features'
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 gradient-hero text-white border-0">
            Simple Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Perfect Plan
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include 3 free generations to start with
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              3 free generations
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Indian Rupees (₹)
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}