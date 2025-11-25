import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Key,
  CreditCard,
  HeadphonesIcon,
  Settings,
  Search,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/client" },
  { icon: FolderKanban, label: "Projects", href: "/client/projects" },
  { icon: Key, label: "Licenses", href: "/client/licenses" },
  { icon: CreditCard, label: "Billing", href: "/client/billing" },
  { icon: HeadphonesIcon, label: "Support", href: "/client/support" },
  { icon: Settings, label: "Settings", href: "/client/settings" },
];

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6 border-b">
          <Link to="/client" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              Z
            </div>
            <div>
              <span className="font-bold text-lg block">ZDev</span>
              <span className="text-xs text-muted-foreground">Client Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-xs text-muted-foreground truncate">sarah.j@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Topbar */}
        <header className="h-16 border-b bg-card flex items-center px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full"
            />
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
