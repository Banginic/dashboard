"use client";
import { AdminType, AdminTypes } from "@/models/types";
import { Edit, LoaderCircle, Reply, Trash } from "lucide-react";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { dashboardProvider } from "@/providers/dashboard-provider";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { projectDetails } from "@/constants/project-details";

function AdminDetails({ admin }: { admin: AdminType }) {
  const fetchDetails = {
    endpoint: `/admins/delete-single-admin?admin_id=${admin.id}`,
    method: "DELETE",
    title: "Admins",
  };
  const updateDetails = {
    endpoint: `/admins/update-single-admin?admin_id=${admin.id}`,
    method: "PUT",
    title: "Admins",
  };
  const { id, name, email, phone, role, createdAt } = admin;
  const router = useRouter();

  const { mutate: updateMutate, isPending: updatePending } = useMutation({
    mutationFn: () => useFetch<AdminTypes>(updateDetails),
    mutationKey: ["update-admin", admin.id],
    onSuccess: () => {
      toast.success("Admin updated Successfully");
      dashboardProvider.invalidateQueries({
        queryKey: [`${projectDetails.projectName || "dashboard"}-admins`],
      });
      router.push("/dashboard/admin-users");
      return;
    },
    onError: () => {
      toast.warning("Errror Deleting Admin");
    },
  });
  function updateAdmin() {
    updateMutate();
  }
  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: () => useFetch<AdminTypes>(fetchDetails),
    onSuccess: () => {
      toast.success("Message Deleted Successfully");
      dashboardProvider.invalidateQueries({
        queryKey: [`${projectDetails.projectName || "dashboard"}-admins`],
      });
      router.push("/dashboard/admin-users");
      return;
    },
    onError: () => {
      toast.warning("Errror Deleting Admin");
    },
  });
  function deleteAdmin() {
    deleteMutate();
  }

  const COMPLETE_DISABLE = deletePending || updatePending;
  return (
    <article className="mt-12 border relative border-gray-300 rounded-lg p-6 max-w-3xl mx-auto">
      <section>
        <div className="flex justify-between bg-indigo-300 rounded p-4">
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Admin Id</span>
            <span>{id.slice(28)}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Created Date</span>
            <span className=" text-yellow-700">
              {new Date(createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 ml-4">
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Name</span>
            <span className="text-[16px] font-semibold">{name}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Email</span>
            <span>{email}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Phone Number</span>
            <span>{phone}</span>
          </div>
        </div>
        <div className="mt-4 ml-4">
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Role</span>
            <span className="text-blue-600">{role.toUpperCase()}</span>
          </div>
        </div>
      </section>

      {/* Button */}
      <div className="flex gap-4 mt-8 ml-4">
        <button
          disabled={COMPLETE_DISABLE}
          onClick={updateAdmin}
          className="text-sm flex items-center gap-2 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-2 px-4 rounded cursor-pointer"
        >
          {updatePending ? (
            <div className="flex gap-2 items-center">
              <LoaderCircle className="animate-spin" size={18} />
              <span className="animate-pulse">Updating</span>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Edit size={18} />
              <span>
                {role === "admin" ? "Remove as Admin" : "Set as Admin"}
              </span>
            </div>
          )}
        </button>
        <button
          disabled={COMPLETE_DISABLE}
          onClick={deleteAdmin}
          className="text-sm flex items-center gap-2 bg-red-200 hover:bg-red-300 text-red-800 py-2 px-4 rounded cursor-pointer"
        >
          {deletePending ? (
            <div className="flex gap-2 items-center">
              <LoaderCircle className="animate-spin" size={18} />
              <span className="animate-pulse">Deleting</span>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Trash size={18} />
              <span>Delete</span>
            </div>
          )}
        </button>
      </div>
    </article>
  );
}

export default AdminDetails;
