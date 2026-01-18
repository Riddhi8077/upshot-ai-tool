import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    priceUSD?: string;
    period: string;
    description: string;
    icon: React.ComponentType<any>;
    features: string[];
    cta: string;
    popular: boolean;
  };
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const Icon = plan.icon;

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to continue',
        className:
    'bg-red-600 text-white border-none shadow-lg',    
    });
      return;
    }

    if (plan.name === 'Enterprise') {
      window.open(
        'mailto:contact@upshot.com?subject=Enterprise Plan Inquiry',
        '_blank'
      );
      return;
    }

    // TEMP: backend not connected yet
    setLoading(true);
    setTimeout(() => {
      toast({
        title: 'Payment coming soon',
        description:
          'Payments will be enabled after backend migration is completed.',
          className:
    'bg-red-600 text-white border-none shadow-lg',
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <Card
      className={`relative p-8 transition-smooth hover:scale-105 ${
        plan.popular
          ? 'gradient-glass border-primary/50 glow-primary'
          : 'gradient-glass'
      }`}
    >
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-hero text-white border-0">
          Most Popular
        </Badge>
      )}

      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-lg gradient-hero mx-auto mb-4 flex items-center justify-center">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-muted-foreground mb-4">{plan.description}</p>
        <div className="mb-2">
          <span className="text-4xl font-bold">{plan.price}</span>
          {plan.priceUSD && (
            <span className="text-lg text-muted-foreground ml-2">
              ({plan.priceUSD})
            </span>
          )}
          {plan.period && (
            <span className="text-muted-foreground ml-2">
              /{plan.period}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {user ? (
        <Button
          className="w-full"
          variant={plan.popular ? 'hero' : 'glass'}
          size="lg"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : plan.cta}
        </Button>
      ) : (
        <Link to="/auth" className="w-full">
          <Button
            className="w-full"
            variant={plan.popular ? 'hero' : 'glass'}
            size="lg"
          >
            Sign Up to {plan.cta}
          </Button>
        </Link>
      )}
    </Card>
  );
};

export default PricingCard;
