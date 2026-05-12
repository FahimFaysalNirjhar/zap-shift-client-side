import React from "react";

const services = [
  {
    img: "/bookingIcon.png",
    alt: "Package icon",
    title: "Booking Pick & Drop",
    description:
      "Schedule a pickup from your doorstep and we'll deliver it safely to the recipient's address.",
  },
  {
    img: "/bookingIcon.png",
    alt: "Cash icon",
    title: "Cash On Delivery",
    description:
      "Pay when your package arrives — no upfront payment needed, making every order stress-free.",
  },
  {
    img: "/bookingIcon.png",
    alt: "Hub icon",
    title: "Delivery Hub",
    description:
      "Drop off your parcel at the nearest hub and let our network handle the rest efficiently.",
  },
  {
    img: "/bookingIcon.png",
    alt: "Corporate icon",
    title: "Booking SME & Corporate",
    description:
      "Tailored bulk shipping solutions for small businesses and large enterprises with priority support.",
  },
];

const Works = () => {
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-base-200  mb-6">
        How it Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-5"
          >
            <img
              src={service.img}
              alt={service.alt}
              className="w-9 h-9 mb-3 opacity-75"
            />
            <h3 className="text-xl font-bold text-base-200 mb-2">
              {service.title}
            </h3>
            <p className="text-xs text-[#606060] leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
