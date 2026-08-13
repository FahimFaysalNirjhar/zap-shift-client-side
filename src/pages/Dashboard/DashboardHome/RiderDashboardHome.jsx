import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const STATUS_LABELS = {
  driver_assigned: "Awaiting Response",
  rider_accepted: "Accepted",
  picked_up: "Picked Up",
  delivered: "Delivered",
};

const CHART_COLORS = ["#f59e0b", "#0ea5e9", "#6366f1", "#10b981"];

const StatCard = ({ label, value, accent }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
    <p className="text-xs text-gray-500">{label}</p>
    <p className={`text-2xl font-bold mt-1 ${accent ?? "text-[#113a3a]"}`}>
      {value}
    </p>
  </div>
);

const RiderDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["riderStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/stats?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalAssigned = data?.totalAssigned ?? 0;
  const totalDelivered = data?.totalDelivered ?? 0;
  const totalEarnings = data?.totalEarnings ?? 0;
  const inProgress = totalAssigned - totalDelivered;

  const statusChartData = (data?.statusBreakdown ?? []).map((s) => ({
    status: STATUS_LABELS[s._id] ?? s._id,
    count: s.count,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#113a3a]">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ""}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here's a snapshot of your deliveries.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Total Assigned" value={totalAssigned} />
        <StatCard
          label="Delivered"
          value={totalDelivered}
          accent="text-emerald-600"
        />
        <StatCard
          label="In Progress"
          value={Math.max(inProgress, 0)}
          accent="text-sky-600"
        />
        <StatCard
          label="Total Earnings"
          value={`৳${Number(totalEarnings).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}`}
          accent="text-[#5a9c1f]"
        />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-[#113a3a] mb-4">
          Deliveries by Status
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-md" />
          </div>
        ) : statusChartData.length === 0 ? (
          <p className="text-center py-16 text-gray-500 text-sm">
            No deliveries assigned to you yet.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={statusChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="status"
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {statusChartData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RiderDashboardHome;
