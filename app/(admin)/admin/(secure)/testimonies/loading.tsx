import { Star } from "lucide-react";
import React from "react";

export default function loading() {
  const myArray = [1, 2, 3, 4];
  return (
    <div className="space-y-4 2xl:space-y-5">
      {myArray.map((item) => (
        <article
          key={item}
          className="border border-gray-300 p-4 bg-gray-100 rounded  w-[95%] text-sm max-w-xl mx-auto "
        >
          <div className="flex justify-between items-center relative">
            {/* Image */}
            <div className="h-23 w-23 rounded overflow-hidden bg-gray-300  "></div>
            <div className="flex flex-col space-y-1 mt-2 animate-pulse">
              <h2 className="bg-neutral-300 rounded h-3 w-32"></h2>
              <p className="bg-neutral-300 rounded h-3 w-20"></p>
              <p className="bg-neutral-300 rounded h-3 w-26 "></p>
            </div>

            <p className="flex items-center gap-1 mb-1 absolute -top-2 right-0 animate-pulse">
              <span>4.5</span>
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
            </p>
          </div>
          <p className="min-h-20 bg-gray-300 animate-pulse rounded p-2 mt-4"></p>
          <button className="py-2 px-4 rounded flex justify-center  mt-2  h-7 animate-pulse w-16 bg-red-200 hover:bg-red-200 cursor-pointer text-red-800">
            <div className="flex gap-2 items-center">
              <span></span>
            </div>
          </button>
        </article>
      ))}
    </div>
  );
}
