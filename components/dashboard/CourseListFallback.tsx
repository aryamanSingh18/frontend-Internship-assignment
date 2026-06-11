import { CourseCardSkeleton } from "@/components/ui/Skeleton";

export function CourseListFallback() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </>
  );
}
