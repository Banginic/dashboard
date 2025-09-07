
import Image from "next/image";
import { ContactCard, ContactForm, Map } from "@/components/index";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background w-[95%] max-w-7xl mx-auto text-foreground">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full rounded-md">
        <Image
          src="https://images.unsplash.com/photo-1521791055366-0d553872125f"
          alt="Modern office"
          fill
          className="object-cover rounded-md"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 px-4">
        {/* Left Side - Contact Info & Map */}
        <div
          className="space-y-6"
        >
          <ContactCard />
          <Map />
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
