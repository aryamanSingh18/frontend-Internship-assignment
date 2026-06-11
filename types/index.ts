export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
  description?: string;
  color?: "iris" | "nova" | "jade" | "ember";
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface StreakData {
  current: number;
  longest: number;
  thisWeek: number;
}

export type CourseColor = "iris" | "nova" | "jade" | "ember";

export const COURSE_COLORS: CourseColor[] = ["iris", "nova", "jade", "ember"];
