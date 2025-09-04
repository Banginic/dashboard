import { LoaderCircle } from "lucide-react";
import React from "react";

function Loader() {
  return (
    <div className="h-full w-full grid place-items-center">
      <div className="flex flex-col items-center justify-center">
        <LoaderCircle size={25} className="animate-spin" />
        <p className="text-center lg:text-lg text-neutral-700 font-semibold">
          Loading......
        </p>
      </div>
    </div>
  );
}

export default Loader;
