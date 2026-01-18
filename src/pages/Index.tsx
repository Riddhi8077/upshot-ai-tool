import { useAuth } from "@/hooks/useAuth"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import PublicDashboard from "@/components/PublicDashboard"
import PricingSection from "@/components/PricingSection"
import FAQSection from "@/components/FAQSection"

const Index = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PublicDashboard />
        <PricingSection />
        <FAQSection />
      </main>
    </div>
  );
};

export default Index;
