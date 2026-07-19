import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: parcel = [] } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handlePayment = async (parcel) => {
    const parcelInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      name: parcel.parcelName,
    };
    const res = await axiosSecure.post("/create-checkout-session", parcelInfo);
    window.location.href = res.data.url;
  };

  return (
    <div className="w-full">
      <div className="max-w-2xl mx-auto my-10 px-4">
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-1">Confirm Payment</h2>
            <p className="text-sm text-base-content/60 mb-6">
              Review your parcel details before proceeding to checkout.
            </p>

            {/* Parcel summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <p className="text-base-content/50">Parcel Name</p>
                <p className="font-medium capitalize">{parcel.parcelName}</p>
              </div>
              <div>
                <p className="text-base-content/50">Parcel Type</p>
                <p className="font-medium capitalize badge badge-outline">
                  {parcel.parcelType}
                </p>
              </div>
              <div>
                <p className="text-base-content/50">Weight</p>
                <p className="font-medium">{parcel.parcelWeight} kg</p>
              </div>
              <div>
                <p className="text-base-content/50">Tracking ID</p>
                <p className="font-mono text-xs break-all">{parcel._id}</p>
              </div>
            </div>

            <div className="divider my-2"></div>

            {/* Sender / Receiver */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold mb-1">Sender</p>
                <p>{parcel.senderName}</p>
                <p className="text-base-content/60">{parcel.senderEmail}</p>
                <p className="text-base-content/60">
                  {parcel.senderPhoneNumber}
                </p>
                <p className="text-base-content/60">
                  {parcel.senderAddress}, {parcel.senderDistrict},{" "}
                  {parcel.senderRegion}
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Receiver</p>
                <p>{parcel.receiverName}</p>
                <p className="text-base-content/60">{parcel.receiverEmail}</p>
                <p className="text-base-content/60">
                  {parcel.receiverPhoneNumber}
                </p>
                <p className="text-base-content/60">
                  {parcel.receiverAddress}, {parcel.receiverDistrict},{" "}
                  {parcel.receiverRegion}
                </p>
              </div>
            </div>

            <div className="divider my-2"></div>

            {/* Cost + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/50 text-sm">Total Cost</p>
                <p className="text-3xl font-bold text-primary">
                  ৳{parcel.cost}
                </p>
              </div>
              <button
                onClick={() => handlePayment(parcel)}
                className="btn btn-primary btn-lg"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
