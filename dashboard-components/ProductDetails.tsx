import { dashboardProvider } from "@/providers/dashboard-provider";
import { useFetch } from "@/hooks/useFetch";
import { ProductType, ProductTypes } from "@/models/types";
import { useMutation } from "@tanstack/react-query";
import { Trash, X } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { LoadingBTN } from "@/dashboard-components/index";
import Image from "next/image";

function ProductDetails({ product }: { product: ProductType }) {
  const { id, price, name, category, subCategory, allergies, description, photos } =
    product;

  const updateDetails = {
    endpoint: `/api/products/update-stock-product?product_id=${id}`,
    method: "PATCH",
    title: "Product",
  };
  const deleteDetails = {
    endpoint: `/api/products/delete-single-product?product_id=${id}`,
    method: "DELETE",
    title: "Product",
  };

  const { mutate: updateMutate, isPending: updatePending } = useMutation({
    mutationFn: () => useFetch<ProductTypes>(updateDetails),
    onSuccess: () => {
      toast.success("Product updated successfully.");
      dashboardProvider.invalidateQueries({ queryKey: [`kitchen-products-${id}`] });
    },
    onError: () => {
      toast.error("Error updating product");
    },
  });
  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: () => useFetch<ProductTypes>(deleteDetails),
    onSuccess: () => {
      toast.success("Product deleted successfully.");
      dashboardProvider.invalidateQueries({ queryKey: [`kitchen-products`] });
    },
    onError: () => {
      toast.error("Error deleting product");
    },
  });

  function handleDeleteProduct() {
    deleteMutate;
  }
  function handleUpdateProduct() {
    updateMutate;
  }
  const DISABLE_BTN = updatePending || deletePending;
  return (
    <article className="mt-12 border border-gray-300 rounded-lg p-6 max-w-3xl mx-auto">
      <section>
        <div className="h-16 w-23 rounded-md ">
          <Image src={photos[0]} alt={name } width={80} height={50}/>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Product ID</span>
            <span>{id.slice(28)}</span>
          </div>
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Price</span>
            <span className=" text-green-700 text-[18px] font-semibold">
              {price} xaf
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Products's Name</span>
            <span className="text-[16px] font-semibold">{name}</span>
          </div>
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Category</span>
            <span>{category}</span>
          </div>
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Sub Category</span>
            <span>{subCategory}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-col text-xs lg:text-sm">
            <span className="text-neutral-600">Allergies</span>
            <span className="text-blue-600">{allergies}</span>
          </div>
          <div className="flex flex-col text-xs lg:text-sm  mt-2">
            <span className="text-neutral-600">Description</span>
            <span className="text-indigo-600 bg-gray-200 rounded p-4 mt-1 min-h-20">
              {description}
            </span>
          </div>
        </div>
      </section>

      {/* Button */}
      <div className="flex flex-wrap gap-4 mt-8">
        <button
          disabled={DISABLE_BTN}
          onClick={handleUpdateProduct}
          className="text-sm  bg-yellow-200 hover:bg-yellow-300 text-yellow-800 disabled:bg-gray-400 py-2 px-4 rounded cursor-pointer "
        >
          {updatePending ? (
            <LoadingBTN message="Updating..." />
          ) : (
            <div className="flex items-center gap-2">
              <X size={18} />
              <span>Out of Stock</span>
            </div>
          )}
        </button>
        <button
          disabled={DISABLE_BTN}
          onClick={handleDeleteProduct}
          className="text-sm flex items-center gap-2 bg-red-200 hover:bg-red-300 text-red-800 disabled:bg-gray-400 py-2 px-4 rounded cursor-pointer"
        >
          {deletePending ? (
            <LoadingBTN message="Deleting..." />
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

export default ProductDetails;
