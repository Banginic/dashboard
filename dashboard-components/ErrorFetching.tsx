'use client'
import React from "react";

function ErrorFetching({ retry, message }: { message: string, retry?: () => void }) {
  return (
    <div className="h-full w-full grid place-items-center text-center mt-8">
      <div>
        <h1 className="text-primary-foreground font-semibold text-lg lg:text-2xl">
          Error Fetching {message}
        </h1>
        <p className="text-muted-foreground">Try again later</p>
        <button
          // onClick={retry}
          className="text-sm border border-accent/80 hover:border-accent bg-accent text-accent-foreground py-2 px-4 cursor-pointer rounded mt-4"
        >
          Retry Now
        </button>
      </div>
    </div>
  );
}

export default ErrorFetching;
