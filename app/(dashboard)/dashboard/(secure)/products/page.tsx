"use client";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import {
  ErrorFetching,
  NoData,
  ProductCard, ProductCardSkeleton, ProductForm, Title
} from "@/dashboard-components/index";
import { useQuery } from "@tanstack/react-query";
import { ProductTypes } from "@/models/types";


function Products() {
  const [showProductForm, setProductForm] = useState(false);
  const fetchDetails = {
    endpoint: "/products/list-all-products?limit=20",
    method: "GET",
    title: "products",
  };
  const { data, isPending, refetch } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => useFetch<ProductTypes>(fetchDetails),
  });

  function openPharmacyForm() {
    setProductForm(true);
  }
  return (
    <div className="py-8 relative overflow-y-auto">
      <Title text1="Products" />

      <div className="w-[95%] max-w-3xl mx-auto">
        <button
          onClick={openPharmacyForm}
          className="py-2 px-4 rounded bg-indigo-800 mt-12 cursor-pointer hover:opacity-80 text-neutral-100 text-sm flex items-center gap-2"
        >
          <PlusCircle size={18} />
          <span>Add Product</span>
        </button>

        <section className="mt-12 ">
          {isPending ? (
            <ProductCardSkeleton />
          ) : !data?.success || !data ? (
            <ErrorFetching message={"products"} retry={refetch} />
          ) : data?.data.length === 0 && data.message ? (
            <NoData message={data.message} />
          ) : (
            <div className="flex flex-col gap-2 lg:gap-4 w-[95%] max-w-3xl mx-auto">
              {data?.data.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </section>
      </div>

      <>
        {showProductForm && (
          <div className="fixed inset-0 bg-black/80 h-screen border grid place-items-center ovrerflow--scroll">
            <ProductForm closeForm={setProductForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default Products;
