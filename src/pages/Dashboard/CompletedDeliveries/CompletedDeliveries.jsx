import React, { useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye } from "react-icons/fa";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const detailsModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", "completed", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=delivered`,
      );
      return res.data;
    },
  });

  const calculatedPayout = (parcel) => {
    const cost = Number(parcel.cost) || 0;
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return cost * 0.8;
    }
    return cost * 0.6;
  };

  const totalEarned = parcels.reduce(
    (sum, parcel) => sum + calculatedPayout(parcel),
    0,
  );

  const openDetailsModal = (parcel) => {
    setSelectedParcel(parcel);
    detailsModalRef.current.showModal();
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Completed Deliveries</h2>
        <span className="text-sm text-base-content/60">
          {parcels.length} delivered · ৳{totalEarned.toFixed(2)} earned
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-box border border-base-content/10 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Receiver</th>
              <th>District</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  <span className="loading loading-spinner loading-md" />
                </td>
              </tr>
            )}

            {!isLoading && parcels.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-base-content/60"
                >
                  No completed deliveries yet.
                </td>
              </tr>
            )}

            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="font-mono text-xs">{parcel.trackingId}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>৳{parcel.cost}</td>
                <td className="font-semibold text-emerald-700">
                  ৳{calculatedPayout(parcel).toFixed(2)}
                </td>
                <td>
                  <span className="badge badge-success badge-sm">
                    Delivered
                  </span>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => openDetailsModal(parcel)}
                    className="btn btn-xs btn-square btn-outline hover:bg-gray-100 active:bg-gray-100"
                    title="View Details"
                  >
                    <FaEye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {isLoading && (
          <div className="flex justify-center py-6">
            <span className="loading loading-spinner loading-md" />
          </div>
        )}

        {!isLoading && parcels.length === 0 && (
          <p className="text-center py-6 text-base-content/60">
            No completed deliveries yet.
          </p>
        )}

        {parcels.map((parcel) => (
          <div
            key={parcel._id}
            className="rounded-box border border-base-content/10 bg-base-100 p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-mono text-xs text-base-content/60">
                {parcel.trackingId}
              </span>
              <span className="badge badge-success badge-sm">Delivered</span>
            </div>

            <div className="grid grid-cols-2 gap-y-1 text-sm mb-3">
              <span className="text-base-content/60">Receiver</span>
              <span>{parcel.receiverName}</span>

              <span className="text-base-content/60">District</span>
              <span>{parcel.receiverDistrict}</span>

              <span className="text-base-content/60">Cost</span>
              <span>৳{parcel.cost}</span>

              <span className="text-base-content/60">Payout</span>
              <span className="font-semibold text-emerald-700">
                ৳{calculatedPayout(parcel).toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => openDetailsModal(parcel)}
              className="btn btn-xs btn-outline w-full"
            >
              <FaEye className="w-3.5 h-3.5" /> View Details
            </button>
          </div>
        ))}
      </div>

      {/* View Details Modal */}
      <dialog
        ref={detailsModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-lg">
          <h3 className="font-bold text-lg mb-1">Delivery Details</h3>
          {selectedParcel && (
            <>
              <p className="text-xs font-mono text-base-content/60 mb-4">
                {selectedParcel.trackingId}
              </p>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-base-content/70 uppercase text-xs mb-2">
                    Parcel Info
                  </h4>
                  <div className="grid grid-cols-2 gap-y-1">
                    <span className="text-base-content/60">Type</span>
                    <span className="capitalize">
                      {selectedParcel.parcelType}
                    </span>

                    <span className="text-base-content/60">Name</span>
                    <span>{selectedParcel.parcelName}</span>

                    <span className="text-base-content/60">Weight</span>
                    <span>{selectedParcel.parcelWeight} kg</span>

                    <span className="text-base-content/60">Cost</span>
                    <span>৳{selectedParcel.cost}</span>

                    <span className="text-base-content/60">Your Payout</span>
                    <span className="font-semibold text-emerald-700">
                      ৳{calculatedPayout(selectedParcel).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="divider my-1" />

                <div>
                  <h4 className="font-semibold text-base-content/70 uppercase text-xs mb-2">
                    Sender
                  </h4>
                  <div className="grid grid-cols-2 gap-y-1">
                    <span className="text-base-content/60">Name</span>
                    <span>{selectedParcel.senderName}</span>

                    <span className="text-base-content/60">Phone</span>
                    <span>{selectedParcel.senderPhoneNumber}</span>

                    <span className="text-base-content/60">District</span>
                    <span>{selectedParcel.senderDistrict}</span>

                    <span className="text-base-content/60">Address</span>
                    <span>{selectedParcel.senderAddress}</span>
                  </div>
                </div>

                <div className="divider my-1" />

                <div>
                  <h4 className="font-semibold text-base-content/70 uppercase text-xs mb-2">
                    Receiver
                  </h4>
                  <div className="grid grid-cols-2 gap-y-1">
                    <span className="text-base-content/60">Name</span>
                    <span>{selectedParcel.receiverName}</span>

                    <span className="text-base-content/60">Phone</span>
                    <span>{selectedParcel.receiverPhoneNumber}</span>

                    <span className="text-base-content/60">District</span>
                    <span>{selectedParcel.receiverDistrict}</span>

                    <span className="text-base-content/60">Address</span>
                    <span>{selectedParcel.receiverAddress}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 active:bg-gray-100">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CompletedDeliveries;
