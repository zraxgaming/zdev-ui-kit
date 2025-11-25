import { useState } from "react";
import { PublicLayout } from "@/components/layouts/PublicLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { portfolioItems } from "@/lib/dummyData";
import { X } from "lucide-react";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <PublicLayout>
      <div className="container py-12">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl text-muted-foreground">
            Custom solutions we've built for our clients
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedProject(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <Badge className="w-fit mb-2">{item.type}</Badge>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Drawer open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>{selectedProject?.title}</DrawerTitle>
            <DrawerDescription>{selectedProject?.type}</DrawerDescription>
          </DrawerHeader>
          <div className="px-6 py-4 overflow-auto">
            {selectedProject && (
              <div className="space-y-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedProject.features.map((feature) => (
                      <li key={feature} className="text-muted-foreground">{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Technology Stack</h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProject.tech.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </PublicLayout>
  );
}
