"use client";
import { EmployeeType, EmployeeTypes } from "@/models/types";
import { Check, LoaderCircle, Trash, X } from "lucide-react";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "react-toastify";
import { adminProvider } from "@/providers/admin-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";

function EmployeeDetails({ employee }: { employee: EmployeeType }) {
  const router = useRouter();
  const { id, name, position, photo, email, bio, phone, isActive, createdAt } =
    employee;

  const updateDetails = {
    endpoint: `/employees/update-active-employee?employee_id=${id}`,
    method: "PUT",
    title: "employee",
  };
  const deleteDetails = {
    endpoint: `/employees/delete-single-employee?employee_id=${id}`,
    method: "DELETE",
    title: "employee",
  };

  const { mutate: updateEmployee, isPending: pendingUpdate } = useMutation({
    mutationFn: () => useFetch<EmployeeTypes>(updateDetails),
    mutationKey: [`admin-employees`, 'update', id],
    onSuccess: () => {
      toast.success("Employee updated");
      adminProvider.invalidateQueries({
        queryKey: [`admin-employee-${id}`],
      });
      return;
    },
    onError: () => toast.error("Error updating employee"),
  });
  const { mutate: deleteEmpoyee, isPending: pendingDelete } = useMutation({
    mutationFn: () => useFetch<EmployeeTypes>(deleteDetails),
    mutationKey: [`admin-employees`, 'delete', id],
    onSuccess: () => {
      toast.success("Employee deleted");
      adminProvider.invalidateQueries({
        queryKey: [`admin-employees`],
      });
      router.push("/admin/employees");
      return;
    },
    onError: () => toast.error("Error deleting employee"),
  });

  function handleActiveEmployee() {
    updateEmployee();
  }
  function handleDeleteEmployee() {
    deleteEmpoyee();
  }
  return (
    <article className="mt-12 border border-gray-300 rounded-lg p-6 lg:p-8 max-w-3xl mx-auto">
      <section>
        {/* Image */}
        <div className="flex items-center justify-between">
          <div className="h-32 w-32 overflow-hidden rounded-md bg-gray-300">
            <Image
              src={photo}
              width={400}
              height={400}
              alt={` Employee ${name}`}
            />
          </div>
          <p className="text-green-500 text-sm">{isActive ? "Active" : ""}</p>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Employee ID</span>
            <span className="text-pink-400">{id.slice(28)}</span>
          </div>
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Hired Date</span>
            <span className=" text-yellow-700 text-sm font-semibold">
              {new Date(createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Name</span>
            <span className="text-[16px] font-semibold">{name}</span>
          </div>
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Positon</span>
            <span>{position}</span>
          </div>
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Phone</span>
            <span>{phone}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Email</span>
            <span className="text-blue-600">{email}</span>
          </div>
          <div className="flex flex-col text-xs lg:text-sm  mt-2">
            <span className="text-neutral-600">Bio</span>
            <span className="text-indigo-600 bg-gray-200 rounded p-4 mt-1 min-h-20">
              {bio}
            </span>
          </div>
        </div>
      </section>

      {/* Button */}
      <div className="flex flex-wrap gap-4 mt-8">
        <button
          onClick={handleActiveEmployee}
          disabled={pendingUpdate}
          className={`text-sm disabled:bg-gray-300 disabled:hover:gray-300 ${
            isActive
              ? "bg-yellow-200 hover:bg-yellow-300 text-yellow-800 "
              : "bg-green-200 hover:bg-green-300 text-green-800 "
          } py-2 px-4 rounded cursor-pointer`}
        >
          {pendingUpdate ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" size={18} />
              <span className="animate-pulse">Updating...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>{isActive ? <X size={18} /> : <Check size={18} />}</span>
              <span>{isActive ? "Off duty mode" : "On duty mode"}</span>
            </div>
          )}
        </button>
        <button
          onClick={handleDeleteEmployee}
          disabled={pendingDelete}
          className="text-sm disabled:bg-gray-300 disabled:hover:gray-300 bg-red-200 hover:bg-red-300 text-red-800 py-2 px-4 rounded cursor-pointer"
        >
          {pendingDelete ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="animate-spin" size={18} />
              <span className="animate-pulse">Deleting...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Trash size={18} />
              <span>Delete</span>
            </div>
          )}
        </button>
      </div>
    </article>
  );
}

export default EmployeeDetails;
