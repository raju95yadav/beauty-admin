import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Layers,
  Users,
  Package,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { title: 'Manage Products', icon: Package, path: '/manage-products' },
    { title: 'Add Product', icon: PlusCircle, path: '/add-product' },
    { title: 'Users', icon: Users, path: '/users' },
    { title: 'Subscribers', icon: Mail, path: '/subscribers' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 100 : 280 }}
      className="h-screen sticky top-0 bg-nykaa-surface border-r border-nykaa-border flex flex-col z-50 transition-all duration-300 shadow-xl dark:shadow-none"
    >
      {/* Logo Section */}
      <Link to="/dashboard" className="p-8 flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer">
        <div className="size-12 rounded-2xl bg-[#0D0D0D] border border-[#C5A880]/40 flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/15">
          <ShoppingBag className="text-[#C5A880] size-6" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-black text-2xl tracking-tighter text-nykaa-text"
            >
              GLAM<span className="text-[#C5A880]">Beauty</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-10 size-8 bg-[#0D0D0D] text-[#C5A880] rounded-full flex items-center justify-center border-4 border-nykaa-bg hover:scale-110 transition-transform active:scale-95 z-[60] shadow-md cursor-pointer"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group overflow-hidden
              ${isActive ? 'bg-[#0D0D0D] text-white dark:bg-[#FAF9F6] dark:text-[#0D0D0D] font-bold shadow-md' : 'text-nykaa-text-muted hover:text-nykaa-text hover:bg-[#C5A880]/10 transition-all'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={22} className={`flex-shrink-0 ${isActive ? 'text-[#C5A880]' : 'group-hover:text-[#C5A880]'}`} />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-bold tracking-wide"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#C5A880] rounded-r-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Card */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-6 m-4 mt-auto glass rounded-3xl border border-[#C5A880]/20 bg-[#C5A880]/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="text-[#C5A880]" size={18} />
              <p className="text-xs font-black uppercase tracking-widest text-nykaa-text">Admin Insights</p>
            </div>
            <p className="text-[10px] text-nykaa-text-muted font-bold mb-4">View real-time store analytics and metrics.</p>
            <Link to="/dashboard" className="block text-center w-full py-3 bg-[#0D0D0D] hover:bg-[#262626] text-white dark:bg-[#FAF9F6] dark:text-[#0D0D0D] rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm">
              Analytics Overview
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default Sidebar;
