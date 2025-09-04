import { PERSONAL_DATA } from "@/assets/data";
import { ChefHat } from "lucide-react";
import React from "react";

function Logo({
  textSize,
  logoSize,
  color,
}: {
  textSize: string;
  logoSize: string;
  color?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${color}`}>
      <ChefHat className={`${logoSize}`} />
      <p className={`${textSize} font-bold `}>{PERSONAL_DATA.title}</p>
    </div>
  );
}

export default Logo;
