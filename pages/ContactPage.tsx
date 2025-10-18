import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black pt-32">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold">Get In Touch</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">We are here to help. Contact us for any inquiries or to book a consultation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-[#111] p-8 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-6">
              <input type="text" placeholder="Your Name" className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              <input type="email" placeholder="Your Email" className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              <select className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500">
                <option>General Inquiry</option>
                <option>Product Support</option>
                <option>Press</option>
              </select>
              <textarea placeholder="Your Message" rows={5} className="w-full p-3 bg-white dark:bg-[#222] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"></textarea>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-yellow-600 to-amber-400 text-black font-bold rounded-md text-lg">Send</button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
             <div className="bg-gray-50 dark:bg-[#111] p-8 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Address:</strong> 123 Horology Ave, Geneva, Switzerland</p>
                <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Phone:</strong> +41 22 123 45 67</p>
                <p className="text-gray-600 dark:text-gray-300"><strong>Email:</strong> support@chronovault.com</p>
            </div>
             <div className="bg-gray-50 dark:bg-[#111] p-8 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-bold mb-4">Book a Private Consultation</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Experience our collection firsthand with a private viewing appointment.</p>
                <button className="py-3 px-6 border border-yellow-500 text-yellow-500 font-bold rounded-md hover:bg-yellow-500 hover:text-black transition-colors">Schedule Now</button>
             </div>
             <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.4639908688455!2d6.140222815848698!3d46.20239339097746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c65228c89f0c3%3A0x256b9b8b3d2d3a4b!2sGeneva!5e0!3m2!1sen!2sus!4v1642000000000" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'invert(90%) grayscale(80%)' }} 
                    allowFullScreen={false} 
                    loading="lazy"
                ></iframe>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;