import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { blogPosts, portfolioItems, demos } from "@/lib/dummyData";

export default function AdminContent() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Manage blog posts, portfolio, and demos</p>
        </div>

        <Tabs defaultValue="blog">
          <TabsList>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="demos">Demos</TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Blog Posts</h3>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tags</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id} className="cursor-pointer">
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Portfolio Items</h3>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Item
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {portfolioItems.map((item) => (
                    <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <CardContent className="p-4">
                        <Badge className="mb-2">{item.type}</Badge>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demos">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Demos</h3>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Demo
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Link</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demos.map((demo) => (
                      <TableRow key={demo.id} className="cursor-pointer">
                        <TableCell className="font-medium">{demo.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{demo.type}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{demo.link}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
