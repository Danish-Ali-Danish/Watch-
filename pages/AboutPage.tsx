import React from 'react';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

const AboutPage: React.FC = () => {
    const watchmakers = [
        { name: "Julian Verne", role: "Master Watchmaker", image: "https://picsum.photos/seed/wm1/500/500" },
        { name: "Elara Finch", role: "Head of Design", image: "https://picsum.photos/seed/wm2/500/500" },
        { name: "Marcus Thorne", role: "Lead Engineer", image: "https://picsum.photos/seed/wm3/500/500" },
        { name: "Sofia Rossi", role: "Gemologist", image: "https://picsum.photos/seed/wm4/500/500" },
    ];
  return (
    <div className="bg-white dark:bg-black pt-24 text-gray-900 dark:text-white">
      {/* Hero */}
       <section 
        className="relative py-40 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/gears-about/1920/1080)' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h1 className="text-6xl font-bold">Our Legacy</h1>
          <p className="text-xl mt-4 text-gray-200">Since 1985 – A Legacy of Precision</p>
        </div>
      </section>

      {/* Vision & Mission */}
       <section className="py-20">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2 className="text-4xl font-bold mb-4">Vision & Mission</h2>
                 <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-amber-400 mx-auto mt-4 mb-8"></div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Our vision is to craft timepieces that are not mere instruments of time, but symbols of enduring legacy and personal milestones. Our mission is to merge the pinnacle of Swiss watchmaking tradition with forward-thinking design, creating heirlooms for future generations.
                </p>
            </div>
       </section>

      {/* Meet Our Watchmakers */}
        <section className="py-20 bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold">Meet Our Watchmakers</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {watchmakers.map(maker => (
                        <div key={maker.name} className="group relative text-center">
                            <ImageWithSkeleton
                                src={maker.image}
                                alt={maker.name}
                                wrapperClassName="w-full aspect-square rounded-lg"
                                imgClassName="w-full h-full object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="mt-4">
                                <h3 className="text-xl font-bold">{maker.name}</h3>
                                <p className="text-yellow-500 dark:text-yellow-400">{maker.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Quote Banner */}
        <section className="py-24 bg-white dark:bg-black">
             <div className="container mx-auto px-6 text-center">
                <h3 className="text-4xl italic gold-gradient-text">“We don’t sell watches, we sell timepieces.”</h3>
            </div>
        </section>
    </div>
  );
};

export default AboutPage;