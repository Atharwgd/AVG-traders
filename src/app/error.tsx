"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6 text-center gap-6">
      <p className="font-poppins text-soil/50 text-sm">Something went wrong loading the page.</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-terracotta text-cream font-poppins font-semibold rounded-full text-sm hover:bg-maroon transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
