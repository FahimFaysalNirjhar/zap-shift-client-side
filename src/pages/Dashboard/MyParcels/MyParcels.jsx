import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

// --- Sample data shaped exactly like your API response ---
// Swap this for a TanStack Query / fetch call to
// GET /parcels?email=<user email> once wired to the backend.
// const sampleParcels = [
//   {
//     _id: "6a5256a27486546a0956c026",
//     parcelType: "non-document",
//     parcelName: "mango",
//     parcelWeight: "24",
//     senderName: "Fahim Faysal",
//     senderEmail: "fahimfaysal1997@gmail.com",
//     senderPhoneNumber: "0170000114",
//     senderRegion: "Rangpur",
//     senderDistrict: "Rangpur",
//     senderAddress: "Dhaka",
//     pickUpInstruction: "pickup test Instruction",
//     receiverName: "Nesad",
//     receiverEmail: "nesadIslam6606@gmail.com",
//     receiverPhoneNumber: "0170001124",
//     receiverRegion: "Rajshahi",
//     receiverDistrict: "Rajshahi",
//     receiverAddress: "Dhaka",
//     deliveryInstruction: "Delivery test Instruction",
//     cost: 1030,
//     isPaid: true,
//     status: "in-transit",
//     creation_date: "2026-07-11T14:38:44.664Z",
//   },
//   {
//     _id: "6a5256a27486546a0956c027",
//     parcelType: "document",
//     parcelName: "Land papers",
//     parcelWeight: "0.5",
//     senderName: "Fahim Faysal",
//     senderEmail: "fahimfaysal1997@gmail.com",
//     senderPhoneNumber: "0170000114",
//     senderRegion: "Rangpur",
//     senderDistrict: "Rangpur",
//     senderAddress: "Dhaka",
//     pickUpInstruction: "",
//     receiverName: "Shakil",
//     receiverEmail: "shakil@example.com",
//     receiverPhoneNumber: "01773689877",
//     receiverRegion: "Panchagarh",
//     receiverDistrict: "Panchagarh Sadar",
//     receiverAddress: "Lalmatia",
//     deliveryInstruction: "",
//     cost: 121,
//     isPaid: false,
//     status: "pending",
//     creation_date: "2026-07-09T09:12:10.000Z",
//   },
// ];

// Icon set kept in the same stroke/tabler style as DashboardLayout
const Icon = {
  eye: (
    <svg
      viewBox="0 0 24 24"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      fill="none"
      stroke="currentColor"
      className="size-4"
    >
      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
    </svg>
  ),
  edit: (
    <svg
      viewBox="0 0 24 24"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      fill="none"
      stroke="currentColor"
      className="size-4"
    >
      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
      <path d="M16 5l3 3" />
    </svg>
  ),
  trash: (
    <svg
      viewBox="0 0 24 24"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      fill="none"
      stroke="currentColor"
      className="size-4"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  ),
  box: (
    <svg
      viewBox="0 0 24 24"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      fill="none"
      stroke="currentColor"
      className="size-5"
    >
      <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" />
      <path d="M12 12l8 -4.5" />
      <path d="M12 12v9" />
      <path d="M12 12l-8 -4.5" />
    </svg>
  ),
  close: (
    <svg
      viewBox="0 0 24 24"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      fill="none"
      stroke="currentColor"
      className="size-5"
    >
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  ),
  inbox: (
    <svg
      viewBox="0 0 24 24"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="1.5"
      fill="none"
      stroke="currentColor"
      className="size-10"
    >
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M4 13h3.5l1.5 2h6l1.5 -2h3.5" />
    </svg>
  ),
};

const STATUS_META = {
  pending: { label: "Pending", classes: "bg-amber-50 text-amber-700" },
  "in-transit": { label: "In Transit", classes: "bg-sky-50 text-sky-700" },
  delivered: { label: "Delivered", classes: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Cancelled", classes: "bg-rose-50 text-rose-700" },
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const MyParcels = () => {
  //  const [parcels, setParcels] = useState(parcels);
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const stats = [
    {
      label: "Total Parcels",
      value: parcels.length,
    },
    {
      label: "Documents",
      value: parcels.filter((p) => p.parcelType === "document").length,
    },
    {
      label: "Non Documents",
      value: parcels.filter((p) => p.parcelType === "non-document").length,
    },
    {
      label: "Total Cost",
      value: `৳${parcels.reduce((sum, p) => sum + Number(p.cost || 0), 0)}`,
    },
  ];

  const handleDeleteConfirm = (id) => {
    console.log(id);
    setDeleting(null);
    // TODO: call DELETE /parcels/:id here, then refetch or drop from cache
    axiosSecure.delete(`http://localhost:5000/parcels/${id}`).then((res) => {
      if (res.data.deletedCount) {
        Swal.fire({
          title: "Deleted!",
          text: "Your parcel request has been deleted successfully. ✅",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#113a3a]">
          My Parcels
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track every parcel you've booked, from pickup to delivery.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3"
          >
            <div className="shrink-0 size-10 rounded-full bg-[#eef8ea] text-[#5a9c1f] flex items-center justify-center">
              {Icon.box}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 truncate">{s.label}</p>
              <p className="text-xl font-bold text-[#113a3a]">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {parcels.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="text-gray-300 mb-3">{Icon.inbox}</div>
            <p className="font-semibold text-[#113a3a]">No parcels yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Parcels you send will show up here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="px-4 sm:px-6 py-3 font-medium">Parcel Info</th>
                  <th className="px-4 sm:px-6 py-3 font-medium hidden md:table-cell">
                    Receiver Info
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-medium">Cost</th>
                  <th className="px-4 sm:px-6 py-3 font-medium hidden lg:table-cell">
                    Date
                  </th>
                  <th className="px-4 sm:px-6 py-3 font-medium text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {parcels.map((p) => {
                  return (
                    <tr key={p._id} className="hover:bg-gray-50/60">
                      <td className="px-4 sm:px-6 py-4">
                        <p className="font-semibold text-[#113a3a] capitalize">
                          {p.parcelName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 capitalize">
                          {p.parcelType} &middot; {p.parcelWeight}kg
                        </p>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        <p className="font-medium text-gray-700">
                          {p.receiverName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {p.receiverDistrict}, {p.receiverRegion}
                        </p>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <p className="font-semibold text-[#113a3a]">
                          ৳ {p.cost}
                        </p>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(p.creation_date)}
                        </p>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setViewing(p)}
                            aria-label="View parcel details"
                            title="View details"
                            className="btn btn-sm btn-square btn-ghost text-[#113a3a] hover:bg-[#eef8ea]"
                          >
                            {Icon.eye}
                          </button>
                          <button
                            onClick={() => console.log("edit", p._id)}
                            aria-label="Edit parcel"
                            title="Edit"
                            className="btn btn-sm btn-square btn-ghost text-sky-600 hover:bg-sky-50"
                          >
                            {Icon.edit}
                          </button>
                          <button
                            onClick={() => setDeleting(p)}
                            aria-label="Delete parcel"
                            title="Delete"
                            className="btn btn-sm btn-square btn-ghost text-rose-600 hover:bg-rose-50"
                          >
                            {Icon.trash}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View details modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-[#113a3a] text-lg capitalize">
                {viewing.parcelName}
              </h2>
              <button
                onClick={() => setViewing(null)}
                aria-label="Close"
                className="btn btn-sm btn-square btn-ghost"
              >
                {Icon.close}
              </button>
            </div>
            <div className="px-6 py-5 space-y-5 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                  Parcel
                </p>
                <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                  <span className="text-gray-500">Type</span>
                  <span className="capitalize">{viewing.parcelType}</span>
                  <span className="text-gray-500">Weight</span>
                  <span>{viewing.parcelWeight} kg</span>
                  <span className="text-gray-500">Cost</span>
                  <span className="font-semibold text-[#113a3a]">
                    &#2547; {viewing.cost} ({viewing.isPaid ? "Paid" : "Unpaid"}
                    )
                  </span>
                  <span className="text-gray-500">Booked on</span>
                  <span>{formatDate(viewing.creation_date)}</span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                  Sender
                </p>
                <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                  <span className="text-gray-500">Name</span>
                  <span>{viewing.senderName}</span>
                  <span className="text-gray-500">Phone</span>
                  <span>{viewing.senderPhoneNumber}</span>
                  <span className="text-gray-500">Address</span>
                  <span>
                    {viewing.senderAddress}, {viewing.senderDistrict}
                  </span>
                  {viewing.pickUpInstruction && (
                    <>
                      <span className="text-gray-500">Pickup note</span>
                      <span>{viewing.pickUpInstruction}</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                  Receiver
                </p>
                <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                  <span className="text-gray-500">Name</span>
                  <span>{viewing.receiverName}</span>
                  <span className="text-gray-500">Phone</span>
                  <span>{viewing.receiverPhoneNumber}</span>
                  <span className="text-gray-500">Address</span>
                  <span>
                    {viewing.receiverAddress}, {viewing.receiverDistrict}
                  </span>
                  {viewing.deliveryInstruction && (
                    <>
                      <span className="text-gray-500">Delivery note</span>
                      <span>{viewing.deliveryInstruction}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="mx-auto size-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              {Icon.trash}
            </div>
            <h2 className="font-bold text-[#113a3a] text-lg">
              Delete this parcel?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              "{deleting.parcelName}" will be permanently removed. This can't be
              undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleting(null)}
                className="btn flex-1 btn-ghost border border-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirm(deleting._id)}
                className="btn flex-1 bg-rose-600 hover:bg-rose-700 text-white border-0"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
