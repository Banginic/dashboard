"use client";

import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { AdminTypes } from "@/models/types";
import {
  ErrorFetching,
  NoData,
  AdminUserCardSkeleton,
  Title,
  AdminUserCard,
} from "@/dashboard-components/index";
import { useQuery } from "@tanstack/react-query";
import { projectDetails } from "@/constants/project-details";
import Link from "next/link";

function AdminUsers() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const fetchDetails = {
    endpoint: "/admins/list-all-admins?limit=10",
    method: "GET",
    title: "admins",
  };
  const { data, isPending, refetch } = useQuery({
    queryKey: [`${projectDetails.projectName || 'dashboard'}-admins`],
    queryFn: () => useFetch<AdminTypes>(fetchDetails),
  });


  return (
    <div className="py-8 relative overflow-y-auto">
      <Title text1="ADMIN" text2="USERS" />

      <div className="w-[95%] max-w-3xl mx-auto">
        <Link href={'/dashboard/admin-users/admin-user-form'}
          
          className="py-2 px-4 rounded bg-indigo-800 mt-12 cursor-pointer  hover:opacity-80 text-neutral-100 text-sm inline-flex items-center gap-2"
        >
          <PlusCircle size={18} />
          <span>Add Admin</span>
        </Link>

        <section className="mt-12 ">
          {isPending ? (
            <AdminUserCardSkeleton />
          ) : !data?.success || !data ? (
            <ErrorFetching message={"Admin"} retry={refetch} />
          ) : data?.data.length === 0 && data.message ? (
            <NoData message={data.message} />
          ) : (
            <div className="flex flex-col gap-2 lg:gap-4 w-[95%] max-w-3xl mx-auto">
              {data?.data.map((item) => (
                <AdminUserCard key={item.id} adminUser={item} />
              ))}
            </div>
          )}
        </section>
      </div>

    
    </div>
  );
}

export default AdminUsers;
