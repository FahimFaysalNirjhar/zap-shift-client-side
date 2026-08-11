import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { PiMotorcycleFill } from "react-icons/pi";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();
  const detailsModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [assigningId, setAssigningId] = useState(null);

  const {
    data: parcels = [],
    isLoading: parcelsLoading,
    refetch: parcelRefetch,
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup",
      );
      return res.data;
    },
  });

  const {
    data: riders = [],
    isLoading: ridersLoading,
    isError: ridersError,
  } = useQuery({
    queryKey: ["riders", "available", selectedParcel?.senderDistrict],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=accepted&district=${selectedParcel.senderDistrict}&workStatus=available`,
      );
      return res.data;
    },
  });

  const openDetailsModal = (parcel) => {
    setSelectedParcel(parcel);
    detailsModalRef.current.showModal();
  };

  const openFindRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = (rider) => {
    if (!selectedParcel) return;
    setAssigningId(rider._id);

    const riderInfo = {
      riderId: rider._id,
      riderEmail: rider.riderEmail,
      riderName: rider.riderName,
      deliveryStatus: "rider-assigned",
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          parcelRefetch();
          riderModalRef.current.close();
          Swal.fire({
            title: "Rider Assigned!",
            text: `${rider.riderName} has been assigned to this parcel.`,
            icon: "success",
            confirmButtonText: "Okay",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Failed to assign rider",
          text: "Please try again.",
          icon: "error",
        });
      })
      .finally(() => setAssigningId(null));
  };

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Assign Riders</h2>

      <div className="overflow-x-auto rounded-box border border-base-content/10 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>District</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcelsLoading && (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  <span className="loading loading-spinner loading-md"></span>
                </td>
              </tr>
            )}

            {!parcelsLoading && parcels.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-base-content/60"
                >
                  No parcels pending pickup.
                </td>
              </tr>
            )}

            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td className="font-mono text-xs whitespace-nowrap">
                  {parcel.trackingId}
                </td>
                <td className="whitespace-nowrap">{parcel.senderName}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.receiverName}</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <span className="badge badge-warning badge-sm whitespace-nowrap">
                    {parcel.deliveryStatus}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => openDetailsModal(parcel)}
                      className="btn btn-xs btn-square btn-outline hover:bg-gray-100 active:bg-gray-100"
                      title="View Details"
                    >
                      <FaEye className="w-3.5 h-3.5 " />
                    </button>
                    <button
                      onClick={() => openFindRiderModal(parcel)}
                      className="btn btn-xs bg-emerald-600 hover:bg-emerald-700 text-white border-none"
                    >
                      <PiMotorcycleFill className="w-4 h-4" />
                      Find Rider
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      <dialog
        ref={detailsModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Parcel Details</h3>
          {selectedParcel && (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Tracking ID:</span>{" "}
                {selectedParcel.trackingId}
              </p>
              <p>
                <span className="font-semibold">Sender:</span>{" "}
                {selectedParcel.senderName} ({selectedParcel.senderDistrict})
              </p>
              <p>
                <span className="font-semibold">Receiver:</span>{" "}
                {selectedParcel.receiverName} ({selectedParcel.receiverDistrict}
                )
              </p>
              <p>
                <span className="font-semibold">Weight:</span>{" "}
                {selectedParcel.weight ?? "N/A"} kg
              </p>
              <p>
                <span className="font-semibold">Cost:</span> ৳
                {selectedParcel.cost}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedParcel.deliveryStatus}
              </p>
            </div>
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

      {/* Find Rider Modal */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-1">Available Riders</h3>
          <p className="text-sm text-base-content/60 mb-4 whitespace-nowrap">
            District: {selectedParcel?.senderDistrict}
          </p>

          {ridersLoading && (
            <div className="flex justify-center py-6">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          )}

          {ridersError && (
            <p className="text-error text-sm py-4">
              Failed to load riders. Try again.
            </p>
          )}

          {!ridersLoading && !ridersError && riders.length === 0 && (
            <p className="text-center py-6 text-base-content/60">
              No available riders in this district right now.
            </p>
          )}

          {!ridersLoading && riders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Bike</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider) => (
                    <tr key={rider._id}>
                      <td className="whitespace-nowrap">{rider.riderName}</td>
                      <td className="text-xs whitespace-nowrap">
                        {rider.riderEmail}
                      </td>
                      <td className="whitespace-nowrap">
                        {rider.bikeBrand ?? "-"}
                      </td>
                      <td>
                        <button
                          onClick={() => handleAssignRider(rider)}
                          disabled={assigningId === rider._id}
                          className="btn btn-xs btn-success whitespace-nowrap"
                        >
                          {assigningId === rider._id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            "Assign Rider"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default AssignRiders;
