import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  DollarSign, 
  Shield, 
  FileText, 
  Mail,
  Home,
  BarChart3
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/departments', label: 'Departments', icon: Building2 },
    { path: '/costs', label: 'Treatment Costs', icon: DollarSign },
    { path: '/insurance', label: 'Insurance & Claims', icon: Shield },
    { path: '/analytics', label: 'Analytics & Insights', icon: BarChart3 },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isDesktop ? 0 : (isOpen ? 0 : -280),
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[280px] z-50 lg:fixed lg:top-16 lg:left-0 lg:w-64"
      >
        <div className="h-full glass border-r border-neutral-700/30 dark:border-neutral-700/20 p-6 flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              HFID
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Hospital Finance Intelligence
            </p>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 dark:from-cyan-500/30 dark:to-purple-500/30 border border-cyan-500/50 dark:border-cyan-500/70 text-cyan-500 dark:text-cyan-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-neutral-800/40'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;

