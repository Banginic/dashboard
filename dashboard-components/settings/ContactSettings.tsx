import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import React from "react";

function ContactSettings() {
  return (
    <div className="border p-4 rounded-md  w-[95%] max-w-2xl mx-auto">
      <h2 className="font-semibold text-lg lg:text-xl mb-4">Contact Details</h2>
      <div className="flex gap-4 text-foreground/70">
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Phone number <span className="text-xs  text-muted-foreground">(No spaces)</span></span>
          <Input value={"+237653775159"} type="text"  className="text-xs"/>
        </p>
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Email</span>
          <Input value={"example@email.com"} type="text" className="text-xs"/>
        </p>
      </div>
      <div className="flex gap-4 text-foreground/70 mt-4">
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>WhatsApp <span className="text-xs  text-muted-foreground">(No spaces)</span></span>
          <Input value={"+237653775159"} type="text" className="text-xs" />
        </p>
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Facebook</span>
          <Input
            value={"https://facebook/@username"}
            type="text"
            className="text-xs"
          />
        </p>
      </div>
      <div className="flex gap-4 text-foreground/70 mt-4">
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Instagram</span>
          <Input 
          value={"https://instagram/@username"}
          type="text" className="text-xs" />
        </p>
        <p className="flex flex-col gap-1 text-sm w-1/2">
          <span>Tiktok</span>
          <Input
            value={"https://tiktok/@username"}
            type="text"
            className="text-xs"
          />
        </p>
      </div>

      <Button className="mt-8 text-sm bg-foreground/70 text-background">
        Save
      </Button>
    </div>
  );
}

export default ContactSettings;
