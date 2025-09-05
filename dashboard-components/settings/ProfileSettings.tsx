import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import React from "react";

function ProfileSettings() {
  return (
    <div className="border p-4 rounded-md  w-[95%] max-w-2xl mx-auto">
      <h2 className="font-semibold text-lg lg:text-xl mb-4">
        Site Information
      </h2>
      <div className="flex gap-4 text-foreground/70">
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Project name</span>
          <Input value={"Daisy kitchen"} type="text" />
        </p>
        <div className="flex flex-col gap-1 text-sm w-1/2">
          <span>Project ID</span>
          <div className="flex py-2.5 px-4 border rounded-md  bg-secondary justify-between">
            <span className=" ">122.223223434</span>
            <button title="Copy ID" className="cursor-pointer">
              <Copy size={14} />
            </button>
          </div>
        </div>
      </div>
      <p className="flex flex-col gap-1 text-sm w-full mt-4">
        <span>Tagline</span>
        <Textarea
          value={
            "We Bring you the great website creator in the world , we count on your reviews"
          }
        ></Textarea>
      </p>
      <Button className="mt-8 text-sm bg-foreground/70 text-background">
        Save
      </Button>
    </div>
  );
}

export default ProfileSettings;
