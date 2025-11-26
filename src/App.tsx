import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthGuard } from "@/components/AuthGuard";

// Public pages
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Portfolio from "./pages/Portfolio";
import Demos from "./pages/Demos";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Docs from "./pages/Docs";
import Auth from "./pages/Auth";
import Maintenance from "./pages/Maintenance";

// Client portal
import ClientDashboard from "./pages/client/Dashboard";
import ClientProjects from "./pages/client/Projects";
import ClientLicenses from "./pages/client/Licenses";
import ClientBilling from "./pages/client/Billing";
import ClientSupport from "./pages/client/Support";
import ClientSettings from "./pages/client/Settings";

// Admin panel
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProjects from "./pages/admin/Projects";
import AdminLicenses from "./pages/admin/Licenses";
import AdminBilling from "./pages/admin/Billing";
import AdminContent from "./pages/admin/Content";
import AdminSupport from "./pages/admin/Support";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";
import AdminIntegrations from "./pages/admin/Integrations";
import AdminActivityLogs from "./pages/admin/ActivityLogs";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/maintenance" element={<Maintenance />} />

            {/* Client Portal Routes - Protected */}
            <Route path="/client" element={<AuthGuard><ClientDashboard /></AuthGuard>} />
            <Route path="/client/projects" element={<AuthGuard><ClientProjects /></AuthGuard>} />
            <Route path="/client/licenses" element={<AuthGuard><ClientLicenses /></AuthGuard>} />
            <Route path="/client/billing" element={<AuthGuard><ClientBilling /></AuthGuard>} />
            <Route path="/client/support" element={<AuthGuard><ClientSupport /></AuthGuard>} />
            <Route path="/client/settings" element={<AuthGuard><ClientSettings /></AuthGuard>} />

            {/* Admin Panel Routes - Admin Only */}
            <Route path="/admin" element={<AuthGuard requireAdmin><AdminDashboard /></AuthGuard>} />
            <Route path="/admin/users" element={<AuthGuard requireAdmin><AdminUsers /></AuthGuard>} />
            <Route path="/admin/projects" element={<AuthGuard requireAdmin><AdminProjects /></AuthGuard>} />
            <Route path="/admin/licenses" element={<AuthGuard requireAdmin><AdminLicenses /></AuthGuard>} />
            <Route path="/admin/billing" element={<AuthGuard requireAdmin><AdminBilling /></AuthGuard>} />
            <Route path="/admin/content" element={<AuthGuard requireAdmin><AdminContent /></AuthGuard>} />
            <Route path="/admin/support" element={<AuthGuard requireAdmin><AdminSupport /></AuthGuard>} />
            <Route path="/admin/analytics" element={<AuthGuard requireAdmin><AdminAnalytics /></AuthGuard>} />
            <Route path="/admin/settings" element={<AuthGuard requireAdmin><AdminSettings /></AuthGuard>} />
            <Route path="/admin/integrations" element={<AuthGuard requireAdmin><AdminIntegrations /></AuthGuard>} />
            <Route path="/admin/activity-logs" element={<AuthGuard requireAdmin><AdminActivityLogs /></AuthGuard>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
