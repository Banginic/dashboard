"use client";

import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { EmployeeTypes } from "@/models/types";
import {
  ErrorFetching,
  NoData,
  EmployeeForm,
  EmployeeSkeleton,
  Title,
  EmployeeCard,
} from "@/dashboard-components/index";
import { useQuery } from "@tanstack/react-query";

function Employees() {
  const [showEmployeeForm, setEmployeeForm] = useState(false);
  const fetchDetails = {
    endpoint: "/api/employees/list-all-employees?limit=10",
    method: "GET",
    title: "employees",
  };
  const { data, isPending, refetch } = useQuery({
    queryKey: [`admin-employees`],
    queryFn: () => useFetch<EmployeeTypes>(fetchDetails),
  });

  function openPharmacyForm() {
    setEmployeeForm(true);
  }
  return (
    <div className="py-8 relative overflow-y-auto">
      <Title text1="Employees" />

      <div className="w-[95%] max-w-3xl mx-auto">
        <button
          onClick={openPharmacyForm}
          className="py-2 px-4 rounded bg-indigo-800 mt-12 cursor-pointer hover:opacity-80 text-neutral-100 text-sm flex items-center gap-2"
        >
          <PlusCircle size={18} />
          <span>Hire Employee</span>
        </button>

        <section className="mt-12 ">
          {isPending ? (
            <EmployeeSkeleton />
          ) : !data?.success || !data ? (
            <ErrorFetching message={"Employees"} retry={refetch} />
          ) : data?.data.length === 0 && data.message ? (
            <NoData message={data.message} />
          ) : (
            <div className="flex flex-col gap-2 lg:gap-4 w-[95%] max-w-3xl mx-auto">
              {data?.data.map((item) => (
                <EmployeeCard key={item.id} employee={item} />
              ))}
            </div>
          )}
        </section>
      </div>

      <>
        {showEmployeeForm && (
          <div className="fixed inset-0 bg-black/80 h-screen border grid place-items-center ovrerflow-scroll">
            <EmployeeForm closeForm={setEmployeeForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default Employees;
