import React from "react";
import Banner from "../Banner/Banner";
import Works from "../Works/Works";
import Services from "../Services/Services";
import Brands from "../Brands/Brands";
import Features from "./Features/Features";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Works></Works>
      <Services></Services>
      <Brands></Brands>
      <Features></Features>
    </div>
  );
};

export default Home;
