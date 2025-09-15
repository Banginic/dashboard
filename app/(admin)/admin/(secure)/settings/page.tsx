import {
  ProfileSettings,
  Title,
  ContactSettings,
  AddressSettings,
  TransferSettings,
  DeleteSettings,
} from "@/admin-components/index";
import { useFetch } from "@/hooks/useFetch";
import { ProfileInfoTypes } from "@/models/settings";
import React from "react";

async function Settings() {
  const fetchDetails = {
    endpoint: "/settings/project-informations",
    method: "GET",
    title: "project info",
  };
  const data = await useFetch<ProfileInfoTypes>(fetchDetails);

  return (
    <section className="bg-background text-foreground min-h-[88dvh] py-8 px-2">
      <Title text1="Settings" />
      <div className="space-y-6 mt-6 lg:mt-8">
        <ProfileSettings />
        <>
          {data?.data?.[0] && data.data.length > 0 && (
            <>
              <ContactSettings projectId={data.data[0].id} />
              <AddressSettings projectId={data.data[0].id} />
              <TransferSettings projectId={data.data[0].id} />
              <DeleteSettings projectId={data.data[0].id} />
            </>
          )}
        </>
      </div>
    </section>
  );
}

export default Settings;
