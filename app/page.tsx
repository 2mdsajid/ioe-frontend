import React from 'react';
import Features from './_components/Features';
import Footer from './_components/Footer';
import Hero from './_components/Hero';
import Contact from './_components/Contact';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-900">
      <Hero />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;