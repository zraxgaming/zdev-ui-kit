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
import { Search } from "lucide-react";
import { activityLogs } from "@/lib/dummyData";

export default function AdminActivityLogs() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Activity Logs</h1>
          <p className="text-muted-foreground">Monitor system activity and user actions</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-8" />
              </div>
              <Button variant="outline">Type</Button>
              <Button variant="outline">User</Button>
              <Button variant="outline">Date</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Page</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activityLogs.map((log) => (
                  <TableRow key={log.id} className="cursor-pointer">
                    <TableCell className="font-mono text-sm whitespace-nowrap">
                      {log.time}
                    </TableCell>
                    <TableCell>{log.user || "Unknown"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.event === "security"
                            ? "destructive"
                            : log.event === "update"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {log.event}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md truncate">{log.description}</TableCell>
                    <TableCell className="text-muted-foreground">{log.page}</TableCell>
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
