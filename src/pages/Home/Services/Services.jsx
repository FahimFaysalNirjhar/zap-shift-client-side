import React, { useEffect, useState } from "react";

const Services = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/FahimFaysalNirjhar/services-data/refs/heads/main/services.json",
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-base-200 rounded-2xl p-8 pt-16">
        <h1 className="text-white text-center text-4xl font-extrabold">
          Our Services
        </h1>
        <p className="text-[#DADADA] max-w-2xl mx-auto text-center mt-4">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-20 max-w-5xl mx-auto">
          {data.map((service, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 flex flex-col gap-4 justify-center items-center cursor-pointer bg-white hover:bg-[#C5E829]"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                  service.highlight ? "bg-white/40" : "bg-[#EEF2FF]"
                }`}
              >
                <img src={service.img} alt="" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold leading-snug text-center">
                {service.title}
              </h3>

              {/* Description */}
              <p
                className={`text-sm leading-relaxed ${
                  service.highlight ? "text-[#2d3a00]" : "text-gray-500"
                }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
