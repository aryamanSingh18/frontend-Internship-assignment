"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  User,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/courses" },
  { id: "progress", label: "Progress", icon: BarChart3, href: "/progress" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <motion.nav
      animate={{ width: collapsed ? 72 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex-shrink-0 h-full flex flex-col border-r border-void-600 bg-void-900 z-10"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-void-600">
        <div className="w-8 h-8 rounded-lg bg-iris-500/20 border border-iris-500/30 flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-iris-400" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="font-semibold text-sm text-white tracking-tight whitespace-nowrap overflow-hidden"
            >
              LearnOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <ul className="flex-1 px-2 py-4 space-y-1" role="list">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveId(item.id)}
                className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 group"
                aria-current={isActive ? "page" : undefined}
              >
                {/* Active background pill with layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="nav-highlight"
                    className="absolute inset-0 bg-iris-500/10 border border-iris-500/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover state (non-active) */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-void-700 transition-opacity duration-150" />
                )}

                <Icon
                  size={18}
                  className={`relative z-10 shrink-0 transition-colors duration-150 ${
                    isActive
                      ? "text-iris-400"
                      : "text-gray-500 group-hover:text-gray-300"
                  }`}
                  aria-hidden="true"
                />

                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className={`relative z-10 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                        isActive
                          ? "text-iris-300"
                          : "text-gray-400 group-hover:text-gray-200"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>

      {/* User avatar */}
      <div className="px-2 pb-4 border-t border-void-600 pt-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-iris-500/20 border border-iris-500/30 flex items-center justify-center shrink-0">
            <User size={14} className="text-iris-400" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-xs font-medium text-gray-300 whitespace-nowrap">
                  Alex Chen
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  Pro Plan
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-void-700 border border-void-500 flex items-center justify-center text-gray-400 hover:text-gray-200 hover:bg-void-600 transition-colors duration-150 z-20"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight size={12} />
        ) : (
          <ChevronLeft size={12} />
        )}
      </button>
    </motion.nav>
  );
}
