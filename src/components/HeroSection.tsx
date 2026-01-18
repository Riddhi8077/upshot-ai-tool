import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react"
import heroImage from "@/assets/hero-image.jpg"

export default function HeroSection() {
  return (
    <section className="relative pt-6 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-hero opacity-10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-glass border border-border/50 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered LinkedIn Content Generation</span>
          </div>

         <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight md:leading-[1.1] mb-6 text-center md:text-center">
  Generate Viral LinkedIn Posts

  <span className="block sm:inline"> in Seconds </span>
</h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your LinkedIn presence with AI-generated posts and images. 
            Create engaging content that drives engagement and grows your audience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/auth">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="mb-16">
            <div className="relative max-w-5xl mx-auto">
              <img 
                src={heroImage} 
                alt="AI-powered LinkedIn post generator interface showing modern dashboard"
                className="w-full h-auto rounded-2xl gradient-glass border border-border/50 glow-primary"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-2xl gradient-glass">
              <div className="w-12 h-12 rounded-lg gradient-hero mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Generate posts in under 30 seconds</p>
            </div>

            <div className="text-center p-6 rounded-2xl gradient-glass">
              <div className="w-12 h-12 rounded-lg gradient-hero mx-auto mb-4 flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Targeted Content</h3>
              <p className="text-muted-foreground">AI learns your style and audience</p>
            </div>

            <div className="text-center p-6 rounded-2xl gradient-glass">
              <div className="w-12 h-12 rounded-lg gradient-hero mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">High Engagement</h3>
              <p className="text-muted-foreground">Posts that get likes and comments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}