import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { demos } from "@/lib/dummyData";
import { ExternalLink } from "lucide-react";

export default function Demos() {
  return (
    <PublicLayout>
      <div className="container py-12">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-bold mb-4">Demos</h1>
          <p className="text-xl text-muted-foreground">
            Try out our interactive demos and templates
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo) => (
            <Card key={demo.id} className="hover:shadow-lg transition-shadow">
              <img
                src={demo.thumbnail}
                alt={demo.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <Badge className="w-fit mb-2">{demo.type}</Badge>
                <CardTitle>{demo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Demo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
