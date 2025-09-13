"use client";
import { electric1 } from "@/assets/photos";
import { useEffect, useState } from "react";
import { TestimonialCard } from "../index";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "@/hooks/useFetch";
import { TestimonialTypes } from "@/models/types";
import { testimonials } from "@/constants/testimonials";
import { motion } from "framer-motion";

const TestimonialCarousel = () => {
  const fetchDetails = {
    endpoint: "/testimonials/list-all-testimonies",
    method: "GET",
    title: "Fetch Testimonials",
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => useFetch<TestimonialTypes>(fetchDetails),
  });

  // ✅ Always call hooks
  const [currentIndex, setCurrentIndex] = useState(0);

  const TESTIMONIALS = data?.data || testimonials;

  useEffect(() => {
    if (!TESTIMONIALS.length) return; // prevent empty array issue
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [TESTIMONIALS.length]);

  // ✅ Conditional UI after hooks
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div
      className="relative overflow-hidden w-full"
    >
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {TESTIMONIALS.map((testimony) => (
          <div
            key={testimony.id}
            className="w-full flex-shrink-0 flex justify-center"
          >
            <TestimonialCard testimony={testimony} />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-8">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === currentIndex
                ? "bg-chart-3 w-4 shadow-glow"
                : "bg-foreground/20 hover:bg-muted/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
