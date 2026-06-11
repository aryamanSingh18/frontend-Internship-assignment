"use client";

import { motion } from "framer-motion";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Course, CourseColor } from "@/types";
import { COURSE_COLORS } from "@/types";

const COLOR_MAP: Record<
  CourseColor,
  { bg: string; border: string; icon: string; progress: string; glow: string }
> = {
  iris: {
    bg: "bg-iris-500/10",
    border: "border-iris-500/20 hover:border-iris-500/40",
    icon: "text-iris-400",
    progress: "bg-iris-500",
    glow: "hover:shadow-glow-iris",
  },
  nova: {
    bg: "bg-nova-400/10",
    border: "border-nova-400/20 hover:border-nova-400/40",
    icon: "text-nova-400",
    progress: "bg-nova-400",
    glow: "hover:shadow-glow-nova",
  },
  jade: {
    bg: "bg-jade-400/10",
    border: "border-jade-400/20 hover:border-jade-400/40",
    icon: "text-jade-400",
    progress: "bg-jade-500",
    glow: "hover:shadow-glow-jade",
  },
  ember: {
    bg: "bg-ember-400/10",
    border: "border-ember-400/20 hover:border-ember-400/40",
    icon: "text-ember-400",
    progress: "bg-ember-400",
    glow: "hover:shadow-glow-ember",
  },
};

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const colorKey = COURSE_COLORS[index % COURSE_COLORS.length];
  const colors = COLOR_MAP[colorKey];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1 + 0.2,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      whileHover={{
        scale: 1.015,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`relative overflow-hidden rounded-2xl border bg-void-800 p-5 cursor-pointer transition-shadow duration-300 ${colors.border} ${colors.glow}`}
    >
      {/* Grain texture */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      {/* Gradient mesh background */}
      <div
        className={`absolute inset-0 opacity-30 pointer-events-none ${
          colorKey === "iris"
            ? "bg-glow-iris"
            : colorKey === "nova"
            ? "bg-glow-nova"
            : colorKey === "jade"
            ? "bg-glow-jade"
            : "bg-glow-ember"
        }`}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-4 border ${colors.border.split(" ")[0]}`}
        >
          <DynamicIcon
            name={course.icon_name}
            size={18}
            className={colors.icon}
          />
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-100 leading-snug mb-1">
          {course.title}
        </h2>

        {/* Spacer */}
        <div className="mt-4 space-y-2">
          <ProgressBar value={course.progress} colorClass={colors.progress} />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Progress</span>
            <span className={`text-xs font-medium ${colors.icon}`}>
              {course.progress}%
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
