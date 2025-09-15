"use client";
import { Car, Check, ChefHat, LoaderCircle, Trash, X } from "lucide-react";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { adminProvider } from "@/providers/admin-provider";
import { toast } from "react-toastify";
import { LoadingBTN } from "@/admin-components/index";
import { useFetch } from "@/hooks/useFetch";
import { MessageTypes } from "@/models/types";

function OrderStatusButtons({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const [newStatus, setNewStatus] = useState<string>(status);

  const updateDetails = {
    endpoint: `/orders/update-order-status?status=${newStatus}`,
    method: "PUT",
    title: "orders",
  };

  const { mutate: cancelOrder, isPending: cancelPending } = useMutation({
    mutationFn: () => useFetch<MessageTypes>(updateDetails),
    mutationKey: [`admin-orders`, 'update', orderId],
    onSuccess: () => {
      toast.success(newStatus);
      adminProvider.invalidateQueries({
        queryKey: [`admin-orders`],
      });
      return;
    },
    onError: () => {
      toast.error("Error Updating Status");
    },
  });
  const { mutate: prepareOrder, isPending: preparePending } = useMutation({
    mutationFn: () => useFetch<MessageTypes>(updateDetails),
    mutationKey: [`admin-orders`, 'update', orderId],
    onSuccess: () => {
      toast.success(newStatus);
      adminProvider.invalidateQueries({
        queryKey: [`admin-orders`],
      });
      return;
    },
    onError: () => {
      toast.error("Error Updating Status");
    },
  });
  const { mutate: deliveringOrder, isPending: deliveringPending } = useMutation(
    {
      mutationFn: () => useFetch<MessageTypes>(updateDetails),
      onSuccess: () => {
        toast.success(newStatus);
        adminProvider.invalidateQueries({
          queryKey: [`kitchen-orders-${orderId}`],
        });
        return;
      },
      onError: () => {
        toast.error("Error Updating Status");
      },
    }
  );
  const { mutate: deliveredOrder, isPending: deliveredPending } = useMutation({
    mutationFn: () => useFetch<MessageTypes>(updateDetails),
    onSuccess: () => {
      toast.success(newStatus);
      adminProvider.invalidateQueries({
        queryKey: [`kitchen-orders-${orderId}`],
      });
      return;
    },
    onError: () => {
      toast.error("Error Updating Status");
    },
  });
  const { mutate: deleteOrder, isPending: deletePending } = useMutation({
    mutationFn: () => useFetch<MessageTypes>(updateDetails),
    onSuccess: () => {
      toast.success(newStatus);
      adminProvider.invalidateQueries({ queryKey: [`kitchen-orders`] });
      return;
    },
    onError: () => {
      toast.error("Error Deleting Status");
    },
  });

  const DISABLED_COMPLETE =
    cancelPending ||
    preparePending ||
    deletePending ||
    deliveredPending ||
    deliveringPending;

  function handlePreparingOrder() {
    setNewStatus("Preparing");
    prepareOrder();
  }
  function handleCancelOrder() {
    setNewStatus("Canceled");
    cancelOrder();
  }
  function handleDeliveredOrder() {
    setNewStatus("Delivered");
    deliveredOrder();
  }
  function handleDeliveringOrder() {
    setNewStatus("Delivering");
    deliveringOrder();
  }
  function handleDeleteOrder() {
    setNewStatus("Deleted");
    deleteOrder();
  }

  return (
    <div className="flex gap-4 mt-8 flex-wrap">
      <button
        disabled={
          DISABLED_COMPLETE ||
          status === "Canceled" ||
          status === "Delivering" ||
          status === "Delivered"
        }
        onClick={handleCancelOrder}
        className={`text-sm disabled:bg-gray-300 disabled:hover:gray-300 hover:bg-gray-300  text-gray-800 py-2 px-4 rounded cursor-pointer `}
      >
        {preparePending ? (
          <LoadingBTN message="Preparing..." />
        ) : (
          <div className="flex items-center gap-2">
            <ChefHat size={18} />
            <span>Preparing</span>
          </div>
        )}
      </button>

      <button
        disabled={
          DISABLED_COMPLETE || status === "Canceled" || status === "Delivering"
        }
        onClick={handlePreparingOrder}
        className="text-sm  disabled:bg-gray-300 disabled:hover:gray-300 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-2 px-4 rounded cursor-pointer "
      >
        {preparePending ? (
          <LoadingBTN message="Canceling..." />
        ) : (
          <div className="flex items-center gap-2">
            <X size={18} />
            <span>Cancel</span>
          </div>
        )}
      </button>

      <button
        disabled={
          DISABLED_COMPLETE ||
          status === "Canceled" ||
          status === "Delivering" ||
          status === "Delivered"
        }
        onClick={handleDeliveringOrder}
        className="text-sm disabled:bg-gray-300 disabled:hover:gray-300 bg-indigo-200 hover:bg-indigo-300 text-indigo-800 py-2 px-4 rounded cursor-pointer "
      >
        {deliveringPending ? (
          <LoadingBTN message="Delivering..." />
        ) : (
          <div className="flex items-center gap-2">
            <Car size={18} />
            <span>Delivering</span>
          </div>
        )}
      </button>

      <button
        disabled={
          DISABLED_COMPLETE || status === "Canceled" || status === "Delivered"
        }
        onClick={handleDeliveredOrder}
        className="text-sm disabled:bg-gray-300 disabled:hover:gray-300 bg-green-200 hover:bg-green-300 text-green-800 py-2 px-4 rounded cursor-pointer "
      >
        {deliveredPending ? (
          <LoadingBTN message="Updating..." />
        ) : (
          <div className="flex items-center gap-2">
            <Check size={18} />
            <span>Delivered</span>
          </div>
        )}
      </button>

      <button
        onClick={handleDeleteOrder}
        disabled={DISABLED_COMPLETE}
        className="text-sm disabled:bg-gray-300 disabled:hover:gray-300 bg-red-200 hover:bg-red-300 text-red-800 py-2 px-4 rounded cursor-pointer"
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
  );
}

export default OrderStatusButtons;
