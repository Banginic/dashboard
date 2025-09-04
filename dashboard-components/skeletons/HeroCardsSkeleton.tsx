import React from "react";

function HeroCardsSkeleton() {
  return (
    <div className="">
      <article className="border border-gray-300 bg-gray-300 p-6 lg:py-7 shadow-md rounded-lg  lg:w-72 2xl:w-sm mx-auto">
        <div className="flex justify-between items-center ">
          <h1 className="h-3 w-18 animate-pulse  bg-gray-200"></h1>
          <p className="size-5 animate-pulse  rounded bg-gray-200"></p>
        </div>
        <p className="h-8 animate-pulse  w-8 bg-gray-200 mt-1 "></p>
        <p className="mt-2 animate-pulse  bg-gray-200 h-3 w-24 "></p>
      </article>
    </div>
  );
}

export default HeroCardsSkeleton;
