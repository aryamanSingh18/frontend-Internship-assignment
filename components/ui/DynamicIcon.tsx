"use client";

import {
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Palette,
  Shield,
  Zap,
  BookOpen,
  BarChart3,
  Brain,
  Terminal,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Palette,
  Shield,
  Zap,
  BookOpen,
  BarChart3,
  Brain,
  Terminal,
};

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function DynamicIcon({ name, size = 20, className }: DynamicIconProps) {
  const Icon = ICON_MAP[name] ?? BookOpen;
  return <Icon size={size} className={className} aria-hidden="true" />;
}
