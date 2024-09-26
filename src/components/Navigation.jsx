import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, BarChart2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/challenges', icon: Trophy, label: 'Challenges' },
    { path: '/my-challenges', icon: Briefcase, label: 'Tasks' },
    { path: '/leaderboard', icon: BarChart2, label: 'Leaderboard' },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-gray-800 z-40"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <ul className="flex justify-around items-center h-14">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex flex-col items-center p-2 ${
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Navigation;
