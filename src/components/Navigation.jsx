import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, BarChart2, Briefcase, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/challenges', icon: Trophy, label: 'Challenges' },
    { path: '/my-challenges', icon: Briefcase, label: 'Tasks' },
    { path: '/leaderboard', icon: BarChart2, label: 'Leaderboard' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-full shadow-lg"
      >
        <Menu />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 w-[300px] bg-background border-r border-border shadow-lg z-40 h-screen"
          >
            <div className="flex flex-col justify-center items-start h-full p-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center w-full p-4 ${
                    location.pathname === item.path ? 'text-primary' : 'text-foreground'
                  } hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-6 h-6 mr-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
