import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const riderRegion = useWatch({ control, name: "riderRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleBeRider = (data) => {
    console.log(data);
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

            <form
              onSubmit={handleSubmit(handleBeRider)}
              className="mt-6 space-y-5"
            >
              <div>
                <label htmlFor="name" className={labelClasses}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={inputClasses}
                  {...register("riderName", { required: true })}
                />
                {errors.riderName?.type === "required" && (
                  <p className="text-[#c1121f] text-sm">Name is required</p>
                )}
              </div>

              <div>
                <label htmlFor="license" className={labelClasses}>
                  Driving License Number
                </label>
                <input
                  type="text"
                  placeholder="Driving License Number"
                  className={inputClasses}
                  {...register("licenseNumber", { required: true })}
                />
                {errors.licenseNumber?.type === "required" && (
                  <p className="text-[#c1121f] text-sm">
                    Driving License Number is required
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  defaultValue={user?.email}
                  className={inputClasses}
                  {...register("riderEmail", { required: true })}
                />
                {errors.riderEmail?.type === "required" && (
                  <p className="text-[#c1121f] text-sm">
                    Your Email is required
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="region" className={labelClasses}>
                    Your Region
                  </label>
                  <select
                    {...register("riderRegion", { required: true })}
                    className={`${inputClasses} appearance-none`}
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
                  {errors.riderRegion?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Please select a region
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="district" className={labelClasses}>
                    Your District
                  </label>
                  <select
                    {...register("riderDistrict", { required: true })}
                    className={`${inputClasses} appearance-none disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    <option value="" disabled>
                      Select your District
                    </option>
                    {districtsByRegion(riderRegion).map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="nid" className={labelClasses}>
                  NID No
                </label>
                <input
                  type="text"
                  placeholder="NID"
                  className={inputClasses}
                  {...register("riderNid", { required: true })}
                />
                {errors.riderNid?.type === "required" && (
                  <p className="text-[#c1121f] text-sm">
                    Please provide the rider's NID Number.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className={labelClasses}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={inputClasses}
                  {...register("riderPhoneNumber", { required: true })}
                />
                {errors.riderPhoneNumber?.type === "required" && (
                  <p className="text-[#c1121f] text-sm">
                    Please provide the rider's Phone Number.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="bikeModel" className={labelClasses}>
                  Bike Brand Model and Year
                </label>
                <input
                  type="text"
                  placeholder="Bike Brand Model and Year"
                  className={inputClasses}
                  {...register("bikeBrand", { required: true })}
                />
                {errors.bikeBrand?.type === "required" && (
                  <p className="text-[#c1121f] text-sm">
                    Please provide Bike Brand Model and Year.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="bikeRegistration" className={labelClasses}>
                  Bike Registration Number
                </label>
                <input
                  type="text"
                  placeholder="Bike Registration Number"
                  className={inputClasses}
                  {...register("bikeRegistrationNumber", { required: true })}
                />
                {errors.bikeRegistrationNumber?.type === "required" && (
                  <p className="text-[#c1121f] text-sm">
                    Please provide the Bike Registration Numbe.
                  </p>
                )}
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
