import { TestimonialType } from "@/models/types";
import { Star } from "lucide-react";
import Image from "next/image";
import { TestimonyType } from "@/constants/testimonials";


const TestimonialCard = ({ testimony }: {testimony: TestimonialType | TestimonyType}) => {
  const { name, project, message, photo, rating } = testimony;
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-yellow-500 text-yellow-500"
            : " text-yellow-500"
        }`}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br  border bg-gray-100 shadow-accent/20 rounded-xl p-8 shadow-lg  hover:shadow-xl transition-smooth w-[98%] mx-4">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={photo}
          alt={`${name} profile`}
          width={50}
          height={50}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
        />
        <div>
          <h3 className="font-semibold text-lg text-foreground">{name}</h3>
          <p className="text-chart-3 text-sm font-medium">{project}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1 mb-4">
        {renderStars()}
      </div>
      
      <blockquote className="text-foreground/70 leading-relaxed">
        "{message}"
      </blockquote>
    </div>
  );
};

export default TestimonialCard;