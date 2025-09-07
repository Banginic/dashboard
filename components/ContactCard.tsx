
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { projectDetails } from "@/constants/project-details";
import { useFetch } from "@/hooks/useFetch";
import { ProjectDetails } from "@/models/settings";

async function ContactCard() {
  const fetchDetails = {
    endpoint: "/policies",
    method: "GET",
    title: "Project details",
  };
  const data = await useFetch<ProjectDetails>(fetchDetails);

  const PROJECT_DATA = data?.data[0] || projectDetails;
  return (
    <Card className="shadow-xl rounded-2xl border border-muted">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Get in Touch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-500" />{" "}
          <span>{PROJECT_DATA.email}</span>
        </p>
        <p className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-500" />{" "}
          <span>{PROJECT_DATA.phone}</span>
        </p>
        <p className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-600" /> WhatsApp:{" "}
          <span>{PROJECT_DATA.whatsApp}</span>
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-500" />{" "}
          <span>{PROJECT_DATA.address}</span>
        </p>
        <p className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-500" />{" "}
          <span>{PROJECT_DATA.city}</span>
        </p>
        <p className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-purple-500" />{" "}
          <span>{PROJECT_DATA.country}</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default ContactCard;
