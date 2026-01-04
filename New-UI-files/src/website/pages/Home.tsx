import React from "react";
import HeroSection from "./HeroSection";
// import StatsSection from "../../HomePage/home/StatsSection";
import GradientCTA from "./GradientCTA";
import Footer from "./Footer";
import ProductsListing from "./ProductsListing";
const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      {/* <StatsSection /> */}
      <GradientCTA />
      <ProductsListing />
      <Footer />
    </>
  );
};

export default Home;
