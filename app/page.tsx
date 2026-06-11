import { Suspense } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { CourseList } from "@/components/dashboard/CourseList";
import { CourseListFallback } from "@/components/dashboard/CourseListFallback";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { HeroTileSkeleton } from "@/components/ui/Skeleton";
import { generateActivityData, getStreakData } from "@/lib/activity";

export default function DashboardPage() {
  const activityData = generateActivityData();
  const streakData = getStreakData();

  return (
    <>
      {/* Desktop & Tablet layout */}
      <div className="hidden md:flex h-screen overflow-hidden bg-void-950">
        <Sidebar />

        <main
          className="flex-1 overflow-y-auto p-6"
          id="main-content"
          aria-label="Dashboard content"
        >
          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {/* Hero tile — full width */}
            <Suspense fallback={<HeroTileSkeleton />}>
              <HeroTile streakData={streakData} userName="Alex" />
            </Suspense>

            {/* Course tiles — dynamic from Supabase */}
            <section
              className="contents"
              aria-label="Active courses"
            >
              <Suspense fallback={<CourseListFallback />}>
                <CourseList />
              </Suspense>
            </section>

            {/* Activity tile — spans 2 cols on large screens */}
            <div className="lg:col-span-3">
              <ActivityTile activityData={activityData} />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden min-h-screen bg-void-950 pb-20">
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-4 border-b border-void-600 bg-void-900/90 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">LearnOS</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-iris-500/20 border border-iris-500/30 flex items-center justify-center">
            <span className="text-xs font-medium text-iris-400">AC</span>
          </div>
        </header>

        <main className="px-4 py-4 space-y-4" aria-label="Dashboard content">
          {/* Hero */}
          <Suspense fallback={<HeroTileSkeleton />}>
            <HeroTile streakData={streakData} userName="Alex" />
          </Suspense>

          {/* Courses section */}
          <section aria-label="Active courses">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              My Courses
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Suspense fallback={<CourseListFallback />}>
                <CourseList />
              </Suspense>
            </div>
          </section>

          {/* Activity */}
          <ActivityTile activityData={activityData} />
        </main>

        <BottomNav />
      </div>
    </>
  );
}
