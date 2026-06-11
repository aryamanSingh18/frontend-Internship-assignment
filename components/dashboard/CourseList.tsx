import { getCourses } from "@/lib/supabase";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { ErrorFallback } from "@/components/ui/ErrorFallback";

export async function CourseList() {
  let courses;

  try {
    courses = await getCourses();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    return <ErrorFallback message={message} />;
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-sm text-gray-500">
          No courses found. Add some in your Supabase dashboard.
        </p>
      </div>
    );
  }

  return (
    <>
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </>
  );
}
