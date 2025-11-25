import { useState } from "react";
import { ClientLayout } from "@/components/layouts/ClientLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/lib/dummyData";

export default function ClientProjects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <ClientLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">View and manage your projects</p>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.status === "Active"
                            ? "default"
                            : project.status === "Completed"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{project.updated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Drawer open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>{selectedProject?.title}</DrawerTitle>
            <DrawerDescription>{selectedProject?.type}</DrawerDescription>
          </DrawerHeader>
          <div className="px-6 overflow-auto">
            {selectedProject && (
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="license">License</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{selectedProject.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Technologies</h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Status</h3>
                    <Badge>{selectedProject.status}</Badge>
                  </div>
                </TabsContent>

                <TabsContent value="files" className="mt-4">
                  <div className="space-y-2">
                    {selectedProject.files.map((file) => (
                      <div
                        key={file.name}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="license" className="mt-4">
                  <Card>
                    <CardContent className="pt-6 space-y-2">
                      <p>
                        <span className="font-semibold">Status:</span> Active
                      </p>
                      <p>
                        <span className="font-semibold">Key:</span> XXXX-XXXX-XXXX-XXXX
                      </p>
                      <p>
                        <span className="font-semibold">Domains:</span> example.com
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="updates" className="mt-4">
                  <div className="space-y-4">
                    <div className="border-l-2 pl-4 pb-4">
                      <p className="text-sm text-muted-foreground mb-1">Nov 23, 2024</p>
                      <p className="font-medium">Project updated</p>
                    </div>
                    <div className="border-l-2 pl-4 pb-4">
                      <p className="text-sm text-muted-foreground mb-1">Nov 20, 2024</p>
                      <p className="font-medium">New files added</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ClientLayout>
  );
}
