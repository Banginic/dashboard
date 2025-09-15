import React from "react";

function JobCardSkeleton() {
  const myArray = [1, 2, 3];
  return (
    <div className="space-y-2 lg:space-y-3 mt-12">
      {myArray.map((item) => (
        <div
        key={item}
        className=" rouded p-4 lg:p-6 bg-secondary-foreground/20 flex items-center justify-between rounded">
          <div>
            <p className="h-3 animate-pulse lg:h-4 bg-secondary-foreground/30 w-16"></p>
            <p className="h-3 animate-pulse lg:h-4 bg-secondary-foreground/30 w-24 mt-2"></p>
          </div>
          <div>
            <p className="h-3 animate-pulse lg:h-4 bg-secondary-foreground/30 w-14"></p>
            <p className="h-3 animate-pulse lg:h-4 bg-secondary-foreground/30 w-20 mt-2"></p>
          </div>
          <p className="h-3 lg:h-4 animate-pulse bg-secondary-foreground/30 w-20 mt-2"></p>
        </div>
      ))}
    </div>
  );
}

export default JobCardSkeleton;
