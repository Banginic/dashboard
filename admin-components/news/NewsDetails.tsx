"use client";
import React from "react";
import { Check, Trash, X } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@tanstack/react-query";
import { NewsType, NewsTypes } from "@/models/types";
import { toast } from "react-toastify";
import { dashboardProvider } from "@/providers/dashboard-provider";
import { LoadingBTN } from "@/admin-components/index";

function NewsDetails({ news }: { news: NewsType }) {
  const { id, subject, body, createdAt, isActive, updatedAt } = news;

  const deleteDetails = {
    endpoint: `/news/delete-single-news?news_id=${id}`,
    method: "DELETE",
    title: "News",
  };
  const activeDetails = {
    endpoint: `/news/update-active-news?news_id=${id}&current_status=${
      isActive ? "active" : "not-active"
    }`,
    method: "PUT",
    title: "News",
  };

  const { mutate: activeMutate, isPending: activePending } = useMutation({
    mutationFn: () => useFetch<NewsTypes>(activeDetails),
    onSuccess: () => {
      toast.success("News updated successfully");
      dashboardProvider.invalidateQueries({ queryKey: [`kitchen-news`] });
    },
    onError: () => {
      toast.error("Error updating news");
    },
  });
  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: () => useFetch<NewsTypes>(deleteDetails),
    onSuccess: () => {
      toast.success("News deleted successfully");
      dashboardProvider.invalidateQueries({ queryKey: [`kitchen-news`] });
    },
    onError: () => {
      toast.error("Error deleting news");
    },
  });

  function handleActiveNews() {
    activeMutate();
  }
  function handleDeleteNews() {
    deleteMutate();
  }
  const DISABLED_BTN = deletePending || activePending;
  return (
    <div>
      <div className=" flex flex-col gap-4 lg:gap-4 w-[95%]  max-w-3xl mx-auto">
        <article className=" p-4 lg:p-6 bg-secondary border border-secondary-foreground/30 rounded text-foreground ">
          <div className="flex justify-between items-center ml-2 ">
            <div className="flex flex-col text-xs lg:text-sm">
              <span className="text-foreground/70 ">News Id</span>
              <span>{id.slice(22)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col text-[16px] h-8">
                <span className="text-foreground/70 sr-only">Status</span>
                {isActive && <span className="text-green-500 ">Active</span>}
              </div>
              <div className="flex flex-col text-[16px] ">
                <span className="text-foreground/70 sr-only">Date posted</span>
                <span className="text-chart-3">
                  {isActive
                    ? new Date(updatedAt).toLocaleDateString("en-GB")
                    : new Date(createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-[16px]  mt-4 ml-2">
            <span className="text-foreground/70 ">Subject</span>
            <span>{subject}</span>
          </div>
          <div className="flex flex-col text-[16px]  mt-2 bg-background/50 text-secondary-foreground/70 rounded p-2 min-h-15">
            <span className="text-foreground/70 sr-only">body</span>
            <span>{body}</span>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <button
              disabled={DISABLED_BTN}
              onClick={handleActiveNews}
              className={`py-2 px-4 ${
                isActive
                  ? "bg-chart-3/70 hover:bg-chart-3 text-background"
                  : "bg-chart-2 hover:bg-green-400  text-background"
              } hover:opacity-80 trans rounded text-sm cursor-pointer ${
                DISABLED_BTN && "bg-gray-300 text-gray-800"
              }`}
            >
              {isActive ? (
                <>
                  {activePending ? (
                    <LoadingBTN message="Updating..." />
                  ) : (
                    <div className="flex items-center gap-2">
                      <X size={18} />
                      <span>Disactivate</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {activePending ? (
                    <LoadingBTN message="Activating..." />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Check size={18} />
                      <span>Activate</span>
                    </div>
                  )}
                </>
              )}
            </button>
            <button
              disabled={DISABLED_BTN}
              onClick={handleDeleteNews}
              className={`py-2 px-4 bg-destructive  text-white hover:scale-x-105 trans rounded text-sm cursor-pointer  ${
                DISABLED_BTN && "bg-gray-300 text-gray-800"
              }`}
            >
              {deletePending ? (
                <LoadingBTN message="Deleting..." />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Trash size={18} />
                    <span>Delete</span>
                  </div>
                </div>
              )}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default NewsDetails;
