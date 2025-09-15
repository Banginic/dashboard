"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import HeroCardsSkeleton from "../admin-hero/HeroCardsSkeleton";
import HeroCard from "../admin-hero/HeroCard";
import { DollarSignIcon, TrendingDown, TrendingUp } from "lucide-react";
import { ProductTypes } from "@/models/types";
import { useFetch } from "@/hooks/useFetch";

function ProductCounts() {
  const fetchDetails = {
    endpoint: "/products/list-all-products",
    method: "GET",
    title: "products",
  };

  const { data, refetch, isPending, isError } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => useFetch<ProductTypes>(fetchDetails),
  });
  return (
    <div>
      <div>
        {isPending ? (
          <HeroCardsSkeleton />
        ) : !data?.data || !data.success || isError ? (
          <HeroCard
            Icon={DollarSignIcon}
            interval="Network Error"
            percent={"0%"}
            title="Products"
            amount={0}
            Graph={TrendingDown}
            color={"red"}
          />
        ) : (
          <div>
            <HeroCard
              Icon={DollarSignIcon}
              interval={
                data.data.length > 25 ? "Active products" : "Active products"
              }
              percent={data.data.length > 25 ? "+15.2%" : "-2%"}
              title="Active products"
              amount={data.data.length}
              Graph={data.data.length > 25 ? TrendingUp : TrendingDown}
              color={data.data.length > 10 ? "green" : "red"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCounts;
