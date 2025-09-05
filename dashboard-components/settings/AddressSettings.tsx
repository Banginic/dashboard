"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import React from "react";
import { MapForm } from "@/dashboard-components/index";
import Link from "next/link";

function AddressSettings() {
  return (
    <div className="border p-4 rounded-md  w-[95%] max-w-2xl mx-auto">
      <h2 className="font-semibold text-lg lg:text-xl mb-4">
        Address and Location
      </h2>
      <div className="flex gap-4 text-foreground/70">
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Country</span>
          <Input value={"Cameroon"} type="text" className="text-xs" />
        </p>
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>State / Region</span>
          <Input value={"Littoral"} type="text" className="text-xs" />
        </p>
      </div>
      <div className="flex gap-4 text-foreground/70 mt-4">
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Town / City</span>
          <Input value={"Douala"} type="text" className="text-xs" />
        </p>
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Address</span>
          <Input
            value={"12 str Sodiko - Bonaberi"}
            type="text"
            className="text-xs"
          />
        </p>
      </div>
      <div className="flex gap-4 text-foreground/70 mt-4">
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Currency</span>
          <Input value={"$"} type="text" className="text-xs" />
        </p>
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Language</span>
          <Input
            value={"English (United States)"}
            type="text"
            className="text-xs"
          />
        </p>
      </div>
      <Link
        href={"/dashboard/map"}
        className="mt-4 w-full cursor-pointer border hover:bg-secondary text-secondary-foreground/70 py-2 text-sm rounded-md px-4 text-start flex gap-2 items-center"
      >
        <MapPin size={16} />
        <span>Set / Update map</span>
      </Link>
      <Button className="mt-8 text-sm bg-foreground/70 text-background">
        Save
      </Button>
    </div>
  );
}

export default AddressSettings;
