"use client";
import { Send, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ProductTypes } from "@/models/types";
import { LoadingBTN } from "@/dashboard-components/index";
import { dashboardProvider } from "@/providers/dashboard-provider";
import Image from "next/image";
import { ProductSchema, ProductSchemaType } from "@/schemas/productsSchema";
import { place_holder_image } from "@/assets/photos";
import { CATEGORIES, SUB_CATEGORIES } from "@/assets/data";

interface ProductFormType extends ProductSchemaType {
  photos: File[];
}
function ProductForm({
  closeForm,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  const postProduct = async (data: ProductFormType): Promise<ProductTypes> => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("allergies", data.allergies);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("rating", data.rating.toString());
      formData.append("subCategory", data.subCategory);
      if (data.photos && Array.isArray(data.photos)) {
        data.photos.forEach((photo, index) => {
          if (photo) {
            formData.append("photos", photo); // use "photos[]" so backend knows it's an array
          }
        });
      }

      const response = await fetch(
        `${baseUrl}/api/products/create-single-product`,
        {
          method: "POST",
          body: formData, // 👈 send FormData object
        }
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (ex) {
      if (ex instanceof Error) {
        return { success: false, message: ex.message, data: [] };
      }
      return {
        success: false,
        message: `Error occoured in Posting Product`,
        data: [],
      };
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      setSuccessMessage("Product created successfully.");
      dashboardProvider.invalidateQueries({ queryKey: ["kitchen-products"] });
      reset();
    },
    onError: () => {
      setErrorMessage("Faild to create Product.");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
  });
  const onSubmit = (formData: ProductSchemaType) => {
    setErrorMessage("");
    setSuccessMessage("");
    if (photos.length === 0) {
      return setErrorMessage("At least one photo is required");
    }
    const data = { ...formData, photos: photos };

    mutate(data);
  };
  function closeProductForm() {
    closeForm(false);
  }
  return (
    <div className=" w-full h-full lg:h-auto overflow-y-auto lg:max-h-[90vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-[90%] lg:w-lg border my-12 border-gray-300 s text-neutral-700  p-4 lg:p-6 text-sm mx-auto rounded-md bg-white mt-12"
      >
        <h1 className="font-semibold text-lg lg:text-2xl text-indigo-800">
          Add Product
        </h1>
        <p className="text-xs text-neutral-500">
          Add a new product using the form below.
        </p>

        <button
          type="button"
          onClick={closeProductForm}
          className="absolute top-4 right-4 rounded cursor-pointer hover:bg-slate-200 bg-slate-100 trans p-1"
        >
          <X size={25} />
        </button>

        {/* Photo 1*/}
        <div className="flex items-center gap-2">
          <div
            title={photos[0] ? "Change photo 1" : "Add photo 1"}
            className="border size-20 mt-8 hover:bg-gray-500 trans rounded-sm border-gray-300 cursor-pointer mb-4"
          >
            <label htmlFor="photo1" className="cursor-pointer">
              <Image
                src={
                  photos[0]
                    ? URL.createObjectURL(photos[0])
                    : place_holder_image
                }
                width={50}
                height={30}
                alt="Employee image"
                className="size-full object-cover"
              />
              <input
                type="file"
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const updatedPhotos = [...photos];
                    updatedPhotos[0] = e.target.files[0]; // use index 0 for photo1
                    setPhotos(updatedPhotos);
                  }
                }}
                id="photo1"
                hidden
                name="photosArray"
              />
            </label>
          </div>

          {/* Photo 2 */}
          <div
            title={photos[1] ? "Change photo 2" : "Add photo 2"}
            className="border size-20 mt-8 hover:bg-gray-500 trans rounded-sm border-gray-300 cursor-pointer mb-4"
          >
            <label htmlFor="photo2" className="cursor-pointer">
              <Image
                src={
                  photos[1]
                    ? URL.createObjectURL(photos[1])
                    : place_holder_image
                }
                width={50}
                height={30}
                alt="Employee image"
                className="size-full object-cover"
              />
              <input
                type="file"
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const updatedPhotos = [...photos];
                    updatedPhotos[1] = e.target.files[0]; // use index 0 for photo1
                    setPhotos(updatedPhotos);
                  }
                }}
                id="photo2"
                hidden
                name="photosArray"
              />
            </label>
          </div>

          {/* Photo 3 */}
          <div
            title={photos[2] ? "Change photo 3" : "Add photo 3"}
            className="border size-20 mt-8 hover:bg-gray-500 trans rounded-sm border-gray-300 cursor-pointer mb-4"
          >
            <label htmlFor="photo3" className="cursor-pointer">
              <Image
                src={
                  photos[2]
                    ? URL.createObjectURL(photos[2])
                    : place_holder_image
                }
                width={50}
                height={30}
                alt="Employee image"
                className="size-full object-cover"
              />
              <input
                type="file"
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const updatedPhotos = [...photos];
                    updatedPhotos[2] = e.target.files[0]; // use index 0 for photo1
                    setPhotos(updatedPhotos);
                  }
                }}
                id="photo3"
                hidden
                name="photosArray"
              />
            </label>
          </div>

          {/* Photo 4 */}
          <div
            title={photos[3] ? "Change photo 4" : "Add photo 4"}
            className="border size-20 mt-8 hover:bg-gray-500 trans rounded-sm border-gray-300 cursor-pointer mb-4"
          >
            <label htmlFor="photo4" className="cursor-pointer">
              <Image
                src={
                  photos[3]
                    ? URL.createObjectURL(photos[3])
                    : place_holder_image
                }
                width={50}
                height={30}
                alt="Employee image"
                className="size-full object-cover"
              />
              <input
                type="file"
                required
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const updatedPhotos = [...photos];
                    updatedPhotos[3] = e.target.files[0]; // use index 0 for photo1
                    setPhotos(updatedPhotos);
                  }
                }}
                id="photo4"
                hidden
                name="photosArray"
              />
            </label>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="name" className="block m-1 ">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Sweet cakes"
            {...register("name", { required: true })}
            className="w-full border border-gray-300 py-2 px-4 rounded"
          />
          {errors.name && (
            <p className="text-pink-400">{errors.name.message}</p>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-1/2">
            <label htmlFor="category" className="block m-1 ">
              Category
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full border border-gray-300 py-2 px-4 rounded"
            >
              <option value="">Please select category</option>
              {CATEGORIES.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-pink-400 ">{errors.category.message}</p>
            )}
          </div>{" "}
          <div className="w-1/2">
            <label htmlFor="subCategory" className="block m-1 ">
              Sub Category
            </label>
            <select
              {...register("subCategory", { required: true })}
              className="w-full border border-gray-300 py-2 px-4 rounded"
            >
              <option value="">Please select sub category</option>
              {SUB_CATEGORIES.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.subCategory && (
              <p className="text-pink-400 ">{errors.subCategory.message}</p>
            )}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-1/2">
            <label htmlFor="rating" className="block m-1 ">
              Rating
            </label>
            <input
              type="number"
              placeholder="4.5"
              {...register("rating", { required: true, valueAsNumber: true })}
              className="w-full border border-gray-300 py-2 px-4 rounded"
            />
            {errors.rating && (
              <p className="text-pink-400 ">{errors.rating.message}</p>
            )}
          </div>{" "}
          <div className="w-1/2">
            <label htmlFor="price" className="block m-1 ">
              Price
            </label>
            <input
              type="number"
              placeholder="5000"
              {...register("price", { required: true, valueAsNumber: true })}
              className="w-full border border-gray-300 py-2 px-4 rounded"
            />
            {errors.price && (
              <p className="text-pink-400 ">{errors.price.message}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="allergies" className="block m-1 ">
            Allergies
          </label>
          <input
            type="text"
            placeholder="Gluten, Wheat, Egg"
            {...register("allergies", { required: true })}
            className="w-full border border-gray-300 py-2 px-4 rounded"
          />
          {errors.allergies && (
            <p className="text-pink-400 ">{errors.allergies.message}</p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block m-1 ">
            Description
          </label>
          <textarea
            rows={3}
            {...register("description", { required: true })}
            placeholder="Cake is made up of Sweet vanilla."
            className="w-full border border-gray-300 py-2 px-4 rounded "
          ></textarea>
          {errors.description && (
            <p className="text-pink-400 ">{errors.description.message}</p>
          )}
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
              <span>Create Product</span>
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

export default ProductForm;
