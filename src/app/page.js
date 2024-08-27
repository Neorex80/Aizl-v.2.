import React from 'react';
import Header from '@/components/Homepage/Header';
import Features from '@/components/Homepage/Features.jsx';
import SpotlightGrid from '@/components/Homepage/AgentsShowcase';
import WhyChooseUs from '@/components/Homepage/WhyChooseUs';
import Footer from '@/components/Homepage/Footer';
import Hero from '@/components/Homepage/Hero';
import ChatArea from '@/components/Chat/area';


const App = () => { 
  return (
    <>

     <Header />
     <Hero />
     <SpotlightGrid />
     <Features />
     <WhyChooseUs />
     <Footer /> 
    </>
  );
};

export default App;