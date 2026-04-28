import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const CookiePolicy  = lazy(() => import("./pages/CookiePolicy.tsx"));

const PageFallback = () => (
  <div className="min-h-screen bg-osso-black flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-osso-amber/30 border-t-osso-amber animate-spin" />
  </div>
);

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy" element={
          <Suspense fallback={<PageFallback />}>
            <PrivacyPolicy />
          </Suspense>
        } />
        <Route path="/cookie" element={
          <Suspense fallback={<PageFallback />}>
            <CookiePolicy />
          </Suspense>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
