import { Title, Back } from "@/admin-components/index";
import { OrderType } from "@/models/types";
import { Car, Check, ChefHat, Trash, X } from "lucide-react";
import React from "react";
import OrderStatusButtons from "./OrderStatusButtons";

function OrderDetails({ order }: { order: OrderType }) {
  const {
    id,
    name,
    phone,
    location,
    status,
    orderDetails,
    note,
    price,
    createdAt,
  } = order;

  return (
    <section className="w-[95%] mx-auto py-8 relative">
      <div className="absolute top-10">
        <Back link="/kitchen/orders" />
      </div>
      <article className="mt-12 border border-gray-300 rounded-lg p-6 max-w-3xl mx-auto">
        <section>
          <div className="flex justify-between ">
            <div className="flex flex-col text-xs lg:text-sm">
              <span className="text-neutral-600">Order Id</span>
              <span>{id}</span>
            </div>
            <div className="flex flex-col text-xs lg:text-sm">
              <span className="text-neutral-600">Sent Date</span>
              <span className=" text-yellow-700">
                {new Date(createdAt).toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex flex-col text-xs lg:text-sm">
              <span className="text-neutral-600">Sender's Name</span>
              <span className="text-[16px] font-semibold">{name}</span>
            </div>
            <div className="flex flex-col text-xs lg:text-sm">
              <span className="text-neutral-600">Location</span>
              <span>{location}</span>
            </div>
            <div className="flex flex-col text-xs lg:text-sm">
              <span className="text-neutral-600">Phone Number</span>
              <span>{phone}</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-col text-xs lg:text-sm">
              <span className="text-neutral-600">Status</span>
              <span className="text-blue-600">{status}</span>
            </div>
            <div className="flex flex-col text-xs lg:text-sm  mt-5">
              <span className="text-neutral-600">Order Details</span>
              <div className="flex flex-col gap-2 bg-gray-200 rounded p-2 mt-1">
                {orderDetails.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 bg-gray-100 p-2 rounded"
                  >
                    <p className="flex flex-col">
                      <span className="text-neutral-600">Item</span>
                      <span className="text-neutral-800">{item.product}</span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-neutral-600">Quantiy</span>
                      <span className="text-neutral-800">{item.quantity}</span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-neutral-600">Price</span>
                      <span className="text-neutral-800">{item.quantity}</span>
                    </p>
                  </div>
                ))}
                <p className="flex gap-2 lg:gap-4 items-center mt-2">
                  <span>Note</span>
                  <span className="text-yellow-700 text-sm">{note}</span>
                </p>
                <p className="flex gap-2 lg:gap-4 items-center mt-2">
                  <span>Amount</span>
                  <span className="text-green-600 text-semibold text-lg lg:text-xl">
                    {price} xaf
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Button */}
        <OrderStatusButtons orderId={id} status={status} />
      </article>
    </section>
  );
}

export default OrderDetails;
