import { HeroTileSkeleton, CourseCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="hidden md:flex h-screen overflow-hidden bg-void-950">
      {/* Sidebar skeleton */}
      <div className="w-[220px] shrink-0 border-r border-void-600 bg-void-900" />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <HeroTileSkeleton />
          {Array.from({ length: 4 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
