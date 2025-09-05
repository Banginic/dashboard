"use client";
import LoadingBTN from "@/components/LoadingBTN";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/useFetch";
import { usePost } from "@/hooks/usePost";
import { ProfileInfoType, ProfileInfoTypes } from "@/models/settings";
import { dashboardProvider } from "@/providers/dashboard-provider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Copy, LoaderCircle } from "lucide-react";
import React, { useState, useEffect, ChangeEvent } from "react";
import { toast } from "react-toastify";

function ProfileSettings() {
  const fetchDetails = {
    endpoint: "/settings/project-informations",
    method: "GET",
    title: "project info",
  };

  const placeHolderData: ProfileInfoType = {
    projectName: "Enter your project name",
    tagLine: "Your tagline will display on the first page of your website",
    id: "00000000",
    adminId: "00000000",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["admin-profile-info"],
    queryFn: () => useFetch<ProfileInfoTypes>(fetchDetails),
  });

  console.log(data);
  // Sync state when data loads
  const [projectInfo, setProjectInfo] =
    useState<ProfileInfoType>(placeHolderData);

  useEffect(() => {
    if (data?.data?.[0]) {
      setProjectInfo(data.data[0]);
    }
  }, [data]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(projectInfo.id);
      alert("Project ID copied!");
    } catch {
      alert("Failed to copy.");
    }
  };

  // ..................Update details..................
  const updateDetails = {
    endpoint: `/settings/project-informations?project_id=${data?.data[0]?.id}`,
    method: "POST",
    title: "project info",
    body: projectInfo,
  };
  const { mutate, isPending: updatePending } = useMutation({
    mutationKey: ["update-admin-profile-info"],
    mutationFn: () => usePost<ProfileInfoTypes>(updateDetails),
    onSuccess: (data) => {
      if (data.success) {
        dashboardProvider.invalidateQueries({
          queryKey: ["admin-profile-info"],
        });
        toast.success("Project information updated successfully");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Error updating project information");
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
    setProjectInfo({ ...projectInfo, [name]: value });
  }
  const isChanged = data?.data[0] !== projectInfo;
  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded-md w-[95%] lg:w-2xl max-w-3xl mx-auto"
    >
      <h2 className="font-semibold text-lg lg:text-xl mb-4">
        Project Information
      </h2>

      <div className="flex gap-4 flex-col lg:flex-row text-foreground/70">
        <p className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Project name</span>
          <Input
            value={
              isLoading
                ? "Loading..."
                : isError || !data?.success
                ? "Network error"
                : projectInfo.projectName
            }
            className={`text-sm ${isLoading && "animate-pulse"}`}
            type="text"
            name="projectName"
            onChange={handleChange}
          />
        </p>

        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <span>Project ID</span>
          <div className="flex py-2.5 px-4 border rounded-md bg-secondary justify-between">
            <span className={`text-sm ${isLoading && "animate-pulse"}`}>
              {isLoading ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : typeof projectInfo.id === "string" ? (
                projectInfo.id.slice(22)
              ) : (
                "000000 "
              )}
            </span>
            <>
              {isLoading ? '' : (isError || !data?.success) ? (
                "Network error"
              ) : (
                <button
                  type="button"
                  title="Copy ID"
                  onClick={handleCopy}
                  className="cursor-pointer"
                >
                  <Copy size={14} />
                </button>
              )}
            </>
          </div>
        </div>
      </div>

      <p className="flex flex-col text-foreground/70 gap-1 text-sm w-full mt-4">
        <span>Tagline</span>
        <Textarea
          value={
            isLoading
              ? "Loading..."
              : isError || !data?.success
              ? "Network error"
              : projectInfo.tagLine
          }
          name="tagLine"
          className={`text-sm ${isLoading && "animate-pulse"}`}
          onChange={handleChange}
        />
      </p>

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

export default ProfileSettings;
