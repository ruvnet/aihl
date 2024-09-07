import { useState, useEffect } from 'react';
import { Moon, Sun, Menu as MenuIcon, Info, Book, BarChart2, UserPlus, LogIn, Users, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { Button } from "@/components/ui/button";

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
    { to: "/about", label: "About", icon: Info },
    { to: "/rules", label: "Rules", icon: Book },
    { to: "/analytics", label: "Analytics", icon: BarChart2 },
    { to: "/register", label: "Register", icon: UserPlus },
    { to: "/login", label: "Login", icon: LogIn },
    { to: "/team-wizard", label: "Create / Join Team", icon: Users },
    { to: "/profile", label: "Profile", icon: User },
  ];

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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 rounded-full"
          >
            <MenuIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
      <Menu
        right
        isOpen={isMenuOpen}
        onStateChange={handleStateChange}
        customBurgerIcon={false}
        className="bg-background"
        width={'100%'}
        styles={{
          bmMenu: {
            background: theme === 'dark' ? 'hsl(var(--background))' : 'hsl(var(--background))',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em',
            height: '100vh',
            boxShadow: '-5px 0 10px rgba(0, 0, 0, 0.1)',
          },
          bmItemList: {
            padding: '0.8em',
            height: 'auto',
          },
          bmItem: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0.8em',
            color: 'var(--foreground)',
          },
          bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center py-2 px-4 text-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={closeMenu}
          >
            <item.icon className="h-5 w-5 mr-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </Menu>
    </header>
  );
};

export default Header;