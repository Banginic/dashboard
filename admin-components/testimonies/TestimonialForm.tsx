"use client";
import { Send, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LoadingBTN } from "@/admin-components/index";
import { adminProvider } from "@/providers/admin-provider";
import Image from "next/image";
import { place_holder_image } from "@/assets/photos";
import {
  TestimonialSchemaType,
  TestimonialSchema,
} from "@/schemas/testimoniesSchema";
import { TestimonialTypes } from "@/models/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePost } from "@/hooks/usePost";

interface FormDataType extends TestimonialSchemaType {
  photo: File;
}

function TestimonialForm({
  closeForm,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState<null | File>(null);

  function closeTestimonialForm() {
    closeForm(false);
  }
  const postTestimony = async (
    formData: FormDataType
  ): Promise<TestimonialTypes> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
      const data = new FormData();
      data.append("name", formData.name);
      data.append("project", formData.title);
      data.append("title", formData.title);
      data.append("rating", String(formData.rating));
      data.append("message", formData.message);
      data.append("photo", formData.photo);


      const postDetails = {
        endpoint: "/testimonials/create-single-testimony",
        method: "POST",
        title: "testimony",
        body: data,
      }
     const result = await usePost<TestimonialTypes>(postDetails);
      return result;
    } catch (ex) {
      if (ex instanceof Error) {
        return { success: false, message: ex.message, data: [] };
      }
      return {
        success: false,
        message: `Error occoured in posting Testimony`,
        data: [],
      };
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: postTestimony,
    onSuccess: (data) => {
      if (!data.success) {
        setErrorMessage("Error Creating Testimony. Try Again");
        return;
      }
      setSuccessMessage("Testimony created successfully.");
      adminProvider.invalidateQueries({ queryKey: ["admin-testimonies"] });
      setPhoto(null);
      reset();
    },
    onError: () => {
      setErrorMessage("Faild to create Testimony.");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestimonialSchemaType>({
    resolver: zodResolver(TestimonialSchema),
  });
  const onSubmit = (formData: TestimonialSchemaType) => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!photo) {
      return setErrorMessage("Photo is Required.");
    }
    const data = { ...formData, photo };
    mutate(data); //
  };

  return (
    <div className=" w-full h-full lg:h-auto overflow-y-auto lg:max-h-[90vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-[95%] lg:w-lg border my-12 shadow-accent text-foreground p-6 lg:p-6 text-sm mx-auto rounded-md bg-secondary mt-12"
      >
        <h1 className="font-semibold text-lg lg:text-2xl text-foreground">
          Create a Testimony
        </h1>
        <p className="text-sm text-secondary-foreground/70">
          Add new Testimony using the form below.
        </p>

        <button
          onClick={closeTestimonialForm}
          type="button"
          className="absolute top-4 right-4 rounded cursor-pointer hover:bg-foreground bg-foreground/70 trans p-1 text-background"
        >
          <X size={25} />
        </button>

        {/* Photo */}

        <div>
          <div
            title="Add Photo"
            className=" mt-6 overflow-hidden trans rounded-sm w-[70%] h-[40%] border shadow grid place-items-center  mx-auto cursor-pointer "
          >
            <label
              htmlFor="photo"
              className="cursor-pointer size-full  overflow-hidden"
            >
              <Image
                width={200}
                height={50}
                src={photo ? URL.createObjectURL(photo) : place_holder_image}
                alt="Testimony photos"
                className="size-full object-cover  "
              />
              <input
                type="file"
                required
                onChange={(e) =>
                  setPhoto(
                    e.target.files && e.target.files[0]
                      ? e.target.files[0]
                      : null
                  )
                }
                id="photo"
                hidden
                name="photo"
              />
            </label>
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="name" className="block m-1 ">
            Full Name
          </label>
          <Input
            type="text"
            placeholder="Mary Jones"
            {...register("name", { required: true })}
            className="w-full border border-muted-foreground py-2 px-4 rounded"
          />
          {errors.name && (
            <p className="text-pink-400">{errors.name.message}</p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="w-1/2">
            <label htmlFor="project" className="block m-1 ">
              Title
            </label>
            <Input
              type="text"
              placeholder="CEO of Tradex"
              {...register("title", { required: true })}
              className="w-full border border-muted-foreground py-2 px-4 rounded"
            />
            {errors.title && (
              <p className="text-pink-400 ">{errors.title.message}</p>
            )}
          </div>{" "}
          <div className="w-1/2">
            <label htmlFor="rating" className="block m-1 ">
              Rating
            </label>
            <Input
              type="number"
              placeholder="4.5"
              {...register("rating", { required: true, valueAsNumber: true })}
              className="w-full border border-muted-foreground py-2 px-4 rounded"
            />
            {errors.rating && (
              <p className="text-pink-400 ">{errors.rating.message}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="subject" className="block m-1 ">
            Bio
          </label>
          <Textarea
            rows={3}
            {...register("message", { required: true })}
            placeholder="We strongly recommend this company."
            className="w-full border border-muted-foreground py-2 px-4 rounded "
          ></Textarea>
          {errors.message && (
            <p className="text-pink-400 ">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-6 w-full bg-accent items-center justify-center text-accent-foreground flex cursor-pointer hover:scale-x-105 disabled:bg-gray-400 trans rounded  py-2.5 px-4  "
        >
          {isPending ? (
            <LoadingBTN message="Creating..." />
          ) : (
            <div className="flex items-center gap-2 mx-auto">
              <Send size={18} />
              <span>Create Testimony</span>
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

export default TestimonialForm;
