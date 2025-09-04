import React from "react";
import Image from "next/image";
import { place_holder_image } from "@/assets/photos";
import { Title } from "@/dashboard-components/index";

function page() {
  const myArray = [1, 2, 3, 4];
  return (
    <div className="py-8">
      <Title text1="Products" />
      <div className="mt-12 flex flex-col gap-2 lg:gap-4 w-[95%] max-w-3xl mx-auto">
        {myArray.map((number) => (
          <div
            key={number}
            className="p-2 border bg-gray-300  w-[95%] mx-auto max-w-3xl border-gray-300  flex justify-between text-sm lg:text-[16px] items-center rounded-lg "
          >
            <div className="  bg-gray-400 rounded-md animate-pulse over ">
              <Image
              width={150}
              height={100}
              className="object-cover rounded-md"
              alt="place holder image"
              src={place_holder_image}/>
              
            </div>
            <div className=" ">
              <p className="h-3 w-23 animate-pulse bg-gray-200"></p>
              <p className="h-3 w-18 animate-pulse bg-gray-200 mt-1"></p>
            </div>

            <div className="flex flex-col gap-">
              <p className="text-[18px] font-semibold animate-pulse text-green-600">
                0.0 xaf
              </p>
              <p className="text-xs lg:text-sm animate-pulse text-yellow-600">
                {new Date().toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
