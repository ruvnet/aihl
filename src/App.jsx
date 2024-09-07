import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from 'next-themes';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Leaderboard from './pages/Leaderboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8 pb-24">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/challenges" element={<Challenges />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
              <Navigation />
            </div>
          </Router>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;