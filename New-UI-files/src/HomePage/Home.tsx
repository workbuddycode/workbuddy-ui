import React from "react";
import HeroSection from "./home/HeroSection";
import StatsSection from "./home/StatsSection";
import GradientCTA from "./home/GradientCTA";
import Footer from "./home/Footer";
import ProductsListing from "./home/ProductsListing";
const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <GradientCTA />
      <ProductsListing />
      <Footer />
    </>
  );
};

export default Home;
