import type { ActivityDay, StreakData } from "@/types";

// Generates a 52-week mock contribution graph (deterministic based on day index)
export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();

  for (let i = 363; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    // Deterministic pseudo-random based on day index
    const seed = (i * 2654435761) % 256;
    const normalized = seed / 256;

    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (normalized > 0.6) {
      count = Math.floor(normalized * 8);
      if (count >= 7) level = 4;
      else if (count >= 5) level = 3;
      else if (count >= 3) level = 2;
      else level = 1;
    }

    days.push({ date: dateStr, count, level });
  }

  return days;
}

export function getStreakData(): StreakData {
  return {
    current: 14,
    longest: 31,
    thisWeek: 5,
  };
}
