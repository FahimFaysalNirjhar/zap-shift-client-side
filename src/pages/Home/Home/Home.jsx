import React from "react";
import Banner from "../Banner/Banner";
import Works from "../Works/Works";
import Services from "../Services/Services";
import Brands from "../Brands/Brands";
import Features from "./Features/Features";
import Reviews from "./Reviews/Reviews";
import FAQ from "./FAQ/FAQ";

const reviewsPromise = fetch(
  "https://raw.githubusercontent.com/FahimFaysalNirjhar/review-data/refs/heads/main/reviews.json",
).then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Works></Works>
      <Services></Services>
      <Brands></Brands>
      <Features></Features>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
