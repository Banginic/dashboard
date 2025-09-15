"use client";
import { Send, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EmployeeTypes } from "@/models/types";
import { LoadingBTN } from "@/admin-components/index";
import { adminProvider } from "@/providers/admin-provider";
import { EmployeeSchema, EmployeeSchemaType } from "@/schemas/employeeSchema";
import Image from "next/image";
import { place_holder_image } from "@/assets/photos";
import { toast } from "react-toastify";
import { usePost } from "@/hooks/usePost";

interface FormDataType extends EmployeeSchemaType {
  photo: File;
}

function EmployeeForm({
  closeForm,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState<null | File>(null);
  function closeFormHandler() {
    closeForm(false);
  }

  const postNews = async (formData: FormDataType): Promise<EmployeeTypes> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("position", formData.position);
      data.append("qualification", formData.qualification);
      data.append("bio", formData.bio);
      data.append("photo", formData.photo);
  

      const postDetails = {
        endpoint: "/employees/create-single-employee",
        method: "POST", 
        title: "employee",
        body: data, 
      };
     const result = await usePost<EmployeeTypes>(postDetails);
      return result;
    } catch (ex) {
      if (ex instanceof Error) {
        return { success: false, message: ex.message, data: [] };
      }
      return {
        success: false,
        message: `Error occoured in Posting Employee`,
        data: [],
      };
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: postNews,
    mutationKey: [`admin-employees`, 'create'],
    onSuccess: () => {
      toast.success("Employee created successfully");
      adminProvider.invalidateQueries({ queryKey: ["admin-employees"] });
      reset();
      setPhoto(null);
    },
    onError: () => {
      setErrorMessage("Faild to hire employee.");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeSchemaType>({
    resolver: zodResolver(EmployeeSchema),
  });
  const onSubmit = (formData: EmployeeSchemaType) => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!photo) {
      return setErrorMessage("Photo is Required.");
    }
    const data = { ...formData, photo };
    mutate(data); //
  };

  return (
    <div className=" w-full h-full lg:h-auto overflow-y-auto lg:max-h-[90vh]  rounded-md ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-[95%] lg:w-lg h-full  border my-12 border-gray-300 shadow-indigo-200 text-neutral-700  p-6  text-sm mx-auto rounded-md bg-white "
      >
        <h1 className="font-semibold text-lg lg:text-2xl">Hire an Employee</h1>
        <p className="text-sm text-neutral-600">
          Add new employee using the form below.
        </p>

        <button
          type="button"
          onClick={closeFormHandler}
          className="absolute top-4 right-4 rounded cursor-pointer hover:bg-slate-200 bg-slate-100 trans p-1"
        >
          <X size={25} />
        </button>

        {/* Photo */}

        <div>
          <div
            title="Add Photo"
            className=" mt-6 overflow-hidden  trans rounded-sm w-60 h-50 border border-gray-300 shadow grid place-items-center  mx-auto cursor-pointer "
          >
            <label
              htmlFor="photo"
              className="cursor-pointer size-full  overflow-hidden"
            >
              <Image
                width={100}
                height={50}
                src={photo ? URL.createObjectURL(photo) : place_holder_image}
                alt="Employee photos"
                className="size-full "
              />

              <input
                type="file"
                id="photo"
                accept="image/*"
                name={"photo"}
                hidden
                onChange={(e) => {
                  setPhoto(e.target.files && e.target.files[0]);
                }}
              />
            </label>
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="name" className="block m-1 ">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Mary Jones"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 py-2 px-4 rounded"
          />
          {errors.name && (
            <p className="text-pink-400">{errors.name.message}</p>
          )}
        </div>

        <div className="mt-4 flex items-center  gap-2">
          <div className="w-1/2">
            <label htmlFor="position" className="block m-1 ">
              Position
            </label>
            <input
              type="text"
              placeholder="Manager"
              {...register("position", { required: true })}
              className="w-full border border-gray-300 py-2 px-4 rounded"
            />
            {errors.position && (
              <p className="text-pink-400 ">{errors.position.message}</p>
            )}
          </div>{" "}
          <div className="w-1/2">
            <label htmlFor="qualification" className="block m-1 ">
              Qualification
            </label>
            <input
              type="text"
              placeholder="Bsc. Business admin"
              {...register("qualification", { required: true })}
              className="w-full border border-gray-300 py-2 px-4 rounded"
            />
            {errors.qualification && (
              <p className="text-pink-400 ">{errors.qualification.message}</p>
            )}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-1/2">
            <label htmlFor="subject" className="block m-1 ">
              Email
            </label>
            <input
              type="text"
              placeholder="example@email.com"
              {...register("email", { required: true })}
              className="w-full border border-gray-300 py-2 px-4 rounded"
            />
            {errors.email && (
              <p className="text-pink-400 ">{errors.email.message}</p>
            )}
          </div>{" "}
          <div className="w-1/2">
            <label htmlFor="phone" className="block m-1 ">
              Phone
            </label>
            <input
              type="text"
              placeholder="+237 671 499 449"
              {...register("phone", { required: true })}
              className="w-full border border-gray-300 py-2 px-4 rounded"
            />
            {errors.phone && (
              <p className="text-pink-400 ">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="subject" className="block m-1 ">
            Bio
          </label>
          <textarea
            rows={3}
            {...register("bio", { required: true })}
            placeholder="Enter the employee's bio."
            className="w-full border border-gray-300 py-2 px-4 rounded "
          ></textarea>
          {errors.bio && <p className="text-pink-400 ">{errors.bio.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full bg-indigo-600 items-center justify-center text-indigo-100 flex cursor-pointer hover:bg-indigo-500 disabled:bg-gray-400 trans rounded  py-2 px-4  "
        >
          {isPending ? (
            <LoadingBTN message="Creating..." />
          ) : (
            <div className="flex items-center gap-2 mx-auto">
              <Send size={18} />
              <span>Create Employee</span>
            </div>
          )}
        </button>
        {successMessage && !isPending && (
          <p className="text-green-500 text-center my-1">{successMessage}</p>
        )}
        {errorMessage && !isPending && (
          <p className="text-pink-400 text-center my-1">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default EmployeeForm;
