import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams, Link } from "react-router";
import useAxios from "../../Hooks/useAxios";

const STATUS_META = {
  pending_pickup: {
    label: "Pending Pickup",
    classes: "bg-amber-50 text-amber-700",
  },
  driver_assigned: {
    label: "Rider Assigned",
    classes: "bg-sky-50 text-sky-700",
  },
  rider_accepted: {
    label: "Rider Accepted",
    classes: "bg-sky-50 text-sky-700",
  },
  picked_up: { label: "Picked Up", classes: "bg-indigo-50 text-indigo-700" },
  delivered: { label: "Delivered", classes: "bg-emerald-50 text-emerald-700" },
};

const formatDateTime = (iso) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const {
    data: trackings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
    enabled: !!trackingId,
  });

  const sorted = [...trackings].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );
  const latest = sorted[sorted.length - 1];

  console.log({ trackingId, isLoading, isError, trackings });

  return (
    <div className="min-h-screen bg-[#f7f8f6] px-4 py-10 sm:py-16">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-[#113a3a] inline-flex items-center gap-1"
          >
            &larr; Back to home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
            Tracking ID
          </p>
          <h1 className="text-xl sm:text-2xl font-bold text-[#113a3a] font-mono mb-4">
            {trackingId}
          </h1>

          {isLoading && (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-md" />
            </div>
          )}

          {isError && (
            <p className="text-center py-10 text-rose-600 text-sm">
              Couldn't load tracking info. Please check the tracking ID and try
              again.
            </p>
          )}

          {!isLoading && !isError && sorted.length === 0 && (
            <p className="text-center py-10 text-gray-500 text-sm">
              No tracking history found for this parcel yet.
            </p>
          )}

          {!isLoading && sorted.length > 0 && (
            <>
              {latest && (
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-8 ${
                    STATUS_META[latest.status]?.classes ??
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {STATUS_META[latest.status]?.label ?? latest.status}
                </span>
              )}

              <ol className="relative border-l-2 border-gray-100 ml-2">
                {sorted
                  .slice()
                  .reverse()
                  .map((log, i) => (
                    <li key={log._id ?? i} className="mb-8 ml-6 last:mb-0">
                      <span
                        className={`absolute -left-[9px] flex items-center justify-center size-4 rounded-full ring-4 ring-white ${
                          i === 0 ? "bg-[#c7e94f]" : "bg-gray-300"
                        }`}
                      />
                      <p className="font-semibold text-[#113a3a] capitalize text-sm">
                        {STATUS_META[log.status]?.label ??
                          log.details ??
                          log.status}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {formatDateTime(log.createdAt)}
                      </p>
                    </li>
                  ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParcelTrack;
