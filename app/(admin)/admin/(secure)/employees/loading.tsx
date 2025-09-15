import { Title } from "@/admin-components/index";
import React from "react";

function MessageCardSkeleton() {
  const myArray = [1, 2, 3];
  return (
    <section className="mx-auto mt-8 w-[95%] max-w-3xl">
      <div className="mb-12 lg:mb-8">
        <Title text1="Employees" />
      </div>
      <div className="space-y-2 lg:space-y-3   ">
        {myArray.map((item) => (
          <div
            key={item}
            className=" rouded p-4 lg:p-6 bg-gray-300 flex items-center justify-between rounded"
          >
            <div>
              <p className="h-3 animate-pulse lg:h-4 bg-gray-200 w-16"></p>
              <p className="h-3 animate-pulse lg:h-4 bg-gray-200 w-24 mt-2"></p>
            </div>
            <div>
              <p className="h-3 animate-pulse lg:h-4 bg-gray-200 w-14"></p>
              <p className="h-3 animate-pulse lg:h-4 bg-gray-200 w-20 mt-2"></p>
            </div>
            <p className="h-3 lg:h-4 animate-pulse bg-gray-200 w-20 mt-2"></p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MessageCardSkeleton;
