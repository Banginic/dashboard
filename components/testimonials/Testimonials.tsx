import TestimonialCarousel from "./TestimonialCarousel";
import { Title } from "@/dashboard-components";

const Testimonials = () => {
  return (
    <div className=" bg-gray-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
            <Title text1="CLIENT" text2="STORIES"/>
          
          <p className="text-secondary-foreground mt-4 max-w-2xl mx-auto text-[1.3rem] leading-relaxed">
            Discover how we've helped businesses transform their digital presence 
            and achieve remarkable results through innovative solutions.
          </p>
        </div>

        {/* Testimonials Section */}
        <div className="max-w-4xl mx-auto">
          <TestimonialCarousel />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">123+</div>
            <div className="text-chart-3">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent  mb-2">98%</div>
            <div className="text-chart-3">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent  mb-2">18+</div>
            <div className="text-chart-3">Archievments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;