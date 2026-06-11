"use client";

import { motion } from "framer-motion";
import { Flame, Zap, Star } from "lucide-react";
import type { StreakData } from "@/types";

interface HeroTileProps {
  streakData: StreakData;
  userName?: string;
}

const STAT_COLORS = [
  {
    icon: Flame,
    label: "Day streak",
    color: "ember",
    bg: "bg-ember-500/10",
    border: "border-ember-500/20",
    text: "text-ember-400",
  },
  {
    icon: Zap,
    label: "This week",
    color: "nova",
    bg: "bg-nova-400/10",
    border: "border-nova-400/20",
    text: "text-nova-400",
  },
  {
    icon: Star,
    label: "Best streak",
    color: "iris",
    bg: "bg-iris-500/10",
    border: "border-iris-500/20",
    text: "text-iris-400",
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function HeroTile({ streakData, userName = "Alex" }: HeroTileProps) {
  const stats = [
    { ...STAT_COLORS[0], value: streakData.current },
    { ...STAT_COLORS[1], value: streakData.thisWeek },
    { ...STAT_COLORS[2], value: streakData.longest },
  ];

  return (
    <article className="relative overflow-hidden rounded-2xl border border-void-600 bg-void-800 p-6 col-span-full">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-glow-iris opacity-40 pointer-events-none" />

      {/* Noise grain texture */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-iris-400 mb-1 tracking-wide">
            {getGreeting()}
          </p>
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Welcome back, {userName}{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            You're on a roll — keep pushing your{" "}
            <span className="text-iris-300 font-medium">
              {streakData.current}-day streak
            </span>
            .
          </p>
        </div>

        {/* Streak stats */}
        <div className="flex gap-3 shrink-0">
          {stats.map(({ icon: Icon, label, value, bg, border, text }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
              className={`flex flex-col items-center justify-center w-20 h-16 rounded-xl border ${bg} ${border}`}
            >
              <Icon size={16} className={text} aria-hidden="true" />
              <span className="text-xl font-semibold text-white leading-tight mt-0.5">
                {value}
              </span>
              <span className="text-xs text-gray-500 leading-tight">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </article>
  );
}
