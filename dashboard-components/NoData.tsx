import { Frown } from "lucide-react";
import React from "react";
import Image from "next/image";
import { black_message } from "@/assets/photos";

function NoData({ message }: { message: string }) {
  return (
    <section className="grid place-items-center mt-8 mx-auto rounded-md bg-white/20 p-6 border-pink-100 w-80">
     
      <div className="text-center ">
        <div className="text-6xl mb-4 opacity-30">🔍</div>
        <h3 className="text-2xl font-bold text-neutral-600 mb-2">
        {message}
        </h3>
        <p className="text-neutral-500 mb-6">
          Try adjusting your internet or try again later
        </p>
        <button className="py-2 px-4 rounded bg-pink-500 hover:bg-pink-600 trans text-pink-50 cursor-pointer" onClick={() => {}}>Try Again</button>
      </div>
    </section>
  );
}

export default NoData;
