import { useState, useEffect } from 'react';
import { Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleStateChange = (state) => {
    setIsMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/rules", label: "Rules" },
    { to: "/analytics", label: "Analytics" },
    { to: "/register", label: "Register" },
    { to: "/login", label: "Login" },
    { to: "/forgot-password", label: "Forgot Password" },
    { to: "/team-wizard", label: "Create / Join Team" },
    { to: "/challenges", label: "Challenges" },
    { to: "/my-challenges", label: "My Challenges" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex">
          <Link to="/" className="text-lg font-bold hover:text-primary transition-colors">
            AI Hacker League
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </button>
          <Menu
            right
            isOpen={isMenuOpen}
            onStateChange={handleStateChange}
            customBurgerIcon={<span className="text-2xl">☰</span>}
            customCrossIcon={<X className="h-6 w-6" />}
            width={'100%'}
            className="bg-background text-foreground"
          >
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="menu-item block py-2 px-4 text-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;