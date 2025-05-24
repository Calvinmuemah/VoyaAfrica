import React from 'react';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FeaturedRoutes from '../components/home/FeaturedRoutes';
import HowItWorks from '../components/home/HowItWorks';
import PopularCompanies from '../components/home/PopularCompanies';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedRoutes />
      <HowItWorks />
      <PopularCompanies />
      <Testimonials />
    </Layout>
  );
};

export default HomePage;