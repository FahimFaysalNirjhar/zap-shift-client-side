import React from "react";

const b = () => {
  return (
    <div>
      {/* Slide 2 */}
      <div className="bg-[#F5F5F5] rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center ">
          {/* Left Content */}
          <div className="px-6 md:px-12 py-10 text-left">
            {/* Small top image */}
            <img
              src="/tiny-deliveryman.png"
              alt=""
              className="w-55 h-25 aspect-11/5 object-contain mb-6"
            />

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#0F172A]">
              We Make Sure
              <br />
              <span className="text-[#33929D]">Fastest Delivery</span> & Easy
              Pickup
              <br />— Move Faster.
            </h1>

            {/* Description */}
            <p className="mt-6 text-gray-500 text-sm md:text-base leading-7 max-w-xl">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>

            {/* Buttons */}
            <div className="py-6 flex flex-wrap items-center gap-4 mt-8">
              {/* Track Button */}
              <div className="flex items-center">
                <button className="btn bg-primary border-none hover:bg-primary text-black font-bold rounded-full px-6">
                  Track Your Parcel
                </button>

                <button className="w-11 h-11 rounded-full bg-black flex items-center justify-center ml-2">
                  <ImArrowUpRight2 className="text-primary text-sm" />
                </button>
              </div>

              {/* Rider Button */}
              <button className="btn btn-outline rounded-full border-gray-300 text-black font-semibold px-6">
                Be A Rider
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-center h-full ">
            <img
              src="/banner2-removebg-preview.png"
              alt=""
              className=" object-contain"
            />
          </div>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="bg-[#F5F5F5] rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center ">
          {/* Left Content */}
          <div className="px-6 md:px-12 py-10 text-left">
            {/* Small top image */}
            <img
              src="/tiny-deliveryman.png"
              alt=""
              className="w-55 h-25 aspect-11/5 object-contain mb-6"
            />

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#0F172A]">
              We Make Sure
              <br />
              <span className="text-[#33929D]">Fastest Delivery</span> & Easy
              Pickup
              <br />— Move Faster.
            </h1>

            {/* Description */}
            <p className="mt-6 text-gray-500 text-sm md:text-base leading-7 max-w-xl">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>

            {/* Buttons */}
            <div className="py-6 flex flex-wrap items-center gap-4 mt-8">
              {/* Track Button */}
              <div className="flex items-center">
                <button className="btn bg-primary border-none hover:bg-primary text-black font-bold rounded-full px-6">
                  Track Your Parcel
                </button>

                <button className="w-11 h-11 rounded-full bg-black flex items-center justify-center ml-2">
                  <ImArrowUpRight2 className="text-primary text-sm" />
                </button>
              </div>

              {/* Rider Button */}
              <button className="btn btn-outline rounded-full border-gray-300 text-black font-semibold px-6">
                Be A Rider
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-center h-full ">
            <img
              src="/banner3-removebg-preview.png"
              alt=""
              className=" object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default b;
