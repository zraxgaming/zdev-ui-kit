import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus } from "lucide-react";
import { licenses } from "@/lib/dummyData";

export default function AdminLicenses() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Licenses</h1>
            <p className="text-muted-foreground">Manage software licenses</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create License
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Filter licenses..." className="pl-8" />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Key</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenses.map((license) => (
                  <TableRow key={license.id} className="cursor-pointer">
                    <TableCell className="font-mono text-sm">{license.key}</TableCell>
                    <TableCell>{license.project}</TableCell>
                    <TableCell>{license.client}</TableCell>
                    <TableCell>
                      <Badge
                        variant={license.status === "Active" ? "default" : "destructive"}
                      >
                        {license.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{license.expires}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
