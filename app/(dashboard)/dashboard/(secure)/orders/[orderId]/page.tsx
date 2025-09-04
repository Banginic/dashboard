'use client'
import Back from "@/components/adminComponents/Back";
import Title from "@/components/adminComponents/Title";
import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader, NoData, ErrorFetching, OrderDetails } from "@/components/adminComponents/index";
import { getSingleOrder } from "@/app/db/orders/getSingleOrder";

function OrderDetail({ params }: { params : Promise <{orderId : string}>}) {
  const  {orderId}  = use(params)
   
const { data, isPending, refetch, isError } = useQuery({
    queryKey : [`kitchen-orders-${orderId}`],
    queryFn: () => getSingleOrder(orderId)
  })

  return (
    <section className="w-[95%] mx-auto py-8 relative">
      <div className="absolute top-10">
        <Back link="/kitchen/orders" />
      </div>
      <Title text1="Order" text2="Details" />
       <div className="mt-12">
       {
         isPending ? (
          <Loader />
         ) : isError && !data?.data ? (
          <ErrorFetching retry={() => refetch}/>
         ) : data.data.length === 0 && data?.message ? (
          <NoData message={ data.message} />
         ) : (
          <OrderDetails order ={ data.data[0]} />
         )
       }

       </div>
    </section>
  );
}

export default OrderDetail;
