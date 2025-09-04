"use client";
import { Send, X } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MessageReplySchema,
  MessageReplySchemaType,
} from "@/schemas/messageReply";
import { toast } from "react-toastify";

function MessageReplyForm({
  closeForm,
  email,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
  email: string;
}) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<MessageReplySchemaType>({
    resolver: zodResolver(MessageReplySchema),
  });

  const onSubmit = async (data: MessageReplySchemaType) => {
    toast.success("Message sent successfully.");
    reset();
     closeForm(false);
  };

  function closeMessageReplyFormForm() {
    closeForm(false);
  }
  return (
    <div className=" w-full h-full lg:h-auto overflow-y-auto lg:max-h-[90vh]  rounded-md ">
      <section className="relative w-[95%] lg:w-lg   border my-12 border-gray-300 shadow-indigo-200 text-neutral-700  p-6  text-sm mx-auto rounded-md bg-white ">
        <button
          type="button"
          onClick={closeMessageReplyFormForm}
          className="absolute top-4 right-4 rounded cursor-pointer hover:bg-slate-200 bg-slate-100 trans p-1"
        >
          <X size={25} />
        </button>
        <h1 className="text-indigo-600 font-semibold text-lg lg:text-xl">
          Message Reply
        </h1>
        <p className="text-sm text-neutral-500">Reply using the form below.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
          <div className="mt-8">
            <label htmlFor="subject" className="mb-1 block text-neutral-500">
              Reciever
            </label>
            <p
              className="border-none text-indigo-400 font-semibold outline-none w-full "
              
            >{email}</p>
          </div>
          <div className="mt-4 text-neutral-500">
            <label htmlFor="subject" className="mb-1 block">
              Subject
            </label>
            <input
              type="text"
              {...register("subject", { required: true })}
              className="border border-gray-300 py-2 px-4 rounded shadow w-full "
              placeholder="Enter Subject"
            />
            {errors.subject && (
              <p className="text-pink-400 m-0.5 ">{errors.subject.message}</p>
            )}
          </div>
          <div className="mt-4 text-neutral-500">
            <label htmlFor="message" className="mb-1 block">
              Message
            </label>
            <textarea
              className="border border-gray-300 py-2 px-4 rounded shadow w-full "
              placeholder="Enter message "
              rows={4}
              {...register("message", { required: true })}
            ></textarea>
            {errors.message && (
              <p className="text-pink-400 m-0.5 ">{errors.message.message}</p>
            )}
          </div>
          <button className="py-2 px-4 mt-4 rounded-md flex justify-center bg-indigo-700 cursor-pointer hover:bg-indigo-800 w-full text-indigo-50">
            <div className="flex items-center gap-2">
              <Send size={18} />
              Send
            </div>
          </button>
        </form>
        <p className="text-pink-400 text-center mt-0.5 h-4"></p>
      </section>
    </div>
  );
}

export default MessageReplyForm;
