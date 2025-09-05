
import {
  ProfileSettings,
  Title,
  ContactSettings,
  AddressSettings,
  TransferSettings,
  DeleteSettings,
} from "@/dashboard-components/index";
import React from "react";

function Settings() {
  return (
    <section className="bg-background text-foreground min-h-[88dvh] py-8 px-2">
      <Title text1="Settings" />
      <div className="space-y-6 mt-6 lg:mt-8">
        <ProfileSettings />
        <ContactSettings />
        <AddressSettings />
        <TransferSettings />
        <DeleteSettings />
      </div>
    </section>
  );
}

export default Settings;
