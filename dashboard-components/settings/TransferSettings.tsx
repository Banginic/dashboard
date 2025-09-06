import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, MapPin } from "lucide-react";
import React from "react";

function TransferSettings({ projectId }: { projectId: string  }) {
  return (
    <div className="border p-4 rounded-md  w-[95%] max-w-2xl mx-auto">
      <h2 className="font-semibold text-lg lg:text-xl mb-4">
        Transfer Project
      </h2>
      <div className="text-sm text-foreground/70">
        <p>
          You can only transfer projects to an organization you are a member of.
          Transfers are instant, with no downtime.
        </p>
     
      </div>

      <Button className="mt-8 text-sm bg-secondary text-secondary-foreground/40 cursor-not-allowed">
        Transfer Project
      </Button>
    </div>
  );
}

export default TransferSettings;
