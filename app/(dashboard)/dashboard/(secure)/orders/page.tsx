import {
  NoData,
  ErrorFetching,
  OrderCard,
  Title
} from "@/dashboard-components/index";
import { useFetch } from "@/hooks/useFetch";
import { OrdersTypes } from "@/models/types";
import React from "react";

async function Orders() {
 const fetchDetails = {
  endpoint: '/orders/list-all-orders?limit=15',
  method: 'GET',
  title: 'orders'
 }
 const data = await useFetch<OrdersTypes>(fetchDetails)
  function reFetch(){}
  return (
    <div className="py-8 bg-background text-foreground min-h-[88dvh]">
      <Title text1="Orders" />
      <section className="mt-12 ">
        { !data?.success ? (
          <ErrorFetching message="Orders"/>
        ) : data?.data.length === 0 && data?.message ? (
          <NoData message={data.message} />
        ) : (
          <div className="flex flex-col gap-2 lg:gap-4 w-[95%] max-w-3xl mx-auto">
            {
          data?.data.map(item => (
            <OrderCard key={item.id} order={item}/>
          ))
        }
          </div>
        )}
      </section>
    </div>
  );
}

export default Orders;