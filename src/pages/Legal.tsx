import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Legal() {
  return (
    <PublicLayout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Legal</h1>

          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="license">License Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="terms">
              <Card>
                <CardHeader>
                  <CardTitle>Terms of Service</CardTitle>
                  <CardDescription>Last updated: November 2024</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  <h3>1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using ZDev services, you agree to be bound by these Terms of Service
                    and all applicable laws and regulations.
                  </p>

                  <h3>2. Use License</h3>
                  <p>
                    Permission is granted to temporarily download one copy of the materials on ZDev's
                    services for personal, non-commercial transitory viewing only.
                  </p>

                  <h3>3. Disclaimer</h3>
                  <p>
                    The materials on ZDev's services are provided on an 'as is' basis. ZDev makes no
                    warranties, expressed or implied, and hereby disclaims and negates all other warranties.
                  </p>

                  <h3>4. Limitations</h3>
                  <p>
                    In no event shall ZDev or its suppliers be liable for any damages arising out of the
                    use or inability to use the materials on ZDev's services.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Policy</CardTitle>
                  <CardDescription>Last updated: November 2024</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  <h3>Information We Collect</h3>
                  <p>
                    We collect information that you provide directly to us, including name, email address,
                    and any other information you choose to provide.
                  </p>

                  <h3>How We Use Your Information</h3>
                  <p>
                    We use the information we collect to provide, maintain, and improve our services,
                    to communicate with you, and to protect our users.
                  </p>

                  <h3>Information Sharing</h3>
                  <p>
                    We do not share your personal information with third parties except as described in
                    this policy or with your consent.
                  </p>

                  <h3>Data Security</h3>
                  <p>
                    We take reasonable measures to help protect your personal information from loss,
                    theft, misuse, and unauthorized access.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="license">
              <Card>
                <CardHeader>
                  <CardTitle>License Policy</CardTitle>
                  <CardDescription>Last updated: November 2024</CardDescription>
                </CardHeader>
                <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                  <h3>License Types</h3>
                  <p>
                    ZDev offers various license types for our software products, each with different
                    terms and conditions regarding usage, distribution, and modifications.
                  </p>

                  <h3>License Validation</h3>
                  <p>
                    All software must be properly licensed. License keys are validated against our
                    servers and must remain active for continued use.
                  </p>

                  <h3>Domain Restrictions</h3>
                  <p>
                    Licenses are tied to specific domains. Using a license key on unauthorized domains
                    may result in license suspension.
                  </p>

                  <h3>Renewal and Expiration</h3>
                  <p>
                    Licenses must be renewed before expiration to ensure continued access to software
                    and support services.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PublicLayout>
  );
}
