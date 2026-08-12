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
        "/parcels?deliveryStatus=pending_pickup",
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
      deliveryStatus: "rider_assigned",
      trackingId: selectedParcel.trackingId,
    };

    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          riderModalRef.current.close();
          parcelRefetch();

          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: `${rider.riderName} assigned successfully`,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Failed to assign rider",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
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
        <div className="modal-box max-w-lg">
          <h3 className="font-bold text-lg mb-1">Parcel Details</h3>
          {selectedParcel && (
            <>
              <p className="text-xs font-mono text-base-content/60 mb-4">
                {selectedParcel.trackingId}
              </p>

              <div className="space-y-4 text-sm">
                {/* Parcel Info */}
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

                    <span className="text-base-content/60">Paid</span>
                    <span>
                      <span
                        className={`badge badge-sm ${
                          selectedParcel.isPaid
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {selectedParcel.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </span>

                    <span className="text-base-content/60">Status</span>
                    <span className="badge badge-warning badge-sm">
                      {selectedParcel.deliveryStatus}
                    </span>

                    <span className="text-base-content/60">Created</span>
                    <span>
                      {new Date(selectedParcel.creation_date).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="divider my-1" />

                {/* Sender Info */}
                <div>
                  <h4 className="font-semibold text-base-content/70 uppercase text-xs mb-2">
                    Sender
                  </h4>
                  <div className="grid grid-cols-2 gap-y-1">
                    <span className="text-base-content/60">Name</span>
                    <span>{selectedParcel.senderName}</span>

                    <span className="text-base-content/60">Email</span>
                    <span className="truncate">
                      {selectedParcel.senderEmail}
                    </span>

                    <span className="text-base-content/60">Phone</span>
                    <span>{selectedParcel.senderPhoneNumber}</span>

                    <span className="text-base-content/60">Region</span>
                    <span>{selectedParcel.senderRegion}</span>

                    <span className="text-base-content/60">District</span>
                    <span>{selectedParcel.senderDistrict}</span>

                    <span className="text-base-content/60">Address</span>
                    <span>{selectedParcel.senderAddress}</span>

                    <span className="text-base-content/60">Instruction</span>
                    <span>{selectedParcel.pickUpInstruction}</span>
                  </div>
                </div>

                <div className="divider my-1" />

                {/* Receiver Info */}
                <div>
                  <h4 className="font-semibold text-base-content/70 uppercase text-xs mb-2">
                    Receiver
                  </h4>
                  <div className="grid grid-cols-2 gap-y-1">
                    <span className="text-base-content/60">Name</span>
                    <span>{selectedParcel.receiverName}</span>

                    <span className="text-base-content/60">Email</span>
                    <span className="truncate">
                      {selectedParcel.receiverEmail}
                    </span>

                    <span className="text-base-content/60">Phone</span>
                    <span>{selectedParcel.receiverPhoneNumber}</span>

                    <span className="text-base-content/60">Region</span>
                    <span>{selectedParcel.receiverRegion}</span>

                    <span className="text-base-content/60">District</span>
                    <span>{selectedParcel.receiverDistrict}</span>

                    <span className="text-base-content/60">Address</span>
                    <span>{selectedParcel.receiverAddress}</span>

                    <span className="text-base-content/60">Instruction</span>
                    <span>{selectedParcel.deliveryInstruction}</span>
                  </div>
                </div>

                {/* Rider Info — only shows once assigned */}
                {selectedParcel.riderName && (
                  <>
                    <div className="divider my-1" />
                    <div>
                      <h4 className="font-semibold text-base-content/70 uppercase text-xs mb-2">
                        Assigned Rider
                      </h4>
                      <div className="grid grid-cols-2 gap-y-1">
                        <span className="text-base-content/60">Name</span>
                        <span>{selectedParcel.riderName}</span>

                        <span className="text-base-content/60">Email</span>
                        <span className="truncate">
                          {selectedParcel.riderEmail}
                        </span>
                      </div>
                    </div>
                  </>
                )}
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
