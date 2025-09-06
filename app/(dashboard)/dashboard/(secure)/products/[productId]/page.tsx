"use client";
import {
  Title,
  Back,
  ErrorFetching,
  NoData,
  ProductDetails,
  ProductDetailsSkeleton,
} from "@/dashboard-components/index";
import { useFetch } from "@/hooks/useFetch";
import { ProductTypes } from "@/models/types";
import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";

function ProductDetail({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = use(params);
  const fetchDetails = {
    endpoint: `/products/list-single-product?product_id=${productId}`,
    method: "GET",
    title: "Product details",
  };
  const { data, isPending, refetch, isError } = useQuery({
    queryKey: [`kitchen-products-${productId}`],
    queryFn: () => useFetch<ProductTypes>(fetchDetails),
  });
  console.log(data);
  return (
    <section className="w-[95%] mx-auto py-8 relative">
      <div className="absolute top-10">
        <Back link="/kitchen/products" />
      </div>
      <Title text1="Product" text2="Details" />
      <div className="mt-12">
        {isPending ? (
          <ProductDetailsSkeleton />
        ) : isError || !data?.data || !data ? (
          <ErrorFetching message="Product Details" retry={() => refetch} />
        ) : data.data.length === 0 && data?.message ? (
          <NoData message={data.message} />
        ) : (
          <ProductDetails product={data.data[0]} />
        )}
      </div>
    </section>
  );
}

export default ProductDetail;
