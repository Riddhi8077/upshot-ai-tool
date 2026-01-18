import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Wand2, Lock } from 'lucide-react';
import sampleImage from "@/assets/sample.png";

const PublicDashboard = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [keywords, setKeywords] = useState('');

  const samplePost = {
    text: "🚀 Ready to transform your digital marketing game? Here are 5 proven strategies that top brands use to skyrocket their engagement:\n\n✨ Authentic storytelling that resonates\n🎯 Data-driven content optimization\n💡 Interactive polls and Q&As\n📊 Behind-the-scenes content\n🤝 User-generated content campaigns\n\nWhich strategy will you try first? Drop a comment below! 👇\n\n#DigitalMarketing #ContentStrategy #SocialMediaTips #MarketingTips #Engagement",
    image: "/api/placeholder/400/400"
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See UpShotX in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of AI-generated content. Try our demo below or sign up for full access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Demo Form */}
          <Card className="relative">
            <div className="absolute inset-0 bg-muted/10 rounded-lg flex items-center justify-center z-10">
              <div className="text-center p-6">
                <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Sign up to generate content</h3>
                <p className="text-muted-foreground mb-4">
                  Get 3 free generations to start creating amazing content
                </p>
                <Link to="/auth">
                  <Button size="lg">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle>Generate New Content</CardTitle>
              <CardDescription>
                Create engaging LinkedIn posts with AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 opacity-50">
              <div className="space-y-2">
                <Label htmlFor="demo-topic">Topic</Label>
                <Input
                  id="demo-topic"
                  placeholder="e.g., Digital Marketing Tips"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="demo-tone">Tone</Label>
                <Select value={tone} onValueChange={setTone} disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Funny">Funny</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="demo-keywords">Keywords (Optional)</Label>
                <Textarea
                  id="demo-keywords"
                  placeholder="e.g., social media, engagement, growth"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  rows={3}
                  disabled
                />
              </div>
              
              <Button disabled className="w-full">
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Content
              </Button>
            </CardContent>
          </Card>

          {/* Sample Generated Content */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Generated Content</CardTitle>
              <CardDescription>
                Here's what UpShotX can create for you
              </CardDescription>
            </CardHeader>
            
  <CardContent>
  <div className="rounded-lg overflow-hidden">
    <img src={sampleImage} alt="AI Generated" className="w-full h-auto rounded-lg shadow-lg" />
  </div>
</CardContent>
        </Card>
        </div>

        <div className="text-center mt-12">
          <Link to="/auth">
            <Button size="lg" className="mr-4">
              <Sparkles className="h-5 w-5 mr-2" />
              Start Creating Now
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PublicDashboard;