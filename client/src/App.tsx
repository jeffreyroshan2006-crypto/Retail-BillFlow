import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import POSPage from "@/pages/POSPage";
import InventoryPage from "@/pages/InventoryPage";
import CustomersPage from "@/pages/CustomersPage";
import BillsPage from "@/pages/BillsPage";
import PublicBillPage from "@/pages/PublicBillPage";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component }: { component: React.ComponentType<any> }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    setLocation("/login");
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/public/bill/:publicId">
        {(params) => <PublicBillPage params={params} />}
      </Route>
      
      {/* Protected Routes */}
      <Route path="/">
        {() => <ProtectedRoute component={DashboardPage} />}
      </Route>
      <Route path="/pos">
        {() => <ProtectedRoute component={POSPage} />}
      </Route>
      <Route path="/products">
        {() => <ProtectedRoute component={InventoryPage} />}
      </Route>
      <Route path="/customers">
        {() => <ProtectedRoute component={CustomersPage} />}
      </Route>
      <Route path="/reports">
        {() => <ProtectedRoute component={BillsPage} />}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
