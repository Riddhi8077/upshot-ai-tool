import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = async (type: "signin" | "signup") => {
    if (type === "signup" && password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result =
        type === "signin"
          ? await signIn(email, password)
          : await signUp(email, password);

      if (result?.error) {
        toast({
          title: "Error",
          description: String(result.error),
          variant: "destructive",
        });
        return;
      }

      navigate("/dashboard");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {/* Glassmorphism Card */}
      <Card className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.25)] rounded-2xl">
        <CardHeader className="text-center space-y-3">
          {/* Gradient Title */}
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
            UpShot<span className="text-blue-500">X</span>
          </h1>
          <p className="text-sm text-gray-400">
            AI-powered LinkedIn content generator
          </p>
        </CardHeader>

        <CardContent className="mt-2">
          <Tabs defaultValue="signin">
            {/* Tabs */}
            <TabsList className="grid grid-cols-2 mb-6 bg-black border border-white/10 rounded-xl">
              <TabsTrigger
                value="signin"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* SIGN IN */}
            <TabsContent value="signin" className="space-y-4">
              <div>
                <Label className="text-white">Email</Label>
                <Input
                  className="mt-1 bg-black border border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-white">Password</Label>
                <Input
                  className="mt-1 bg-black border border-white/20 text-white placeholder:text-gray-500 focus:border-blue-500"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Neon Button */}
              <Button
                onClick={() => handleAuth("signin")}
                disabled={loading || !email || !password}
                className="w-full bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.9)] hover:shadow-[0_0_40px_rgba(59,130,246,1)] transition-all"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </TabsContent>

            {/* SIGN UP */}
            <TabsContent value="signup" className="space-y-4">
              <div>
                <Label className="text-white">Email</Label>
                <Input
                  className="mt-1 bg-black border border-white/20 text-white"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-white">Password</Label>
                <Input
                  className="mt-1 bg-black border border-white/20 text-white"
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-white">Confirm Password</Label>
                <Input
                  className="mt-1 bg-black border border-white/20 text-white"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button
                onClick={() => handleAuth("signup")}
                disabled={loading || !email || !password || !confirmPassword}
                className="w-full bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.9)] hover:shadow-[0_0_40px_rgba(59,130,246,1)] transition-all"
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                ✨ Get 3 free credits on signup
              </p>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-blue-500 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
