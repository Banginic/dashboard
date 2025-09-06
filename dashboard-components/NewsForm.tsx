"use client";
import { Send, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsSchema, NewsSchemaType } from "@/schemas/newsSchema";
import { useMutation } from "@tanstack/react-query";
import { NewsTypes } from "@/models/types";
import { LoadingBTN } from "@/dashboard-components/index";
import { dashboardProvider } from "@/providers/dashboard-provider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function NewsForm({ setNewsForm }: { setNewsForm: (value: boolean) => void }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function closeNewsForm() {
    setNewsForm(false);
  }

  const postNews = async (formData: NewsSchemaType): Promise<NewsTypes> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
      const response = await fetch(`${baseUrl}/api/v1/news/create-single-news`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      return data;
    } catch (ex) {
      if (ex instanceof Error) {
        return { success: false, message: ex.message, data: [] };
      }
      return {
        success: false,
        message: `Error occoured in Posting News`,
        data: [],
      };
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: postNews,
    onSuccess: () => {
      setSuccessMessage("News created successfully.");
      dashboardProvider.invalidateQueries({ queryKey: ["kitchen-news"] });
      reset();
    },
    onError: () => {
      setErrorMessage("Faild to create news.");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsSchemaType>({
    resolver: zodResolver(NewsSchema),
  });
  const onSubmit = (formData: NewsSchemaType) => {
    setErrorMessage("");
    setSuccessMessage("");
    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative w-[90%] max-w-md border border-muted-foreground shadow-accent text-foreground  p-4 lg:p-6 text-sm mx-auto rounded-md bg-secondary mt-12"
    >
      <h1 className="font-semibold text-lg lg:text-2xl text-foreground">Create News</h1>
      <p className="text-sm text-secondary-foreground/70">
        Create news update using the form below.
      </p>

      <button
        type="button"
        onClick={closeNewsForm}
        className="absolute top-4 right-4 text-background rounded cursor-pointer  bg-foreground/80 hover:bg-foreground trans p-1"
      >
        <X size={25} />
      </button>
      <div className="mt-6">
        <label htmlFor="subject" className="block m-1 ">
          Subject
        </label>
        <Input
          type="text"
          placeholder="Get 20% Discount on your first purchase"
          {...register("subject", { required: true })}
          className="w-full border border-muted-foreground py-2 px-4 rounded"
        />
        {errors.subject && (
          <p className="text-pink-400 ">{errors.subject.message}</p>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor="subject" className="block m-1 ">
          Message
        </label>
        <Textarea
          rows={5}
          {...register("message", { required: true })}
          placeholder="Enter the news body."
          className="w-full border border-muted-foreground py-2 px-4 rounded "
        ></Textarea>
        {errors.message && (
          <p className="text-pink-400 ">{errors.message.message}</p>
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
            <span>Create News</span>
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

export default NewsForm;
