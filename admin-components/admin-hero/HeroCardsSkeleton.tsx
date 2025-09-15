import React from "react";

function HeroCardsSkeleton() {
  return (
    <div className="">
      <article className="border  bg-foreground/20 p-6 lg:py-7 shadow-md rounded-lg  lg:w-72 2xl:w-sm mx-auto">
        <div className="flex justify-between items-center ">
          <h1 className="h-3 w-18 animate-pulse  bg-foreground/30"></h1>
          <p className="size-5 animate-pulse  rounded bg-foreground/30"></p>
        </div>
        <p className="h-8 animate-pulse  w-8 bg-foreground/30 mt-1 "></p>
        <p className="mt-2 animate-pulse  bg-foreground/30 h-3 w-24 "></p>
      </article>
    </div>
  );
}

export default HeroCardsSkeleton;
