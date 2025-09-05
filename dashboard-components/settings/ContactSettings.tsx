'use client';
import LoadingBTN from "@/components/LoadingBTN";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { usePost } from "@/hooks/usePost";
import { ContactType, ContactTypes } from "@/models/settings";
import { dashboardProvider } from "@/providers/dashboard-provider";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

function ContactSettings() {
  const fetchDetails = {
    endpoint: "/settings/contacts",
    method: "GET",
    title: "Address info",
  };

  const placeHolderData: ContactType = {
    id: "000000",
    phone: "+1 (340) 555-1234",
    whatsApp: "+ 1 (340) 555-1234",
    facebook: "https://facebook.com/@username",
    email: "example@email.com",
    instagram: "https://instagram.com/@username",
    tiktok: "https://tiktok.com/@username",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["admin-contact-info"],
    queryFn: () => useFetch<ContactTypes>(fetchDetails),
  });

  // Sync state when data loads
  const [contactInfo, setContactInfo] = useState<ContactType>(placeHolderData);

  useEffect(() => {
    if (data?.data?.[0]) {
      setContactInfo(data?.data[0]);
    }
  }, [data]);

  // ..................Update details..................
  const updateDetails = {
    endpoint: `/settings/contacts?project_id=${data?.data[0]?.id || "007"}`,
    method: "POST",
    title: "address info",
    body: contactInfo,
  };
  const { mutate, isPending: updatePending } = useMutation({
    mutationKey: ["update-admin-contact-info"],
    mutationFn: () => usePost<ContactTypes>(updateDetails),
    onSuccess: (data) => {
      if (data.success) {
        dashboardProvider.invalidateQueries({
          queryKey: ["admin-profile-info"],
        });
        toast.success("Address information updated successfully");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Error updating address information");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate();
  }
  const isLoading = isPending || updatePending;
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value, name } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  }
  const isChanged = data?.data[0] !== contactInfo;

  return (
    <form 
    onSubmit={handleSubmit}
    className="border p-4 rounded-md  w-[95%] max-w-2xl mx-auto">
      <h2 className="font-semibold text-lg lg:text-xl mb-4">Contact Details</h2>
      <div className="flex gap-4 flex-col lg:flex-row text-foreground/70">
        <p className="flex flex-col   gap-1 text-sm w-full lg:w-1/2">
          <span>
            Phone number{" "}
            <span className="text-xs  text-muted-foreground">(No spaces)</span>
          </span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : contactInfo.phone
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="phone"
            onChange={handleChange}
          />
        </p>
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Email</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : contactInfo.email
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="email"
            onChange={handleChange}
          />
        </p>
      </div>
      <div className="flex gap-4 text-foreground/70 flex-col lg:flex-row mt-4">
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>
            WhatsApp{" "}
            <span className="text-xs  text-muted-foreground">(No spaces)</span>
          </span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : contactInfo.whatsApp
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="whatsApp"
            onChange={handleChange}
          />
        </p>
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Facebook</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : contactInfo.facebook
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="facebook"
            onChange={handleChange}
          />
        </p>
      </div>
      <div className="flex gap-4 flex-col lg:flex-row text-foreground/70 mt-4">
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Instagram</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : contactInfo.instagram
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="instagram"
            onChange={handleChange}
          />
        </p>
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Tiktok</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : contactInfo.tiktok
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="tiktok"
            onChange={handleChange}
          />
        </p>
      </div>

      <>
        {isChanged && (!isPending && data?.data ) && isError &&  (
          <Button
            type="submit"
            className="mt-8 text-sm bg-foreground/70 text-background"
          >
            {isLoading ? <LoadingBTN message="Saving..." /> : "Save Changes"}
          </Button>
        )}
      </>
    </form>
  );
}

export default ContactSettings;
