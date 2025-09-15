import { Frown } from "lucide-react";
import React from "react";
import Image from "next/image";

function NoData({ message }: { message: string }) {
  return (
    <section className="grid place-items-center mt-8 mx-auto rounded-md bg-secondary/50 p-6 border-accent min-w-80 max-w-sm">
     
      <div className="text-center ">
        <div className="text-6xl mb-4 opacity-30">🔍</div>
        <h3 className="text-2xl font-bold text-secondary-foreground mb-2">
        {message}
        </h3>
        <p className="text-secondary-foreground/70 mb-6">
          Try adjusting your internet or try again later
        </p>
      </div>
    </section>
  );
}

export default NoData;
