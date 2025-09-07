import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building2, Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

function ContactCard() {
  return (
    <Card className="shadow-xl rounded-2xl border border-muted">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Get in Touch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-500" /> contact@company.com
        </p>
        <p className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-500" /> +237 600 000 000
        </p>
        <p className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-600" /> WhatsApp: +237
          600 000 000
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-500" /> Avenue Kennedy
        </p>
        <p className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-indigo-500" /> Douala
        </p>
        <p className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-purple-500" /> Cameroon
        </p>
      </CardContent>
    </Card>
  );
}

export default ContactCard;
