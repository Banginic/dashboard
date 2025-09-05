import Title from "@/dashboard-components/Title";
import React from "react";

function OrderCardSkeleton() {
  const myArray = [1, 2, 3];
  return (
    <section className=" bg-primary mx-auto mt-8 w-[95%] max-w-3xl">
      <div className="mb-12 lg:mb-8">
        <Title text1="Orders" />
      </div>
      <div className="space-y-2 lg:space-y-3   ">
        {myArray.map((item) => (
          <div
            key={item}
            className=" rouded p-4 lg:p-6 bg-secondary-foreground flex items-center justify-between rounded"
          >
            <div>
              <p className="h-3 animate-pulse lg:h-4 bg-secondary-foreground w-16"></p>
              <p className="h-3 animate-pulse lg:h-4 bg-secondary-foreground w-24 mt-2"></p>
            </div>
             <div>
              <p className="h-3 animate-pulse lg:h-4 bg-secondary-foreground w-14"></p>
              <p className="h-3 animate-pulse lg:h-4 bg-secondary-foreground w-20 mt-2"></p>
            </div>
            <p className="h-3 lg:h-4 animate-pulse bg-secondary-foreground w-20 mt-2"></p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderCardSkeleton;
