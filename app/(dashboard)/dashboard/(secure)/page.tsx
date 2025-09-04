import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { bakeryImage } from "@/assets/photos";
import {
  DollarSignIcon,
  MessageCircleCodeIcon,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { PERSONAL_DATA } from "@/assets/data";
import {
  RecentMessages,
  RecentOrders,
  MessageCounts,
  OrderCounts,
  ProductCounts,
  HeroCard,
  RevenueCounts,
} from "@/dashboard-components/index";

function KitchenHomePage() {
  return (
    <section className="w-[95%]  mx-auto lg:w-full">
      {/* HERO */}
      <div className="relative  h-48 lg:h-92 2xl:h-121 rounded-xl overflow-hidden">
        <Image
          src={bakeryImage}
          alt="Sweet Bakery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40 flex items-center justify-between p-8">
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold text-background mb-2">
              Welcome back to {PERSONAL_DATA.title}
            </h1>
            <p className="text-background/90 text-lg lg:text-2xl font-semibold">
              Manage your bakery with ease and delight your customers
            </p>
          </div>
          <Button className="bg-background text-foreground hover:bg-background/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 mt-12 lg:mx-auto ">
        <RevenueCounts />
        <MessageCounts />
        <OrderCounts />
        <ProductCounts />
      </div>
      <RecentOrders />
      <RecentMessages />
    </section>
  );
}

export default KitchenHomePage;
