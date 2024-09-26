import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, BarChart2, Briefcase, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const Navigation = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/challenges', icon: Trophy, label: 'Challenges' },
    { path: '/my-challenges', icon: Briefcase, label: 'Tasks' },
    { path: '/leaderboard', icon: BarChart2, label: 'Leaderboard' },
  ];

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      <motion.nav
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 right-0 bottom-0 w-[300px] bg-background z-50 shadow-lg overflow-y-auto"
      >
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
          <ul className="space-y-4 mt-12">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-lg ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                  onClick={onClose}
                >
                  <item.icon className="w-6 h-6 mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;
