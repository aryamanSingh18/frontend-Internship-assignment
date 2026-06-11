"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "achievements", label: "Trophies", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-void-600 bg-void-900/95 backdrop-blur-sm px-2 pb-safe"
      aria-label="Mobile navigation"
    >
      <ul className="flex justify-around" role="list">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveId(item.id)}
                className="relative flex flex-col items-center gap-1 py-3 px-4"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute inset-x-0 -top-px h-0.5 bg-iris-500 rounded-b"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={20}
                  className={isActive ? "text-iris-400" : "text-gray-500"}
                  aria-hidden="true"
                />
                <span
                  className={`text-xs ${isActive ? "text-iris-300" : "text-gray-500"}`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
