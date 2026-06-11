import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-void-700",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
        "before:animate-shimmer before:bg-[length:200%_100%]",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <article className="relative rounded-2xl overflow-hidden border border-void-600 bg-void-800 p-5">
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-1.5 w-full rounded-full mt-4" />
      <div className="flex justify-between mt-2">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-8" />
      </div>
    </article>
  );
}

export function HeroTileSkeleton() {
  return (
    <div className="rounded-2xl border border-void-600 bg-void-800 p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-5 w-64" />
      <div className="flex gap-3 mt-4">
        <Skeleton className="h-16 w-24 rounded-xl" />
        <Skeleton className="h-16 w-24 rounded-xl" />
        <Skeleton className="h-16 w-24 rounded-xl" />
      </div>
    </div>
  );
}
