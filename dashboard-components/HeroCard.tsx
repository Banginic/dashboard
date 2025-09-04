import { LucideProps } from "lucide-react";
import React from "react";

interface PropsTypes {
  title: string;
  amount: number;
  percent: string;
  interval: string;
  color: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  Graph: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}
function HeroCard({
  title,
  amount,
  percent,
  interval,
  Icon,
  color,
  Graph,
}: PropsTypes) {
  return (
    <div className="">
      <article className="border border-gray-300 shadow-indigo-100 hover:shadow-indigo-200 p-6 shadow-md rounded-lg  lg:w-72 2xl:w-sm mx-auto">
        <div className="flex justify-between items-center text-neutral-600">
          <h1 className="font-semibold  text-sm">{title}</h1>
          <div className="size-8 rounded-full bg-indigo-100 grid place-items-center">
            <Icon className="size-4 text-indigo-400 " />
          </div>
        </div>
        <p className="font-semibold text text-2xl lg:text-4xl mt-1 text-neutral-700">
          {amount}
        </p>
        <div className="text-xs flex gap-1 mt-1 items-center text-neutral-700 ">
          <Graph className="size-3 " color={color} />
          <span className={`font-semibold text-${color}-600`}>{percent}</span>
          <span className="text-neutral-600 ">{interval}</span>
        </div>
      </article>
    </div>
  );
}

export default HeroCard;
