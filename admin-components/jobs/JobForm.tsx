"use client";
import { Send, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobSchema, JobSchemaType } from "@/schemas/jobsSchema";
import { useMutation } from "@tanstack/react-query";
import { JobTypes } from "@/models/types";
import { LoadingBTN } from "@/admin-components/index";
import { adminProvider } from "@/providers/admin-provider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePost } from "@/hooks/usePost";

function JobsForm({
  closeForm,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function closeJobsForm() {
    closeForm(false);
  }

  const postJobs = async (formData: JobSchemaType): Promise<JobTypes> => {
    try {
      const postDetails = {
        endpoint: "/jobs/create-single-job",
        method: "POST",
        title: "job",
        body: formData,
      };
      const data = await usePost<JobTypes>(postDetails);
      return data;
    } catch (ex) {
      if (ex instanceof Error) {
        return { success: false, message: ex.message, data: [] };
      }
      return {
        success: false,
        message: `Error occoured in Posting Jobs`,
        data: [],
      };
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: postJobs,
    onSuccess: (data) => {
      if (!data.success) {
        return setErrorMessage("Error Creating Job");
      }
      setSuccessMessage("Jobs created successfully.");
      adminProvider.invalidateQueries({
        queryKey: [`admin-jobs`],
      });
      reset();
    },
    onError: () => {
      setErrorMessage("Faild to create Jobs.");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobSchemaType>({
    resolver: zodResolver(JobSchema),
  });
  const onSubmit = (formData: JobSchemaType) => {
    setErrorMessage("");
    setSuccessMessage("");
    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-[90%] max-w-md border border-muted-foreground shadow-accent text-foreground  p-4 lg:p-6 text-sm mx-auto rounded-md bg-secondary mt-12"
    >
      <h1 className="font-semibold text-lg lg:text-2xl text-foreground">
        Create Job
      </h1>
      <p className="text-sm text-secondary-foreground/70">
        Create new job using the form below.
      </p>

      <button
        type="button"
        onClick={closeJobsForm}
        className="absolute top-4 right-4 text-background rounded cursor-pointer  bg-foreground/80 hover:bg-foreground trans p-1"
      >
        <X size={25} />
      </button>
      <div className="mt-6">
        <label htmlFor="title" className="block m-1 ">
          Job Title
        </label>
        <Input
          type="text"
          placeholder="Manager, Clerk ..."
          {...register("title", { required: true })}
          className="w-full border border-muted-foreground py-2 px-4 rounded"
        />
        {errors.title && (
          <p className="text-pink-400 mt-1">{errors.title.message}</p>
        )}
      </div>
      <div className="mt-6">
        <label htmlFor="location" className="block m-1 ">
          Location
        </label>
        <Input
          type="text"
          placeholder="12 street, New York US"
          {...register("location", { required: true })}
          className="w-full border border-muted-foreground py-2 px-4 rounded"
        />
        {errors.location && (
          <p className="text-pink-400 mt-1">{errors.location.message}</p>
        )}
      </div>
      <div className="mt-6">
        <label htmlFor="latestDate" className="block m-1 ">
          Latest Date
        </label>
        <Input
          type="date"
          placeholder="12 street, New York US"
          {...register("latestDate", { required: true })}
          className="w-full border border-muted-foreground py-2 px-4 rounded"
        />
        {errors.latestDate && (
          <p className="text-pink-400 mt-1">{errors.latestDate.message}</p>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor="description" className="block m-1 ">
          Job Description
        </label>
        <Textarea
          rows={5}
          {...register("description", { required: true })}
          placeholder="Enter the job description."
          className="w-full border border-muted-foreground py-2 px-4 rounded "
        ></Textarea>
        {errors.description && (
          <p className="text-pink-400 mt-1">{errors.description.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full bg-accent items-center justify-center text-accent-foreground flex cursor-pointer hover:scale-x-105 disabled:bg-gray-400 trans rounded  py-2.5 trans px-4  "
      >
        {isPending ? (
          <LoadingBTN message="Sending..." />
        ) : (
          <div className="flex items-center gap-2 mx-auto">
            <Send size={18} />
            <span>Create Job</span>
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
  );
}

export default JobsForm;
