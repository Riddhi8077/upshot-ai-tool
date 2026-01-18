import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PricingPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: 'Generate 1 Post',
      price: '₹9',
      priceUSD: '$0.11',
      period: 'one-time',
      description: 'Perfect for trying out our service',
      features: [
        '1 AI text generation',
        '1 AI image generation',
        'Content download',
        'Basic support',
      ],
      planId: 'trial',
      amount: 9,
      popular: false,
    },
    {
      name: 'Basic',
      price: '₹99',
      priceUSD: '$1.19',
      period: '/month',
      description: 'Perfect for individuals and small creators',
      features: [
        'Unlimited text generation',
        '10 AI image generations/month',
        'Content history',
        'Email support',
        'Basic templates',
      ],
      planId: 'basic',
      amount: 99,
      popular: false,
    },
    {
      name: 'Pro',
      price: '₹349',
      priceUSD: '$4.20',
      period: '/month',
      description: 'Best for professionals and businesses',
      features: [
        'Everything in Basic',
        '50 AI image generations/month',
        'Priority generation',
        'Custom templates',
        'Analytics dashboard',
        'Priority support',
        'API access',
      ],
      planId: 'pro',
      amount: 349,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      priceUSD: '',
      period: '',
      description: 'For large teams and organizations',
      features: [
        'Everything in Pro',
        'Unlimited image generations',
        'Custom integrations',
        'Dedicated support',
        'Training sessions',
        'SLA guarantee',
        'Custom features',
      ],
      planId: 'enterprise',
      amount: 0,
      popular: false,
    },
  ];

  const handlePayment = async (plan: any) => {
  if (!user) {
    toast({
      title: 'Please sign in',
      description: 'You need to be signed in to continue',
      className:
    'bg-red-600 text-white border-none shadow-lg',
    });
    return;
  }

  if (plan.planId === 'enterprise') {
    window.open(
      'mailto:contact@upshot.com?subject=Enterprise Plan Inquiry',
      '_blank'
    );
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem('token');

    // ✅ 1️⃣ Decide amount based on plan
    let amount = 0;
    if (plan.planId === 'trial') amount = 9;
    else if (plan.planId === 'basic') amount = 99;
    else if (plan.planId === 'pro') amount = 199;

    if (!amount) {
      throw new Error('Invalid plan amount');
    }

    // ✅ 2️⃣ Create Razorpay order (SEND AMOUNT)
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/create-order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,              // 👈 REQUIRED (FIX)
          plan: plan.planId,   // optional but useful for backend
        }),
      }
    );

    const data = await res.json();

    if (!data.order) {
      throw new Error('Order creation failed');
    }

    // ✅ 3️⃣ Razorpay popup
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount, // in paise (from backend)
      currency: 'INR',
      name: 'Upshot AI',
      description: `${plan.name} Plan`,
      order_id: data.order.id,

      handler: async function (response: any) {
        // ✅ 4️⃣ Verify payment
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/verify-payment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              plan: plan.planId,
              userId: user.id,
            }),
          }
        );

        toast({
          title: 'Payment successful 🎉',
          description: 'Your credits have been added',
          className:
    'bg-red-600 text-white border-none shadow-lg',
        });

        window.location.reload();
      },

      theme: { color: '#6366f1' },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    toast({
      title: 'Payment failed',
      description: 'Something went wrong',
      className:
    'bg-red-600 text-white border-none shadow-lg',
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full power of AI content generation with our flexible pricing plans
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative h-full flex flex-col ${
                plan.popular
                  ? 'border-primary shadow-lg scale-105 bg-gradient-to-b from-primary/5 to-background'
                  : 'border-border hover:border-primary/50 transition-colors'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.priceUSD && (
                    <span className="text-lg text-muted-foreground ml-2">
                      ({plan.priceUSD})
                    </span>
                  )}
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-4 w-4 text-primary mr-3 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full mt-auto"
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => handlePayment(plan)}
                  disabled={loading}
                >
                  {plan.planId === 'enterprise'
                    ? 'Contact Sales'
                    : loading
                    ? 'Processing...'
                    : 'Get Started'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
console.log("Frontend Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);

export default PricingPage;
