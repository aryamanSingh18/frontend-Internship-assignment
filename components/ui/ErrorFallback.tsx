import { AlertCircle } from "lucide-react";

interface ErrorBoundaryFallbackProps {
  message?: string;
}

export function ErrorFallback({
  message = "We couldn't load your courses. Check your connection and try again.",
}: ErrorBoundaryFallbackProps) {
  return (
    <div className="col-span-full rounded-2xl border border-red-500/20 bg-red-500/5 p-6 flex items-start gap-4">
      <AlertCircle
        size={20}
        className="text-red-400 shrink-0 mt-0.5"
        aria-hidden="true"
      />
      <div>
        <h3 className="text-sm font-semibold text-red-300 mb-1">
          Failed to load courses
        </h3>
        <p className="text-xs text-red-400/80">{message}</p>
      </div>
    </div>
  );
}
