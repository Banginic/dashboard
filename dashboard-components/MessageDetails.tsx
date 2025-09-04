"use client";
import { MessageType, MessageTypes } from "@/models/types";
import { LoaderCircle, Reply, Trash } from "lucide-react";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { kitchenClient } from "@/app/queryProviders/kitchenProvider";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import MessageReplyForm from "./ReplyMessageForm";

function MessageDetails({ message }: { message: MessageType }) {
  const [showMessageReplyForm, setMessageReplyForm] = useState(false);
  const fetchDetails = {
    endpoint: "/api/messages/delete-single-message",
    method: "DELETE",
    title: "messages",
  };
  const { id, name, email, phone, subject, createdAt, message: body } = message;
  const router = useRouter();

  const { mutate: deleteMutate, isPending: deletePending } = useMutation({
    mutationFn: () => useFetch<MessageTypes>(fetchDetails),
    onSuccess: () => {
      toast.success("Message Deleted Successfully");
      kitchenClient.invalidateQueries({ queryKey: ["kitchen-messages"] });
      router.push("/kitchen/messages");
      return;
    },
    onError: () => {
      toast.warning("Errror Deleting Message");
    },
  });
  function deleteMessage() {
    deleteMutate();
  }
  function handleMessageReplyForm() {
    setMessageReplyForm(true);
  }

  return (
    <article className="mt-12 border relative border-gray-300 rounded-lg p-6 max-w-3xl mx-auto">
      <section>
        <div className="flex justify-between bg-indigo-300 rounded p-4">
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Message Id</span>
            <span>{id.slice(28)}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Sent Date</span>
            <span className=" text-yellow-700">
              {new Date(createdAt).toLocaleDateString("en-GB")}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 ml-4">
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Sender's Name</span>
            <span className="text-[16px] font-semibold">{name}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Email</span>
            <span>{email}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Phone Number</span>
            <span>{phone}</span>
          </div>
        </div>
        <div className="mt-4 ml-4">
          <div className="flex flex-col text-sm">
            <span className="text-neutral-600">Subject</span>
            <span className="text-blue-600">{subject}</span>
          </div>
          <div className="flex flex-col text-sm  mt-2">
            <span className="text-neutral-600">Message</span>
            <span className="text-indigo-600 bg-gray-200 rounded p-4 mt-1 min-h-20">
              {body}
            </span>
          </div>
        </div>
      </section>

      {/* Button */}
      <div className="flex gap-4 mt-8 ml-4">
        <button
          onClick={handleMessageReplyForm}
          className="text-sm flex items-center gap-2 bg-green-200 hover:bg-green-300 text-green-800 py-2 px-4 rounded cursor-pointer "
        >
          <Reply size={18} />
          <span>Reply</span>
        </button>
        <button
          onClick={deleteMessage}
          className="text-sm flex items-center gap-2 bg-red-200 hover:bg-red-300 text-red-800 py-2 px-4 rounded cursor-pointer"
        >
          {deletePending ? (
            <div className="flex gap-2 items-center">
              <LoaderCircle className="animate-spin" size={18} />
              <span className="animate-pulse">Deleting</span>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Trash size={18} />
              <span>Delete</span>
            </div>
          )}
        </button>
      </div>
      <>
        {showMessageReplyForm && (
          <div className="fixed inset-0 bg-black/80 h-screen border grid place-items-center ovrerflow-scroll">
            <MessageReplyForm email={email} closeForm={setMessageReplyForm} />
          </div>
        )}
      </>
    </article>
  );
}

export default MessageDetails;
