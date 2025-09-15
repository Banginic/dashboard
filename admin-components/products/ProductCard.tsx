import { ProductType } from "@/models/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";


function ProductCard({ product }: { product: ProductType }) {
  const { photos, id, name, category, price } = product;
  return (
    <Link
      href={`/kitchen/products/${id}`}
      className="p-2 border text-neutral-700 cursor-pointer border-gray-300 shadow-md flex justify-between text-sm lg:text-[16px] items-center rounded-lg shadow-indigo-100 hover:shadow-indigo-200"
    >
      <div className=" h-20 w-34 rounded-md ">
        <Image src={photos[0]} width={80} height={30} alt={name} className="rounded"/>
      </div>
      <div className=" ">
        <p>{name}</p>
        <p className="text-neutral-500">{category}</p>
      </div>

      <p className="text-[18px] font-semibold text-green-600">{price} xaf</p>
    </Link>
  );
}

export default ProductCard;
