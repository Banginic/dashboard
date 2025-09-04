"use client";

import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Loader,
  NoData,
  ErrorFetching,
  OrderDetails,
  Title,
  Back,
} from "@/dashboard-components/index";
import { useFetch } from "@/hooks/useFetch";
import { OrdersTypes } from "@/models/types";

function OrderDetail({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const fetchDetails = {
    endpoint: `/api/orders/list-single-order?order_id=${orderId}`,
    method: "GET",
    title: "order",
  };

  const { data, isPending, refetch, isError } = useQuery({
    queryKey: [`kitchen-orders-${orderId}`],
    queryFn: () => useFetch<OrdersTypes>(fetchDetails),
  });

  return (
    <section className="w-[95%] mx-auto py-8 relative">
      <div className="absolute top-10">
        <Back link="/kitchen/orders" />
      </div>
      <Title text1="Order" text2="Details" />
      <div className="mt-12">
        {isPending ? (
          <Loader />
        ) : isError && !data?.data ? (
          <ErrorFetching message="Order details" />
        ) : data.data.length === 0 && data?.message ? (
          <NoData message={data.message} />
        ) : (
          <OrderDetails order={data.data[0]} />
        )}
      </div>
    </section>
  );
}

export default OrderDetail;
