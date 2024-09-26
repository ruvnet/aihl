import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, BarChart2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = ({ isOpen }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/challenges', icon: Trophy, label: 'Challenges' },
    { path: '/my-challenges', icon: Briefcase, label: 'Tasks' },
    { path: '/leaderboard', icon: BarChart2, label: 'Leaderboard' },
  ];

  return (
    <motion.nav
      className="fixed top-14 right-0 bottom-0 bg-background border-l border-border/40 w-[300px] z-40 overflow-y-auto"
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex flex-col h-full py-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 ${
              location.pathname === item.path ? 'text-primary' : 'text-foreground'
            } hover:bg-accent hover:text-accent-foreground transition-colors`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
