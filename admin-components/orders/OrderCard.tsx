import Link from "next/link";
import React from "react";
import { OrderType } from "@/models/types";

function OrderCard( {order}: {order : OrderType}) {
  const { id, name, status, price, createdAt, location } = order
  return (
    <Link 
    href={`/admin/orders/${id}`}
    className="p-6 border cursor-pointer border-gray-300 shadow-md flex justify-between text-sm lg:text-[16px] items-center rounded-lg shadow-indigo-100 hover:shadow-indigo-200">
      <div className=" ">
        <p>{name}</p>
        <p className="text-indigo-500">{location}</p>
      </div>
      <p className={`${status === 'Completed' ? 'text-green-500': status ==='Pending' ? 'text-neutral-500' : 'text-yellow-500'}`}>{status}</p>
      <div>
        <p className="text-neutral-700 font-semibold">{price} frs</p>
        <p className="text-xs lg:text-sm text-yellow-600">{new Date(createdAt).toLocaleDateString('en-GB')}</p>
      </div>
    </Link>
  );
}

export default OrderCard;
