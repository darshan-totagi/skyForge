import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Apply from "./pages/Apply";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Certificate from "./pages/Certificate";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import Auth from "./pages/Auth";
import CourseList from "./pages/CourseList";
import CourseView from "./pages/CourseView";
import AdminDashboard from "./pages/AdminDashboard";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/programs" component={Programs} />
      <Route path="/apply" component={Apply} />
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/certificate" component={Certificate} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/auth" component={Auth} />
      <Route path="/courses" component={CourseList} />
      <Route path="/my-courses" component={MyCourses} />
      <Route path="/profile" component={Profile} />
      <Route path="/course/:id" component={CourseView} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
