import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  accepted: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

const workStatusStyles = {
  active: "bg-emerald-100 text-emerald-700",
  available: "bg-sky-100 text-sky-700",
  "on-delivery": "bg-amber-100 text-amber-700",
  inactive: "bg-gray-100 text-gray-600",
};

const TABS = [
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
];

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState("pending");
  const { user } = useAuth();

  const {
    data: riders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["riders", activeTab, user?.email],
    enabled: !!user,
    queryFn: async () => {
      const result = await axiosSecure.get(`/riders?status=${activeTab}`);
      return result.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.riderEmail };
    axiosSecure
      .patch(`/riders/${rider._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          const isAccepted = status === "accepted";
          Swal.fire({
            title: isAccepted ? "Rider Approved" : "Rider Rejected",
            text: isAccepted
              ? "The rider has been approved and can now start accepting deliveries."
              : "The rider's application has been rejected.",
            icon: isAccepted ? "success" : "warning",
          });
          refetch();
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Something went wrong",
          text: "Couldn't update the rider's status. Please try again.",
          icon: "error",
        });
      });
  };

  // NEW: toggle a rider's working status (active/inactive) once accepted
  const updateWorkStatus = (rider) => {
    const nextStatus = rider.workStatus === "active" ? "inactive" : "active";

    axiosSecure
      .patch(`/riders/${rider._id}/work-status`, { workStatus: nextStatus })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "Working Status Updated",
            text: `${rider.riderName} is now ${nextStatus}.`,
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
          refetch();
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Something went wrong",
          text: "Couldn't update working status. Please try again.",
          icon: "error",
        });
      });
  };

  const handleAccept = (rider) => updateRiderStatus(rider, "accepted");
  const handleReject = (rider) => updateRiderStatus(rider, "rejected");

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `Delete ${name}'s application?`,
      text: "This can't be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#e11d48",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/riders/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted",
                text: `${name}'s application has been removed.`,
                icon: "success",
              });
              refetch();
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Something went wrong",
              text: "Couldn't delete this application. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  // NEW: view full rider details in a modal instead of showing every column
  const handleViewDetails = (rider) => {
    Swal.fire({
      title: rider.riderName,
      html: `
        <div style="text-align:left; font-size:14px; line-height:1.7;">
          <p><strong>Email:</strong> ${rider.riderEmail}</p>
          <p><strong>Phone:</strong> ${rider.riderPhoneNumber}</p>
          <p><strong>Region / District:</strong> ${rider.riderDistrict}, ${rider.riderRegion}</p>
          <p><strong>License No:</strong> ${rider.licenseNumber}</p>
          <p><strong>Bike:</strong> ${rider.bikeBrand} (${rider.bikeRegistrationNumber})</p>
          <p><strong>Status:</strong> ${rider.status}</p>
          ${
            rider.status === "accepted"
              ? `<p><strong>Working Status:</strong> ${rider.workStatus || "inactive"}</p>`
              : ""
          }
        </div>
      `,
      confirmButtonText: "Close",
    });
  };

  return (
    <div className="rounded-2xl bg-white p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#113a3a]">
          {activeTab === "pending" ? "Pending" : "Accepted"} Rider Applications
        </h1>
        <span className="rounded-full bg-[#eef8ea] px-3 py-1 text-xs font-semibold text-[#113a3a]">
          {riders.length} {activeTab}
        </span>
      </div>

      <div className="mb-5 flex gap-2 border-b border-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.key
                ? "border-b-2 border-[#113a3a] text-[#113a3a]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-sm text-gray-500">
          Loading {activeTab} riders...
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center py-20 text-sm text-rose-600">
          Failed to load riders. Please try again.
        </div>
      ) : riders.length === 0 ? (
        <div className="py-16 text-center text-sm text-gray-500">
          No {activeTab} rider applications right now.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-400">
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">
                  {activeTab === "accepted" ? "Working Status" : "Status"}
                </th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider) => (
                <tr
                  key={rider._id}
                  className="border-b border-gray-50 align-top hover:bg-gray-50/60"
                >
                  <td className="px-3 py-3 font-medium text-gray-800">
                    {rider.riderName}
                  </td>
                  <td className="px-3 py-3 text-gray-600">
                    {rider.riderEmail}
                  </td>
                  <td className="px-3 py-3">
                    {activeTab === "accepted" ? (
                      <button
                        onClick={() => updateWorkStatus(rider)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize transition ${
                          workStatusStyles[rider.workStatus] ||
                          workStatusStyles.inactive
                        }`}
                        title="Click to toggle working status"
                      >
                        {rider.workStatus || "inactive"}
                      </button>
                    ) : (
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                          statusStyles[rider.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {rider.status}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(rider)}
                        className="rounded-lg border border-gray-200 p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-[#113a3a]"
                        title="View details"
                      >
                        <FaEye size={14} />
                      </button>
                      {activeTab === "pending" && (
                        <>
                          <button
                            onClick={() => handleAccept(rider)}
                            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(rider)}
                            className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(rider._id, rider.riderName)}
                        className="rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApproveRider;
