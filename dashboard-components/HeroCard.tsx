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
    <div className="  overflow-hidden">
      <article className="bg-secondary-foreground text-secondary border border-sidebar-ring/30 shadow-accent/10 hover:shadow-accent/30 p-6 shadow-md rounded-lg  lg:w-72 2xl:w-sm mx-auto trans">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold  text-sm">{title}</h1>
          <div className="size-8 rounded-full bg-accent grid place-items-center">
            <Icon className="size-4 text-accent-foreground " />
          </div>
        </div>
        <p className="font-semibold text text-2xl lg:text-4xl mt-1">
          {amount}
        </p>
        <div className="text-xs flex gap-1 mt-1 items-center text-muted-foreground ">
          <Graph className="size-3 " color={color} />
          <span className={`font-semibold text-${color}-600`}>{percent}</span>
          <span className="text-muted-foreground ">{interval}</span>
        </div>
      </article>
    </div>
  );
}

export default HeroCard;
