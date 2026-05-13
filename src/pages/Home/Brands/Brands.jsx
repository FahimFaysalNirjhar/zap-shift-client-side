import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import star from "../../../assets/brands/star.png";
import startPeople from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const Brands = () => {
  const brandLogos = [amazon, casio, moonstar, star, startPeople];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-12 mt-10">
      <h1 className="text-base-200 text-center text-3xl font-extrabold">
        We've helped thousands of sales teams
      </h1>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={4}
        freeMode={true}
        freeModeMomentum={false}
        loop={true}
        speed={4000}
        spaceBetween={20}
        allowTouchMove={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        className="brand-swiper mt-10"
      >
        {brandLogos.map((logo, idx) => (
          <SwiperSlide key={idx}>
            <img src={logo} alt="brand-logo" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
