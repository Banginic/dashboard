"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { AddressType, AddressTypes } from "@/models/settings";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { usePost } from "@/hooks/usePost";
import { dashboardProvider } from "@/providers/dashboard-provider";
import { toast } from "react-toastify";
import LoadingBTN from "@/components/LoadingBTN";

function AddressSettings() {
  const fetchDetails = {
    endpoint: "/settings/address",
    method: "GET",
    title: "Address info",
  };

  const placeHolderData: AddressType = {
    id: "000000",
    country: "US",
    state: "New York",
    city: "Enter city",
    address: "street 123",
    currency: "USD",
    language: "English (United States)",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["admin-address-info"],
    queryFn: () => useFetch<AddressTypes>(fetchDetails),
  });

  // Sync state when data loads
  const [addressInfo, setAddressInfo] = useState<AddressType>(placeHolderData);

  useEffect(() => {
    if (data?.data?.[0]) {
      setAddressInfo(data.data[0]);
    }
  }, [data]);

  // ..................Update details..................
  const updateDetails = {
    endpoint: `/settings/address?project_id=${data?.data[0]?.id || '007'}`,
    method: "POST",
    title: "address info",
    body: addressInfo,
  };
  const { mutate, isPending: updatePending } = useMutation({
    mutationKey: ["update-admin-address-info"],
    mutationFn: () => usePost<AddressTypes>(updateDetails),
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
    setAddressInfo({ ...addressInfo, [name]: value });
  }
  const isChanged = data?.data[0] !== addressInfo;

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded-md  w-[95%] max-w-2xl mx-auto"
    >
      <h2 className="font-semibold text-lg lg:text-xl mb-4">
        Address and Location
      </h2>
      <div className="flex flex-col lg:flex-row gap-4 text-foreground/70">
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Country</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : addressInfo.country
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="country"
            onChange={handleChange}
          />
        </p>

        <p className="flex flex-col  gap-1 text-sm w-full lg:w-1/2">
          <span>State / Region</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : addressInfo.state
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="state"
            onChange={handleChange}
          />
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 text-foreground/70 mt-4">
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Town / City</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : addressInfo.city
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="city"
            onChange={handleChange}
          />
        </p>
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Address</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : addressInfo.address
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="address"
            onChange={handleChange}
          />
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 text-foreground/70 mt-4">
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Currency</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : addressInfo.currency
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="currency"
            onChange={handleChange}
          />
        </p>
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Language</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : addressInfo.language
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="language"
            onChange={handleChange}
          />
        </p>
      </div>
      <Link
        href={"/dashboard/map"}
        className="mt-4 w-full text-sm cursor-pointer border hover:bg-secondary text-secondary-foreground/70 py-2 rounded-md px-4 text-start flex gap-2 items-center"
      >
        <MapPin size={16} />
        <span>Set / Update map</span>
      </Link>
      <>
        {isChanged && (!isPending && data?.data )&& (
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

export default AddressSettings;
