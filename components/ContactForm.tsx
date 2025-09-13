"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "react-day-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSchema, MessageSchemaType } from "@/schemas/messageSchema";
import { usePost } from "@/hooks/usePost";
import { MessageTypes } from "@/models/types";
import { Send } from "lucide-react";
import LoadingBTN from "./LoadingBTN";

function ContactForm() {
  const [formState, setFormState] = useState({
    error: "",
    success: "",
    isLoading: false,
  });
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<MessageSchemaType>({ resolver: zodResolver(MessageSchema) });

  const onSubmit = async (formData: MessageSchemaType) => {
    setFormState({ error: "", success: "", isLoading: true });
    try {
      const postDetails = {
        endpoint: "/messages/create-single-message",
        method: "POST",
        body: formData,
        title: "Message",
      };
      const data = await usePost<MessageTypes>(postDetails);
      if (!data) {
        setFormState({
          error: "Error Sending Message.",
          success: "",
          isLoading: false,
        });
        return;
      }
      if (data?.data && data.data.length === 0 && data.message) {
        setFormState({
          error: `${data?.message.slice(0, 20)}`,
          success: "",
          isLoading: false,
        });
        return;
      }
      if (data?.success && data.message) {
        setFormState({ success: data?.message, error: "", isLoading: false });
        reset();
      }

      setFormState({
        error: "",
        success: "Message sent successfully.",
        isLoading: false,
      });
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        setFormState({ error: ex.message, success: "", isLoading: false });
      }
      setFormState({
        error: "Error Sending Message",
        success: "",
        isLoading: false,
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="shadow-xl rounded-2xl border bg-secondary/50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Send a Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-secondary-foreground"
          >
            <div>
              <label htmlFor="name" className="m-1">
                Full Name
              </label>
              <Input
                type="text"
                {...register("name", { required: true })}
                placeholder="Mary Jones"
                className="py-2"
                autoComplete="full name"
              />
              {errors.name && (
                <p className="text-pink-400 text-sm ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="m-1">
                Email
              </label>
              <Input
                type="email"
                {...register("email", { required: true })}
                placeholder="example@email.com"
                className="py-2"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-pink-400 text-sm ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="m-1">
                Phone Number
              </label>
              <Input
                type="tel"
                {...register("phone", { required: true })}
                placeholder="+237 677 53 72 62"
                className="py-2"
                autoComplete="phone"
              />
              {errors.phone && (
                <p className="text-pink-400 text-sm ml-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="subject" className="m-1">
                Subject
              </label>
              <Input
                type="text"
                {...register("subject", { required: true })}
                placeholder="Enter a Valid Reason"
                className="py-2"
              />
              {errors.subject && (
                <p className="text-pink-400 text-sm ml-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="subject" className="m-1">
                Message
              </label>
              <Textarea
                placeholder="Enter your message"
                {...register("message", { required: true })}
                rows={4}
              ></Textarea>
              {errors.message && (
                <p className="text-pink-400 text-sm ml-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={formState.isLoading}
              className="w-full bg-accent flex justify-center disabled:bg-gray-400 cursor-pointer hover:bg-accent/90 text-accent-foreground py-2.5 rounded-md font-semibold"
            >
              {formState.isLoading ? (
                <LoadingBTN message="Sending..." />
              ) : (
                <div className="flex items-center gap-2">
                  <Send size={18} />
                  <span>Send Message</span>
                </div>
              )}
            </Button>
            {formState.error && (
              <p className="text-pink-400 text-center">{formState.error}</p>
            )} 
            {formState.success && (
              <p className="text-green-400 text-center">{formState.success}</p>
            )} 
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ContactForm;
