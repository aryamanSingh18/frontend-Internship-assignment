"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  colorClass?: string;
}

export function ProgressBar({
  value,
  colorClass = "bg-iris-500",
}: ProgressBarProps) {
  return (
    <div
      className="h-1.5 w-full rounded-full bg-void-600 overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${value}% complete`}
    >
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: "0%" }}
        animate={{ width: `${value}%` }}
        transition={{
          duration: 0.9,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.2,
        }}
      />
    </div>
  );
}
