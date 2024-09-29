"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="mt-4 bg-[#F47B20] text-white px-4 py-2 rounded"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
