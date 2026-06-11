import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Course } from "@/types";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component — cookie mutations are ignored
          }
        },
      },
    }
  );
}

export async function getCourses(): Promise<Course[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase error fetching courses:", error.message);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return data ?? [];
}
