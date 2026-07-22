import React, { useState } from "react";

const regions = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
];

const districtsByRegion = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Comilla", "Feni"],
  Khulna: ["Khulna", "Jessore", "Satkhira", "Bagerhat"],
  Rajshahi: ["Rajshahi", "Bogura", "Pabna", "Natore"],
  Barishal: ["Barishal", "Patuakhali", "Bhola", "Pirojpur"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Kurigram", "Lalmonirhat"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
};

const Rider = () => {
  const [formData, setFormData] = useState({
    name: "",
    license: "",
    email: "",
    region: "",
    district: "",
    nid: "",
    phone: "",
    bikeModel: "",
    bikeRegistration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // reset district if region changes
      ...(name === "region" ? { district: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rider application submitted:", formData);
    // TODO: wire this up to the backend
  };

  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition focus:border-[#CAEB66] focus:ring-2 focus:ring-[#CAEB66]/40";

  const labelClasses = "mb-2 block text-sm font-semibold text-gray-900";

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 pb-12 relative ">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left column: heading + form */}
          <div>
            <h1 className="text-4xl font-extrabold text-[#03373D] md:text-5xl">
              Be a Rider
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>

            <hr className="my-8 border-gray-200" />

            <h2 className="text-2xl font-bold text-[#03373D]">
              Tell us about yourself
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="name" className={labelClasses}>
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="license" className={labelClasses}>
                  Driving License Number
                </label>
                <input
                  id="license"
                  name="license"
                  type="text"
                  placeholder="Driving License Number"
                  value={formData.license}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="region" className={labelClasses}>
                    Your Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none`}
                    required
                  >
                    <option value="" disabled>
                      Select your Region
                    </option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="district" className={labelClasses}>
                    Your District
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!formData.region}
                    className={`${inputClasses} appearance-none disabled:cursor-not-allowed disabled:opacity-60`}
                    required
                  >
                    <option value="" disabled>
                      Select your District
                    </option>
                    {(districtsByRegion[formData.region] || []).map(
                      (district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="nid" className={labelClasses}>
                  NID No
                </label>
                <input
                  id="nid"
                  name="nid"
                  type="text"
                  placeholder="NID"
                  value={formData.nid}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClasses}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="bikeModel" className={labelClasses}>
                  Bike Brand Model and Year
                </label>
                <input
                  id="bikeModel"
                  name="bikeModel"
                  type="text"
                  placeholder="Bike Brand Model and Year"
                  value={formData.bikeModel}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="bikeRegistration" className={labelClasses}>
                  Bike Registration Number
                </label>
                <input
                  id="bikeRegistration"
                  name="bikeRegistration"
                  type="text"
                  placeholder="Bike Registration Number"
                  value={formData.bikeRegistration}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-[#03373D] py-3 text-sm font-semibold text-white transition hover:bg-[#03373D]/90 sm:w-auto sm:px-10"
              >
                Submit Application
              </button>
            </form>
          </div>

          {/* Right column: illustration */}
          <div className="hidden items-start justify-center lg:flex">
            <img
              src="/agent-pending.png"
              alt="Delivery rider on a scooter holding a parcel"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rider;
