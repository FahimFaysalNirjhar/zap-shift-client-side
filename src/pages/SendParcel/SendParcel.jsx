import React, { useState } from "react";

const DISTRICTS = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh",
  "Gazipur",
  "Narayanganj",
  "Comilla",
  "Cox's Bazar",
  "Jessore",
  "Bogura",
  "Dinajpur",
];

const SendParcel = () => {
  const [parcelType, setParcelType] = useState("document");

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

        {/* Parcel Type Toggle */}
        <div className="flex gap-8 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="parcelType"
              className="radio radio-success"
              checked={parcelType === "document"}
              onChange={() => setParcelType("document")}
            />
            <span className="font-medium text-gray-700">Document</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="parcelType"
              className="radio radio-success"
              checked={parcelType === "not-document"}
              onChange={() => setParcelType("not-document")}
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
            />
          </div>
          <div>
            <label className="label text-sm font-medium text-gray-700 mb-1 block">
              Parcel Weight (KG)
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Parcel Weight (KG)"
            />
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
                />
              </div>
              <div>
                <label className="label text-sm font-medium text-gray-700 mb-1 block">
                  Address
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Address"
                />
              </div>
              <div>
                <label className="label text-sm font-medium text-gray-700 mb-1 block">
                  Sender Phone No
                </label>
                <input
                  type="tel"
                  className="input input-bordered w-full"
                  placeholder="Sender Phone No"
                />
              </div>
              <div>
                <label className="label text-sm font-medium text-gray-700 mb-1 block">
                  Your District
                </label>
                <select className="select select-bordered w-full">
                  <option value="" disabled selected>
                    Select your District
                  </option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label text-sm font-medium text-gray-700 mb-1 block">
                  Pickup Instruction
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-28"
                  placeholder="Pickup Instruction"
                />
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
                  placeholder="Sender Name"
                />
              </div>
              <div>
                <label className="label text-sm font-medium text-gray-700 mb-1 block">
                  Receiver Address
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Address"
                />
              </div>
              <div>
                <label className="label text-sm font-medium text-gray-700 mb-1 block">
                  Receiver Contact No
                </label>
                <input
                  type="tel"
                  className="input input-bordered w-full"
                  placeholder="Sender Contact No"
                />
              </div>
              <div>
                <label className="label text-sm font-medium text-gray-700 mb-1 block">
                  Receiver District
                </label>
                <select className="select select-bordered w-full">
                  <option value="" disabled selected>
                    Select your District
                  </option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label text-sm font-medium text-gray-700 mb-1 block">
                  Delivery Instruction
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-28"
                  placeholder="Delivery Instruction"
                />
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
      </div>
    </div>
  );
};

export default SendParcel;
