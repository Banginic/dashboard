import { Button } from "@/components/ui/button";
import {  Trash } from "lucide-react";
import React from "react";

function DeleteSettings() {
  return (
    <div className="border border-red-300 p-4 rounded-md  w-[95%] max-w-2xl mx-auto">
      <h2 className="font-semibold text-lg lg:text-xl text-red-400 mb-4">Delete Project</h2>
      <div className="text-sm text-foreground/70">
        <p>
         Deleting this Project will also disable your website and erase your data from the database.
        </p>
      </div>

      <Button className="mt-8 text-sm bg-foreground text-background ">
        <div className="flex gap-2 items-center">
          <Trash size={18} />
          <span>Delete Project</span>
        </div>
      </Button>
    </div>
  );
}

export default DeleteSettings;
