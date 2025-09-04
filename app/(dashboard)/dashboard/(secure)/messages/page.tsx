import {
  MessageCard,
  NoData,
  ErrorFetching,
  Title
} from "@/dashboard-components/index";
import { useFetch } from "@/hooks/useFetch";
import { MessageTypes } from "@/models/types";
import React from "react";

async function Messages() {
 const fetchDetails = {
  endpoint: '/api/messages/list-all-messages',
  method: 'GET',
  title: 'messages'
 }
 const data = await useFetch<MessageTypes>(fetchDetails)

  return (
    <div className="py-8">
      <Title text1="Messages" />
      <section className="mt-12 ">
        { !data?.success ? (
          <ErrorFetching message="Messages"/>
        ) : data?.data.length === 0 && data?.message ? (
          <NoData message={data.message} />
        ) : (
          <div className="flex flex-col gap-2 lg:gap-4 w-[95%] max-w-3xl mx-auto">
            {
          data?.data.map(item => (
            <MessageCard key={item.id} message={item}/>
          ))
        }
          </div>
        )}
      </section>
    </div>
  );
}

export default Messages;
