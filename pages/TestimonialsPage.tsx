import React from 'react';

const TestimonialsPage: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      location: "Garland, TX",
      type: "Homeowner",
      quote: "urazpro made our kitchen remodel a breeze! From selecting the perfect cabinets to the final installation tips, their team was incredibly helpful and knowledgeable. The quality is outstanding!",
      rating: 5
    },
    {
      id: 2,
      name: "John B.",
      location: "Dallas, TX",
      type: "Contractor (B2B)",
      quote: "As a contractor, I rely on urazpro for consistent quality and reliable supply. Their B2B pricing is competitive, and their Pro Desk always goes the extra mile. Highly recommend for any pro.",
      rating: 5
    },
    {
      id: 3,
      name: "Lisa P.",
      location: "Plano, TX",
      type: "Homeowner",
      quote: "We replaced our old roof with materials from urazpro, and the difference is night and day. The staff helped us choose the best shingles for our needs and budget. Excellent service!",
      rating: 4
    },
  ];

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-neutral-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-secondary-dark mb-8">Customer Testimonials</h1>
      <div className="space-y-8">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-3">
              {renderStars(testimonial.rating)}
            </div>
            <blockquote className="text-lg text-neutral-700 italic mb-4">
              "{testimonial.quote}"
            </blockquote>
            <p className="text-right font-semibold text-primary">
              - {testimonial.name}, <span className="text-neutral-500 font-normal">{testimonial.type} from {testimonial.location}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center bg-secondary-light p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-secondary-dark mb-3">Share Your Experience!</h2>
        <p className="text-neutral-700 mb-4">
          We value your feedback and would love to hear about your experience with urazpro. 
          Consider leaving us a review on Google or contacting us directly.
        </p>
        <button className="bg-accent hover:bg-opacity-80 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Leave a Review
        </button>
      </div>
    </div>
  );
};

export default TestimonialsPage;