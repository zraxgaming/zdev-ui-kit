import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Chrome, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authService } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form states
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/client");
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await authService.signIn(signInEmail, signInPassword);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Auth state change will handle redirect
      setSuccess("Sign in successful!");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await authService.signUp(signUpEmail, signUpPassword, signUpName);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess("Sign up successful! Please check your email to confirm your account.");
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await authService.resetPassword(resetEmail);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess("Password reset email sent! Please check your inbox.");
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setError(null);
    const { error } = await authService.signInWithGithub();
    if (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const { error } = await authService.signInWithGoogle();
    if (error) {
      setError(error.message);
    }
  };

  return (
    <PublicLayout>
      <div className="container py-12 flex items-center justify-center min-h-[calc(100vh-300px)]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="h-12 w-12 rounded-lg bg-primary mx-auto mb-4 flex items-center justify-center text-primary-foreground font-bold text-xl">
              Z
            </div>
            <CardTitle>Welcome to ZDev</CardTitle>
            <CardDescription>Sign in to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="reset">Reset</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input 
                      id="signin-email" 
                      type="email" 
                      placeholder="your@email.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input 
                      id="signin-password" 
                      type="password" 
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>

                <div className="relative my-4">
                  <Separator />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={handleGithubSignIn}
                    disabled={loading}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>

                <div className="text-center text-sm">
                  <button
                    onClick={() => setActiveTab("reset")}
                    className="text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input 
                      id="signup-name" 
                      placeholder="Your name"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="your@email.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="••••••••"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      required
                      minLength={6}
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign Up
                  </Button>
                </form>

                <div className="relative my-4">
                  <Separator />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={handleGithubSignIn}
                    disabled={loading}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                  >
                    <Chrome className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("signin")}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="reset" className="space-y-4 mt-6">
                <form onSubmit={handleReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input 
                      id="reset-email" 
                      type="email" 
                      placeholder="your@email.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Reset Link
                  </Button>
                </form>

                <div className="text-center text-sm">
                  <button
                    onClick={() => setActiveTab("signin")}
                    className="text-primary hover:underline"
                  >
                    Back to sign in
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
