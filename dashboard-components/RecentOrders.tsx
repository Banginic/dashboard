"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import OrderCardSkeleton from "./skeletons/OrderCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { NoData, ErrorFetching, OrderCard } from "@/dashboard-components/index";
import { OrdersTypes } from "@/models/types";
import { useFetch } from "@/hooks/useFetch";

function RecentOrders() {
  const fetchDetails = {
    endpoint: "/api/orders/list-all-orders?limit=3",
    method: "GET",
    title: "Ordes",
  };
  const { data, refetch, isPending, isError } = useQuery({
    queryKey: ["kitchen-orders"],
    queryFn: () => useFetch<OrdersTypes>(fetchDetails),
  });
  return (
    <section className="mt-16 text-neutral-700 py-6 px-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold">Recent Orders</h1>
          <p className="text-neutral-600 text-xs lg:text-sm">
            Latest orders from your website
          </p>
        </div>
        <Link
          href={"/kitchen/orders"}
          className="text-xs flex items-center gap-2  border border-gray-300 hover:border-gray-500 cursor-pointer py-2 px-4 rounded"
        >
          <span>View All</span>
          <ArrowRight size={18} />
        </Link>
      </div>
      <div>
        {isPending ? (
          <OrderCardSkeleton />
        ) : !data?.data || !data.success || isError ? (
          <ErrorFetching message="Orders" retry={refetch} />
        ) : data.data.length === 0 && data.message ? (
          <NoData message={data.message} />
        ) : (
          <div className="space-y-2 lg:space-y-4 mt-4">
            {data.data.map((item) => (
              <OrderCard order={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentOrders;
