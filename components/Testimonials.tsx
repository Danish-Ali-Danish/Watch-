
import React from 'react';
import { testimonials } from '../constants';
import type { Testimonial } from '../types';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-white dark:bg-[#111] p-8 rounded-lg border border-gray-200 dark:border-yellow-800/30 transition-all duration-300 hover:border-yellow-600/50 hover:shadow-2xl hover:shadow-yellow-900/20">
    <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{testimonial.quote}"</p>
    <div className="flex items-center">
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.author}</h4>
        <p className="text-sm text-yellow-500 dark:text-yellow-400">{testimonial.title}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold">From Our Patrons</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-amber-400 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;