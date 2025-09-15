"use client";

import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  NoData,
  Back,
  Title,
  ErrorFetching,
  EmployeeDetails,
  EmployeeDetailsSkeleton,
} from "@/admin-components/index";
import { useFetch } from "@/hooks/useFetch";
import { EmployeeTypes } from "@/models/types";

function EmployeeDetail({
  params,
}: {
  params: Promise<{ employeeId: string }>;
}) {
  const { employeeId } = use(params);
  const fetchDetails = {
    endpoint: `/employees/list-single-employee?employeeId=${employeeId}`,
    method: "GET",
    title: "employee",
  };
  const { data, isPending, refetch, isError } = useQuery({
    queryKey: [`kitchen-employees-${employeeId}`],
    queryFn: () => useFetch<EmployeeTypes>(fetchDetails),
  });

  return (
    <section className="w-[95%] mx-auto py-8 relative">
      <div className="absolute top-10">
        <Back link="/kitchen/employees" />
      </div>
      <Title text1="Employee" text2="Details" />
      <div className="mt-12">
        {isPending ? (
          <EmployeeDetailsSkeleton />
        ) : isError && !data?.data ? (
          <ErrorFetching message="Employee" retry={() => refetch} />
        ) : data.data.length === 0 && data?.message ? (
          <NoData message={data.message} />
        ) : (
          <EmployeeDetails employee={data.data[0]} />
        )}
      </div>
    </section>
  );
}

export default EmployeeDetail;
