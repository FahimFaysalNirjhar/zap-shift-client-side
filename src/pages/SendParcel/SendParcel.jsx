import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user);

  const serviceCenters = useLoaderData();

  const regionsDuplicate = serviceCenters.map((c) => c.region);

  const regions = [...new Set(regionsDuplicate)];
  console.log(regions);

  const senderRegion = watch("senderRegion");

  const receiverRegion = watch("receiverRegion");

  const handleSendParcel = (data) => {
    console.log(data);

    const isDocument = data.parcelType === "document";
    const isSameDistrice = data.senderDistric === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrice ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrice ? 110 : 150;
      } else {
        const minimunCost = isSameDistrice ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCost = isSameDistrice
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minimunCost + extraCost;
      }
    }

    const parcelData = {
      ...data,
      cost,
      creation_date: new Date().toISOString(),
    };

    Swal.fire({
      title: "Confirm Parcel",
      text: `Are you sure you want to proceed with this parcel? The delivery cost is ৳${cost}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm",
    }).then((result) => {
      if (result.isConfirmed)
        axiosSecure.post("/parcels", parcelData).then((res) => {
          console.log("after parcel saved to database", res);
        });

      // Swal.fire({
      //   title: "Deleted!",
      //   text: "Your file has been deleted.",
      //   icon: "success",
      // });
    });
  };

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region == region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-12 relative ">
      <div className="bg-base-100 shadow-sm lg:rounded-2xl  px-4 py-6 lg:px-6 lg:py-9">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-[#0d2b3e] mb-2">
          Send A Parcel
        </h1>
        <h2 className="text-lg font-semibold text-[#0d2b3e] mb-6">
          Enter your parcel details
        </h2>
        <form onSubmit={handleSubmit(handleSendParcel)}>
          {/* Parcel Type Toggle */}
          <div className="flex gap-8 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="radio radio-success"
                value="document"
                {...register("parcelType")}
                defaultChecked
              />
              <span className="font-medium text-gray-700">Document</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="radio radio-success"
                value="non-document"
                {...register("parcelType")}
              />
              <span className="font-medium text-gray-700">Not-Document</span>
            </label>
          </div>

          {/* Parcel Name & Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="label text-sm font-medium text-gray-700 mb-1 block">
                Parcel Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Parcel Name"
                {...register("parcelName", { required: true })}
              />
              {errors.parcelName?.type === "required" && (
                <p className="text-[#c1121f] text-sm">Name is required</p>
              )}
            </div>
            <div>
              <label className="label text-sm font-medium text-gray-700 mb-1 block">
                Parcel Weight (KG)
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Parcel Weight (KG)"
                {...register("parcelWeight", { required: true })}
              />
              {errors.parcelName?.type === "required" && (
                <p className="text-[#c1121f] text-sm">
                  Please enter the parcel weight
                </p>
              )}
            </div>
          </div>

          <div className="divider"></div>

          {/* Sender & Receiver Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {/* Sender Details */}
            <div>
              <h3 className="text-lg font-bold text-[#1a7a4a] mb-4">
                Sender Details
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Sender Name"
                    defaultValue={user?.displayName}
                    {...register("senderName", { required: true })}
                  />
                  {errors.senderName?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Sender Name is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Sender Email
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Sender Email"
                    defaultValue={user?.email}
                    {...register("senderEmail", { required: true })}
                  />
                  {errors.senderEmail?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Sender Email is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Sender Phone No
                  </label>
                  <input
                    type="tel"
                    className="input input-bordered w-full"
                    placeholder="Sender Phone No"
                    {...register("senderPhoneNumber", { required: true })}
                  />
                  {errors.senderPhoneNumber?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Please enter the sender's phone number.
                    </p>
                  )}
                </div>
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Select Region
                  </label>
                  <select
                    {...register("senderRegion", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled selected>
                      Please select a region
                    </option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.senderRegion?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Please select a region
                    </p>
                  )}
                </div>
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Select District
                  </label>
                  <select
                    {...register("senderDistrict", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled selected>
                      Please select a District
                    </option>
                    {districtsByRegion(senderRegion).map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.senderDistrict?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Please select a District
                    </p>
                  )}
                </div>
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Sender Address
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Address"
                    {...register("senderAddress", { required: true })}
                  />
                  {errors.senderAddress?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Please provide the sender's address.
                    </p>
                  )}
                </div>
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Pickup Instruction
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-28"
                    placeholder="Pickup Instruction"
                    {...register("pickUpInstruction")}
                  />
                  <p className="label text-sm">*optional</p>
                </div>
              </div>
            </div>

            {/* Receiver Details */}
            <div>
              <h3 className="text-lg font-bold text-[#1a7a4a] mb-4">
                Receiver Details
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Receiver Name"
                    {...register("receiverName", { required: true })}
                  />
                  {errors.receiverName?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Receiver Name is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Receiver Email
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Receiver Email"
                    {...register("receiverEmail", { required: true })}
                  />
                  {errors.receiverName?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Receiver Email is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Receiver Phone No
                  </label>
                  <input
                    type="tel"
                    className="input input-bordered w-full"
                    placeholder="Sender Contact No"
                    {...register("receiverPhoneNumber", { required: true })}
                  />
                  {errors.receiverName?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Receiver phone number is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Select Region
                  </label>
                  <select
                    {...register("receiverRegion", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled selected>
                      Please select a region
                    </option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.receiverRegion?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Please select a region
                    </p>
                  )}
                </div>
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Select District
                  </label>
                  <select
                    {...register("receiverDistrict", { required: true })}
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled selected>
                      Please select a District
                    </option>
                    {districtsByRegion(receiverRegion).map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  {errors.receiverDistrict?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Please select a District
                    </p>
                  )}
                </div>
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Receiver Address
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Address"
                    {...register("receiverAddress", { required: true })}
                  />
                  {errors.receiverAddress?.type === "required" && (
                    <p className="text-[#c1121f] text-sm">
                      Please provide the receiver's address.
                    </p>
                  )}
                </div>
                <div>
                  <label className="label text-sm font-medium text-gray-700 mb-1 block">
                    Delivery Instruction
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-28"
                    placeholder="Delivery Instruction"
                    {...register("deliveryInstruction")}
                  />
                  <p className="label text-sm">*optional</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Time Note */}
          <div className="mt-6">
            <span className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded">
              * PickUp Time 4pm–7pm Approx.
            </span>
          </div>

          <div className="text-center">
            <button className="btn btn-wide text-black bg-primary border-0 my-6">
              Proceed To Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
