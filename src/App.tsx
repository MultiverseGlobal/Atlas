import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { useSovereignSync } from "@/hooks/useSovereignSync";
import { useAcquisitionSimulator } from "@/hooks/useAcquisitionSimulator";

import React, { Suspense } from "react";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import MetaphorAuthCallback from "./pages/MetaphorAuthCallback";
import HqShell from "./components/atlas/HqShell";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

const lazyWithDelay = (factory: () => Promise<any>, minDelayMs = 2500) => {
  return React.lazy(() =>
    Promise.all([
      factory(),
      new Promise((resolve) => setTimeout(resolve, minDelayMs)),
    ]).then(([moduleExports]) => moduleExports)
  );
};

const Onboarding = lazyWithDelay(() => import("./pages/Onboarding"));
const ObjectivesStudio = lazyWithDelay(() => import("./pages/hq/ObjectivesStudio"));
const HqRevenueEngine = lazyWithDelay(() => import("./pages/hq/HqRevenueEngine"));
const HqLeadDetail = lazyWithDelay(() => import("./pages/hq/HqLeadDetail"));
const HqProposal = lazyWithDelay(() => import("./pages/hq/HqProposal"));
const DailyBriefing = lazyWithDelay(() => import("./pages/hq/DailyBriefing"));
const CommandFeed = lazyWithDelay(() => import("./pages/CommandFeed"));
const HqSettings = lazyWithDelay(() => import("./pages/hq/HqSettings"));

const HqDashboard = lazyWithDelay(() => import("./pages/hq/HqDashboard"));
const HqDiscover = lazyWithDelay(() => import("./pages/hq/HqDiscover"));
const HqPartnerships = lazyWithDelay(() => import("./pages/hq/HqPartnerships"));
const HqTeam = lazyWithDelay(() => import("./pages/hq/HqTeam"));
const HqReport = lazyWithDelay(() => import("./pages/hq/HqReport"));
const HqMediaJobs = lazyWithDelay(() => import("./pages/hq/HqMediaJobs"));
const Privacy = lazyWithDelay(() => import("./pages/Privacy"));
const PublicProfile = lazyWithDelay(() => import("./pages/PublicProfile"));

const SovereignSyncWrapper = ({ children }: { children: React.ReactNode }) => {
  useSovereignSync();
  useAcquisitionSimulator();
  return <>{children}</>;
};

import { PageLoader } from "@/components/ui/PageLoader";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SovereignSyncWrapper>
          <AuthProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* ── Sovereign App Shell (Atlas V1 Core Surfaces & Extended) ─ */}
                <Route element={<HqShell />}>
                  <Route path="/" element={<CommandFeed />} />
                  <Route path="/briefing" element={<DailyBriefing />} />
                  <Route path="/objectives" element={<ObjectivesStudio />} />
                  <Route path="/workspace" element={<CommandFeed />} />
                  <Route path="/command" element={<CommandFeed />} />

                  {/* ── Sovereign Pipeline Flow ────────────────────────────── */}
                  <Route path="/hq">
                    <Route index element={<Navigate to="/hq/engine" replace />} />
                    <Route path="engine" element={<HqRevenueEngine />} />
                    <Route path="dashboard" element={<HqDashboard />} />
                    <Route path="discover" element={<HqDiscover />} />
                    <Route path="partnerships" element={<HqPartnerships />} />
                    <Route path="team" element={<HqTeam />} />
                    <Route path="report" element={<HqReport />} />
                    <Route path="media-jobs" element={<HqMediaJobs />} />
                    <Route path="leads" element={<Navigate to="/hq/engine" replace />} />
                    <Route path="leads/:id" element={<HqLeadDetail />} />
                    <Route path="leads/:id/proposal" element={<HqProposal />} />
                    <Route path="settings" element={<HqSettings />} />
                  </Route>
                </Route>

                {/* ── Standalone / Public Surfaces ─────────────────────────── */}
                <Route path="/landing" element={<Landing />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/auth/metaphor/callback" element={<MetaphorAuthCallback />} />
                <Route path="/onboarding" element={<Onboarding />} />

                <Route path="/app/*" element={<Navigate to="/hq/engine" replace />} />

                {/* ── Public ───────────────────────────────────────────────── */}
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/:handle" element={<PublicProfile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </SovereignSyncWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
