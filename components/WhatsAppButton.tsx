// components/WhatsAppButton.tsx
"use client";
import { green_whatsApp } from "@/assets/photos";
import Image from "next/image";
import { projectDetails } from "@/constants/project-details";

const WhatsAppButton = () => {


  const whatsappLink = `https://wa.me/${projectDetails.whatsApp}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      title="Message us on whatsApp"
      className="fixed bottom-4 right-4 z-50 bg-green-600/20 text-white p-2 rounded-full shadow-lg hover:bg-green-600/40 transition-all animate-pulse"
    >
     <Image
     src={green_whatsApp}
     width={40}
     height={40}
     alt="./placeholder.png"
     />
    </a>
  );
};

export default WhatsAppButton;
