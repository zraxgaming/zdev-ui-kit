import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function Maintenance() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Construction className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Maintenance Mode</CardTitle>
          <CardDescription>
            ZDev is currently undergoing scheduled maintenance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            We're working hard to improve your experience. We'll be back online shortly.
            Thank you for your patience!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
