import React from "react";
import { Link } from "react-router";
import {
  FaBoxOpen,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const STATS = [
  { label: "Parcels Delivered", value: "50,000+" },
  { label: "Districts Covered", value: "64" },
  { label: "Active Riders", value: "1,200+" },
  { label: "Avg. Delivery Time", value: "< 24h" },
];

const VALUES = [
  {
    icon: <FaClock className="w-5 h-5" />,
    title: "On-Time, Every Time",
    desc: "We track every parcel from pickup to doorstep, so delays get caught before they become problems.",
  },
  {
    icon: <FaMapMarkerAlt className="w-5 h-5" />,
    title: "Nationwide Coverage",
    desc: "From Dhaka to the smallest upazilas, our rider network reaches every district in Bangladesh.",
  },
  {
    icon: <FaMotorcycle className="w-5 h-5" />,
    title: "Rider-First",
    desc: "Fair, transparent payouts and a simple app riders actually enjoy using — because happy riders mean reliable delivery.",
  },
  {
    icon: <FaBoxOpen className="w-5 h-5" />,
    title: "Built for Businesses & People",
    desc: "Whether it's one document or a thousand packages a month, the same reliable system handles it.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Book a Pickup",
    desc: "Tell us where the parcel is, where it's going, and we'll match it with the nearest available rider.",
  },
  {
    number: "02",
    title: "We Move It",
    desc: "Your parcel travels through our district hub network, tracked at every checkpoint along the way.",
  },
  {
    number: "03",
    title: "Delivered & Confirmed",
    desc: "The receiver signs off, you get notified, and the tracking history is there if you ever need to look back.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5] text-[#33929D] text-xs font-semibold uppercase tracking-wide mb-5">
            About ZapShift
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#0F172A]">
            Delivery built for
            <br />
            <span className="text-[#33929D]">how Bangladesh moves.</span>
          </h1>
          <p className="mt-6 text-gray-500 text-base md:text-lg leading-7 max-w-2xl">
            ZapShift started with a simple frustration: sending a parcel across
            the country shouldn't mean guessing where it is or when it'll
            arrive. So we built a network of riders, hubs, and real-time
            tracking that removes the guesswork — for individuals sending a
            birthday gift and businesses shipping at scale alike.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-[#0F172A] rounded-3xl px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-extrabold text-[#C5E829]">
                {s.value}
              </p>
              <p className="text-sm text-gray-300 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — signature element */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">
            From pickup to doorstep
          </h2>
          <p className="mt-3 text-gray-500 leading-7">
            Every parcel follows the same three-step journey — simple to book,
            easy to follow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* connecting line, desktop only */}
          <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-gray-200" />

          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-[#0F172A] flex items-center justify-center text-sm font-extrabold text-[#0F172A]">
                  {step.number}
                </span>
              </div>
              <h3 className="font-bold text-lg text-[#0F172A] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-6">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values grid */}
      <section className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">
              What we hold ourselves to
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-11 h-11 rounded-full bg-[#C5E829]/20 text-[#0F172A] flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-6">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-[#0F172A] rounded-3xl px-6 md:px-16 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white max-w-xl mx-auto">
            Ready to send your first parcel?
          </h2>
          <p className="mt-4 text-gray-300 max-w-lg mx-auto">
            Book a pickup in minutes, or join our rider network and start
            earning on your own schedule.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              to="/sendParcel"
              className="btn bg-[#C5E829] border-none text-[#0F172A] font-bold rounded-full px-8 hover:!bg-white"
            >
              Send a Parcel
            </Link>
            <Link
              to="/rider"
              className="btn btn-outline border-gray-500 text-white font-semibold rounded-full px-8 hover:bg-white hover:border-white hover:text-[#0F172A]"
            >
              Be a Rider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
