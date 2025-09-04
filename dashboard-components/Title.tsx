import React from "react";

function Title({ text1, text2 = "" }: { text1: string; text2?: string }) {
  return (
    <h1 className="text-xl lg:text-2xl 2xl:lg:text-3xl font-bold text-pink-700 text-center">
      {text1} {text2}
    </h1>
  );
}

export default Title;
