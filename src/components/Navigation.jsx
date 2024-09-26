import { Link } from 'react-router-dom';
import { Home, Trophy, BarChart2, Briefcase, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const Navigation = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/challenges', icon: Trophy, label: 'Challenges' },
    { path: '/my-challenges', icon: Briefcase, label: 'Tasks' },
    { path: '/leaderboard', icon: BarChart2, label: 'Leaderboard' },
  ];

  return (
    <motion.nav
      className="fixed top-0 right-0 bottom-0 w-[300px] bg-background shadow-lg z-50"
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-end p-4">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex flex-col space-y-4 p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            onClick={onClose}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
