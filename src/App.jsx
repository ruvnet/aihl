import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import ChallengeDetails from './pages/ChallengeDetails';
import Leaderboard from './pages/Leaderboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import EnrolledChallenges from './pages/EnrolledChallenges';
import TeamWizard from './components/TeamWizard';
import TeamApplication from './pages/TeamApplication';
import About from './pages/About';
import Rules from './pages/Rules';
import ChallengeHistory from './pages/ChallengeHistory';
import SoloProfile from './pages/SoloProfile';
import TeamProfile from './pages/TeamProfile';
import ChallengeManagement from './pages/ChallengeManagement';
import AdminDashboard from './pages/AdminDashboard';
import AdminChat from './components/admin/AdminChat';

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
              <Header onOpenNav={() => setIsNavOpen(true)} />
              <main className="flex-grow container mx-auto px-4 py-8 pb-24 max-w-[1200px]">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/challenges" element={<Challenges />} />
                  <Route path="/challenges/:id" element={<ChallengeDetails />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/my-challenges" element={<EnrolledChallenges />} />
                  <Route path="/team-wizard" element={<TeamWizard />} />
                  <Route path="/team-application/:teamId" element={<TeamApplication />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/rules" element={<Rules />} />
                  <Route path="/challenge-history" element={<ChallengeHistory />} />
                  <Route path="/player/:id" element={<SoloProfile />} />
                  <Route path="/team/:id" element={<TeamProfile />} />
                  <Route path="/challenge-management/:id" element={<ChallengeManagement />} />
                  <Route path="/admin/*" element={<AdminDashboard />} />
                  <Route path="/admin-chat" element={<AdminChat />} />
                </Routes>
              </main>
              <Navigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
            </div>
          </Router>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
