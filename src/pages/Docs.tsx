import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";

export default function Docs() {
  return (
    <PublicLayout>
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Access comprehensive guides and API documentation
          </p>

          <Card>
            <CardHeader>
              <CardTitle>ZDev Documentation Portal</CardTitle>
              <CardDescription>
                Complete guides, API references, and tutorials for all our products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our documentation portal contains everything you need to get started with ZDev
                products, including setup guides, API references, code examples, and best practices.
              </p>
              <Button size="lg" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Documentation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
