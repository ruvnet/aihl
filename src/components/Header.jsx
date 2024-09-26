import { useState } from 'react';
import { Moon, Sun, Menu as MenuIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navigation from './Navigation';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useState(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold hover:text-primary transition-colors">
          AI Hacker League
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-9 h-9 rounded-full"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="w-9 h-9 rounded-full"
          >
            <MenuIcon className="h-4 w-4" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </div>
      </div>
      <Navigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </header>
  );
};

export default Header;
