import { ProjectDetail } from "@/models/settings";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";

function SocialLinks({ projectDetails }: { projectDetails: any }) {
    const {facebook, projectName, instagram, twitter, youTube, whatsApp } = projectDetails;
  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: facebook },
    { name: "Instagram", icon: Instagram, url: instagram },
    { name: "Twitter", icon: Twitter, url: twitter },
    { name: "YouTube", icon: Youtube, url: youTube },
  ];
  return (
    <div className="flex space-x-4">
      {socialLinks.map((social) => (
        <a
        title={`Vist ${projectName}'s ${social.name.toLocaleLowerCase()} page`}
          key={social.name}
          href={social.url}
          target="blank"
          className="p-2 bg-accent/10 hover:bg-accent/20 cursor-pointer rounded-lg transition-colors"
          aria-label={social.name}
        >
          <social.icon className="h-5 w-5 text-foreground   " />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
