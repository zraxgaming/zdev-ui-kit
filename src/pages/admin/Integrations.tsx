import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Github,
  MessageSquare,
  CreditCard,
  Mail,
  Container,
  Figma,
  Search,
} from "lucide-react";
import { integrations } from "@/lib/dummyData";

const iconMap: Record<string, any> = {
  Github,
  MessageSquare,
  CreditCard,
  Mail,
  Container,
  Figma,
};

export default function AdminIntegrations() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">Connect third-party services</p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter apps..." className="pl-8" />
          </div>
          <Button variant="outline">All Apps</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => {
            const Icon = iconMap[integration.icon] || MessageSquare;
            return (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Button
                      variant={integration.connected ? "secondary" : "outline"}
                      size="sm"
                    >
                      {integration.connected ? "Connected" : "Connect"}
                    </Button>
                  </div>
                  <CardTitle className="mt-4">{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
