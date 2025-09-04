'use client'
import React from "react";

function ErrorFetching({ retry, message }: { message: string, retry?: () => void }) {
  return (
    <div className="h-full w-full grid place-items-center text-center mt-8">
      <div>
        <h1 className="text-indigo-600 font-semibold text-lg lg:text-2xl">
          Error Fetching {message}
        </h1>
        <p className="text-neutral-700">Try again later</p>
        <button
          // onClick={retry}
          className="text-sm border border-gray-300 hover:border-gray-800 bg-indigo-100 py-2 px-4 cursor-pointer rounded mt-4"
        >
          Retry Now
        </button>
      </div>
    </div>
  );
}

export default ErrorFetching;
