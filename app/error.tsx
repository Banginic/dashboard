"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold text-red-600">Something went wrong!</h2>
      <p className="mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
