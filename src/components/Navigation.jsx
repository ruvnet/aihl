import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, BarChart2, Briefcase, MessageSquare } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/challenges', icon: Trophy, label: 'Challenges' },
    { path: '/my-challenges', icon: Briefcase, label: 'Tasks' },
    { path: '/leaderboard', icon: BarChart2, label: 'Leaderboard' },
    { path: '/admin-chat', icon: MessageSquare, label: 'Admin Chat' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full ${
              location.pathname === item.path ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;