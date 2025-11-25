import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

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

            {/* Client Routes */}
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client/projects" element={<ClientProjects />} />
            <Route path="/client/licenses" element={<ClientLicenses />} />
            <Route path="/client/billing" element={<ClientBilling />} />
            <Route path="/client/support" element={<ClientSupport />} />
            <Route path="/client/settings" element={<ClientSettings />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/licenses" element={<AdminLicenses />} />
            <Route path="/admin/billing" element={<AdminBilling />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/support" element={<AdminSupport />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/integrations" element={<AdminIntegrations />} />
            <Route path="/admin/activity-logs" element={<AdminActivityLogs />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
