import { ClientLayout } from "@/components/layouts/ClientLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { licenses } from "@/lib/dummyData";

export default function ClientLicenses() {
  return (
    <ClientLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Licenses</h1>
          <p className="text-muted-foreground">Manage your software licenses</p>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Key</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Domains</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licenses.map((license) => (
                  <TableRow key={license.id}>
                    <TableCell className="font-mono text-sm">{license.key}</TableCell>
                    <TableCell>{license.project}</TableCell>
                    <TableCell>
                      <Badge
                        variant={license.status === "Active" ? "default" : "destructive"}
                      >
                        {license.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{license.expires}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {license.domains.slice(0, 2).map((domain) => (
                          <Badge key={domain} variant="outline" className="text-xs">
                            {domain}
                          </Badge>
                        ))}
                        {license.domains.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{license.domains.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
}
