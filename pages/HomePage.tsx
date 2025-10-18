
import React, { useEffect, useContext } from 'react';
import Hero from '../components/Hero';
import FeaturedCollections from '../components/FeaturedCollections';
import TrendingProducts from '../components/TrendingProducts';
import BrandStory from '../components/BrandStory';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import WhyChooseUs from '../components/WhyChooseUs';
import Craftsmanship from '../components/Craftsmanship';
import BrandsSection from '../components/BrandsSection';
import { NotificationContext } from '../context/NotificationContext';

const HomePage: React.FC = () => {
  const { addToastNotification } = useContext(NotificationContext);

  useEffect(() => {
    // This will run once when the component mounts
    addToastNotification(
      'If you want to save your order history, please sign up for an account. Otherwise, you can continue as a guest.',
      'info'
    );
  }, [addToastNotification]);


  return (
    <>
      <Hero />
      <FeaturedCollections />
      <TrendingProducts />
      <BrandsSection />
      <WhyChooseUs />
      <BrandStory />
      <Craftsmanship />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default HomePage;
