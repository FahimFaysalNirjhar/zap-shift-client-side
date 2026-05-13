import React from "react";

const Features = () => {
  const features = [
    {
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: "/live-tracking.png",
    },
    {
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: "/safe-delivery.png",
    },
    {
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: "/safe-delivery.png",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="space-y-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="card lg:card-side bg-base-100 shadow-sm rounded-3xl items-center"
          >
            <figure className="px-8 py-6 flex items-center justify-center">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-44 object-contain"
              />
            </figure>

            <div className="hidden lg:flex items-center">
              <div className="border-l border-dashed border-primary h-24"></div>
            </div>

            <div className="card-body justify-center">
              <h2 className="card-title text-2xl font-extrabold text-base-200">
                {feature.title}
              </h2>

              <p className="text-gray-500 leading-relaxed max-w-4xl">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
