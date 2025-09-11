
import { TestimonialType } from "@/models/types";
import { StaticImageData } from "next/image";

export const testimonials = [
  {
    id: '1',
    photo: 'electric1',
    name: "Sarah Chen",
    project: "Real Estate",
    rating: 5,
    message: "The team delivered an exceptional real estate that exceeded our expectations. Our sales increased by 300% within the first quarter."
  },
  {
    id: '2',
    photo: 'electric1',
    name: "Michael Rodriguez",
    project: "Solar Installation",
    rating: 5,
    message: "Outstanding work on our Solar grid. The user experience is intuitive and the performance is remarkable. Highly recommend their services."
  },
  {
    id: '3',
    photo: 'electric1',
    name: "Emma Thompson",
    project: "Geophysical Survey",
    rating: 5,
    message: "They turn idea into reality with stunning design and flawless functionality. The attention to detail is incredible."
  },
  {
    id: '4',
    photo: 'electric1',
    name: "David Martinez",
    project: "Building",
    rating: 5,
    message: "Professional, reliable, and innovative. They constructed our house that perfectly represents our brand and drives conversions."
  },
  {
    id: '5',
    photo: 'electric1',
    name: "Jessica Park",
    project: "Design System",
    rating: 5,
    message: "The design system they built for us is comprehensive and scalable. It has streamlined our entire product development process."
  },
  {
    id: '6',
    photo: 'electric1',
    name: "Alex Johnson",
    project: "Electricity",
    rating: 5,
    message: "Incredible technical expertise and creative vision. Our web application now handles thousands of users seamlessly with beautiful UX."
  }
];
export interface TestimonyType {
    id:string;
    photo: StaticImageData;
    project: string;
    name: string;
    rating: number,
    message: string
}