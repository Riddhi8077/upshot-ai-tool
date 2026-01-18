import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, Sparkles, Share2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';

const Dashboard = () => {
  const PERMANENT_IMAGE_PROMPT = `
Create a professional, eye-catching LinkedIn post image.

Style:
- Clean and minimal
- Modern startup aesthetic
- High contrast but soft colors
- Corporate and premium look

Guidelines:
- No people faces
- No logos
- No watermarks
- Minimal readable text (optional)
- Balanced composition
- Suitable for professionals and founders

Topic of the post:
`;

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { signOut, loading, profile  } = useAuth();
  const { toast } = useToast();

  const [error, setError] = useState<string | null>(null);

  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generating, setGenerating] = useState(false);

  const [generatedPost, setGeneratedPost] = useState<{
    text: string;
  } | null>(null);

  const handleImageGenerate = async () => {
  if (!topic) {
    toast({
      title: "Missing topic",
      description: "Topic is required",
      className: "bg-red-600 text-white border-none shadow-lg",
    });
    return;
  }

  try {
    setGenerating(true);

    const data = await apiFetch("/ai/generate-image.php", {
      method: "POST",
      body: JSON.stringify({
        prompt: `Create a professional LinkedIn post image about ${topic}`,
      }),
    });

    setImageUrl(data.image_url);
    setRemainingCredits(data.remaining);

    {imageUrl && (
  <img
    src={imageUrl}
    alt="Generated Image"
    style={{
      width: '100%',
      maxWidth: '100%',
      borderRadius: '12px',
      marginTop: '16px',
      display: 'block'
    }}
  />
)}

    toast({
      title: "Success",
      description: "Image generated successfully",
    });
  } catch (err: any) {
    toast({
      title: "Image generation failed",
      description: err.message,
      className: "bg-red-600 text-white border-none shadow-lg",
    });
  } finally {
    setGenerating(false);
  }
};

const handleGenerateAll = async () => {
  if (!topic || !tone) {
    toast({
      title: "Missing fields",
      description: "Topic and tone are required",
      className: "bg-red-600 text-white border-none shadow-lg",
    });
    return;
  }

  try {
    setGenerating(true);

    // 1️⃣ TEXT GENERATION
    const textData = await apiFetch("/ai/generate-text.php", {
      method: "POST",
      body: JSON.stringify({
        topic,
        tone,
        keywords,
      }),
    });

    setGeneratedPost({ text: textData.text });

    // 2️⃣ IMAGE GENERATION (PERMANENT PROMPT ✅)
    const imageData = await apiFetch('/ai/generate-image.php', {
  method: 'POST',
  body: JSON.stringify({
    prompt: `${PERMANENT_IMAGE_PROMPT} ${topic}. Tone: ${tone}`,
  }),
});

    setImageUrl(imageData.image_url);
    setRemainingCredits(imageData.remaining);

    toast({
      title: "Success 🎉",
      description: "Text & image generated successfully",
    });
  } catch (err: any) {
    toast({
      title: "Generation failed",
      description: err.message,
      className: "bg-red-600 text-white border-none shadow-lg",
    });
  } finally {
    setGenerating(false);
  }
};

const handleTextGenerate = async () => {
  if (!profile || profile.credits <= 0) {
    toast({
      title: "No credits left",
      description: "Please upgrade your plan",
      className:
    'bg-red-600 text-white border-none shadow-lg',
    });
    return;
  }

  try {
    setGenerating(true);

    const res = await fetch(
      "https://upshotx.com/upshot-api/ai/generate-text.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          topic,
          tone,
          keywords,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Generation failed");

    setGeneratedPost({ text: data.text });

    setError(null);
    
    toast({
      title: "Success",
      description: `Credits left: ${data.remaining}`,
      className:
    'bg-red-600 text-white border-none shadow-lg',
    });
  } catch (err: any) {
  setError(err.message || "Something went wrong"); // ✅ SHOW ON SCREEN

  toast({
    title: "Error",
    description: err.message,
    className: "bg-red-600 text-white border-none shadow-lg",
  });
}
};

const [imageUrl, setImageUrl] = useState<string | null>(null);
const [remainingCredits, setRemainingCredits] = useState<number | null>(null);

  return (
        <div className="min-h-screen bg-background pt-20">

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg gradient-hero">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">UpShotX Dashboard</span>
          </Link>

          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Content</CardTitle>
            <CardDescription>AI LinkedIn Post Generator</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label>Topic *</Label>
            <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
            className="
           bg-black 
           text-white 
           placeholder:text-gray-400 
           border border-white/20 
           focus:border-blue-500 
           focus:ring-2 
           focus:ring-blue-500/40
            "
            />
            </div>

            <div>
              <Label>Tone *</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-black border border-white/20 text-white">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-white/20 text-white">

  <SelectItem
    value="casual"
    className="hover:bg-blue-600/20 focus:bg-blue-600/30"
  >
    Casual
  </SelectItem>

  <SelectItem
    value="professional"
    className="hover:bg-blue-600/20 focus:bg-blue-600/30"
  >
    Professional
  </SelectItem>
</SelectContent>
              </Select>
            </div>

            <div>
              <Label>Keywords</Label>
             <Textarea
  value={keywords}
  onChange={(e) => setKeywords(e.target.value)}
  placeholder="Enter keywords (comma separated)"
  className="
    bg-black 
    text-white 
    placeholder:text-gray-400 
    border border-white/20 
    focus:border-blue-500 
    focus:ring-2 
    focus:ring-blue-500/40
    min-h-[120px]
  "
/>
            </div>
<div className="text-sm text-muted-foreground text-right">
  Credits left:{" "}
  <span className="font-semibold text-primary">
    {profile?.credits ?? 0}
  </span>
</div>
{error && (
  <div className="mb-4 p-3 rounded bg-red-600 text-white text-sm">
    {error}
  </div>
)}
{error && (
  <div
    style={{
      backgroundColor: "#dc2626", // red
      color: "#ffffff", // WHITE TEXT ✅
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "12px",
      fontSize: "14px",
      fontWeight: 500,
    }}
  >
    {error}
    {remainingCredits !== null && (
  <p className="text-sm text-muted-foreground mt-2">
    Remaining Image Credits: <b>{remainingCredits}</b>
  </p>
)}
  </div>
)}
       <Button
  onClick={handleGenerateAll}
  disabled={generating || !profile || profile.credits <= 0}
  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
>
  {generating ? (
    <>
      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      Generating text & image...
    </>
  ) : profile?.credits === 0 ? (
    'No Credits Left'
  ) : (
    'Generate'
  )}
</Button>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Output</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedPost ? (
              <>
                <pre className="bg-muted p-4 rounded mb-4 whitespace-pre-wrap">
                  {generatedPost.text}
                </pre>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(
                        generatedPost.text
                      )}`,
                      '_blank'
                    )
                  }
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on LinkedIn
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-center">
                Generated content will appear here
              </p>
            )}
            {imageUrl && (
  <img
    src={imageUrl}
    alt="AI Generated"
    className="rounded-lg mt-4"
  />
)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
