import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheck, FaTimes, FaBoxOpen, FaFlagCheckered } from "react-icons/fa";

const STATUS_LABELS = {
  rider_assigned: "Awaiting Response",
  rider_accepted: "Accepted",
  picked_up: "Picked Up",
  delivered: "Delivered",
};

const STATUS_BADGE_CLASS = {
  rider_assigned: "badge-warning",
  rider_accepted: "badge-info",
  picked_up: "badge-primary text-black",
  delivered: "badge-success",
};

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [updatingId, setUpdatingId] = useState(null);

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", "assigned", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=rider_assigned,rider_accepted,picked_up`,
      );
      return res.data;
    },
  });

  const updateStatus = (parcel, newStatus, successMsg) => {
    setUpdatingId(parcel._id);
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, {
        deliveryStatus: newStatus,
        riderId: parcel.riderId,
        trackingId: parcel.trackingId,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: successMsg,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Something went wrong. Try again.",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      })
      .finally(() => setUpdatingId(null));
  };

  const handleAcceptDelivery = (parcel) =>
    updateStatus(parcel, "rider_accepted", "Delivery accepted");

  const handleRejectDelivery = (parcel) => {
    Swal.fire({
      title: "Reject this delivery?",
      text: "This parcel will go back to the unassigned pool.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      confirmButtonColor: "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(parcel, "pending-pickup", "Delivery rejected");
      }
    });
  };

  const handleMarkPickedUp = (parcel) =>
    updateStatus(parcel, "picked_up", "Marked as picked up");

  const handleMarkDelivered = (parcel) =>
    updateStatus(parcel, "delivered", "Marked as delivered");

  const renderActions = (parcel) => {
    const busy = updatingId === parcel._id;

    if (parcel.deliveryStatus === "rider_assigned") {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleAcceptDelivery(parcel)}
            disabled={busy}
            className="btn btn-xs bg-emerald-600 hover:bg-emerald-700 text-white border-none flex-1"
          >
            {busy ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <>
                <FaCheck className="w-3 h-3" /> Accept
              </>
            )}
          </button>
          <button
            onClick={() => handleRejectDelivery(parcel)}
            disabled={busy}
            className="btn btn-xs bg-white text-rose-600 border border-rose-300 hover:bg-rose-50 flex-1"
          >
            <FaTimes className="w-3 h-3" /> Reject
          </button>
        </div>
      );
    }

    if (parcel.deliveryStatus === "rider_accepted") {
      return (
        <button
          onClick={() => handleMarkPickedUp(parcel)}
          disabled={busy}
          className="btn btn-xs bg-blue-600 hover:bg-blue-700 text-white border-none w-full"
        >
          {busy ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <>
              <FaBoxOpen className="w-3 h-3" /> Mark as Picked Up
            </>
          )}
        </button>
      );
    }

    if (parcel.deliveryStatus === "picked_up") {
      return (
        <button
          onClick={() => handleMarkDelivered(parcel)}
          disabled={busy}
          className="btn btn-xs bg-emerald-600 hover:bg-emerald-700 text-white border-none w-full"
        >
          {busy ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <>
              <FaFlagCheckered className="w-3 h-3" /> Mark as Delivered
            </>
          )}
        </button>
      );
    }

    return (
      <span className="badge badge-success badge-sm w-full">Delivered</span>
    );
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Assigned Deliveries</h2>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-box border border-base-content/10 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Receiver</th>
              <th>District</th>
              <th>Cost</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  <span className="loading loading-spinner loading-md" />
                </td>
              </tr>
            )}

            {!isLoading && parcels.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-base-content/60"
                >
                  No deliveries assigned right now.
                </td>
              </tr>
            )}

            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="font-mono text-xs">{parcel.trackingId}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <span
                    className={`badge badge-sm whitespace-nowrap ${
                      STATUS_BADGE_CLASS[parcel.deliveryStatus] ?? "badge-ghost"
                    }`}
                  >
                    {STATUS_LABELS[parcel.deliveryStatus] ??
                      parcel.deliveryStatus}
                  </span>
                </td>
                <td className="w-56">{renderActions(parcel)}</td>
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
            No deliveries assigned right now.
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
              <span
                className={`badge badge-sm whitespace-nowrap ${
                  STATUS_BADGE_CLASS[parcel.deliveryStatus] ?? "badge-ghost"
                }`}
              >
                {STATUS_LABELS[parcel.deliveryStatus] ?? parcel.deliveryStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-1 text-sm mb-3">
              <span className="text-base-content/60">Receiver</span>
              <span>{parcel.receiverName}</span>

              <span className="text-base-content/60">District</span>
              <span>{parcel.receiverDistrict}</span>

              <span className="text-base-content/60">Cost</span>
              <span>৳{parcel.cost}</span>
            </div>

            {renderActions(parcel)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedDeliveries;
