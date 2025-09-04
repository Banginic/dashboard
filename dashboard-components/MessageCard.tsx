import Link from "next/link";
import React from "react";

interface PropsTypes {
  id: string;
  name: string;
  subject: string;
  message:string;
  email: string;
  phone:string;
  createdAt: Date ;
}
function MessageCard({message}: { message: PropsTypes}) {
  const { id, name, subject,  createdAt } = message
  return (
    <Link href={`/kitchen/messages/${id}`} className="p-6 border text-neutral-700 cursor-pointer border-gray-300 shadow-md flex justify-between text-sm lg:text-[16px] items-center rounded-lg shadow-indigo-100 hover:shadow-indigo-200">
      <div className=" ">
        <p className="text-neutral-500">Sender</p>
        <p >{name}</p>
      </div>
       <div className=" ">
        <p className="text-neutral-500">Subject</p>
        <p >{subject}</p>
      </div>
      
        <p className="text-xs lg:text-sm text-green-600">{new Date(createdAt).toLocaleDateString('en-GB')}</p>
      
    </Link>
  );
}

export default MessageCard;
