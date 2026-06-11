"use client";

import { motion } from "framer-motion";
import type { ActivityDay } from "@/types";

interface ActivityTileProps {
  activityData: ActivityDay[];
}

const LEVEL_COLORS = [
  "bg-void-600",
  "bg-iris-500/30",
  "bg-iris-500/55",
  "bg-iris-500/80",
  "bg-iris-500",
];

export function ActivityTile({ activityData }: ActivityTileProps) {
  // Show last 24 weeks (168 days) for grid
  const weeks: ActivityDay[][] = [];
  const recent = activityData.slice(-168);

  for (let i = 0; i < recent.length; i += 7) {
    weeks.push(recent.slice(i, i + 7));
  }

  const totalContributions = activityData.reduce((sum, d) => sum + d.count, 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 24 }}
      whileHover={{
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative overflow-hidden rounded-2xl border border-void-600 hover:border-iris-500/30 bg-void-800 p-5 transition-shadow duration-300 hover:shadow-glow-iris"
    >
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-100">
              Learning Activity
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {totalContributions} sessions in the last year
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500">Less</span>
            {LEVEL_COLORS.map((color, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-sm ${color}`}
                aria-hidden="true"
              />
            ))}
            <span className="text-xs text-gray-500">More</span>
          </div>
        </div>

        {/* Contribution grid */}
        <div
          className="flex gap-0.5 overflow-x-auto pb-1"
          role="img"
          aria-label="Learning activity heatmap showing session frequency over time"
        >
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: wi * 0.01 + di * 0.005,
                    duration: 0.2,
                  }}
                  className={`w-2.5 h-2.5 rounded-sm ${LEVEL_COLORS[day.level]} transition-colors duration-150 cursor-default`}
                  title={`${day.date}: ${day.count} sessions`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Day labels */}
        <div className="flex justify-between mt-2 px-0.5">
          {["Mon", "Wed", "Fri"].map((d) => (
            <span key={d} className="text-xs text-gray-600">
              {d}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
