import { useState } from "react";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Chrome } from "lucide-react";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("signin");

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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="reset">Reset</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">Sign In</Button>

                <div className="relative my-4">
                  <Separator />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline">
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
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">Sign Up</Button>

                <div className="relative my-4">
                  <Separator />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    Or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline">
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
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input id="reset-email" type="email" placeholder="your@email.com" />
                </div>
                <Button className="w-full">Send Reset Link</Button>

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
