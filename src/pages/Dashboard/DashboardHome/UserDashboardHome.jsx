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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const STATUS_LABELS = {
  "pending-pickup": "Pending Pickup",
  driver_assigned: "Rider Assigned",
  rider_accepted: "Accepted",
  picked_up: "Picked Up",
  delivered: "Delivered",
};

const CHART_COLORS = ["#c7e94f", "#5a9c1f", "#0ea5e9", "#6366f1", "#10b981"];
const PAID_COLORS = ["#10b981", "#f59e0b"];

const StatCard = ({ label, value, accent }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
    <p className="text-xs text-gray-500">{label}</p>
    <p className={`text-2xl font-bold mt-1 ${accent ?? "text-[#113a3a]"}`}>
      {value}
    </p>
  </div>
);

const UserDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["parcelStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/stats?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const summary = data?.summary ?? {
    totalParcels: 0,
    totalCost: 0,
    totalPaid: 0,
    totalUnpaid: 0,
  };

  const statusChartData = (data?.statusBreakdown ?? []).map((s) => ({
    status: STATUS_LABELS[s._id] ?? s._id,
    count: s.count,
  }));

  const paidChartData = [
    { name: "Paid", value: summary.totalPaid },
    { name: "Unpaid", value: summary.totalUnpaid },
  ].filter((d) => d.value > 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#113a3a]">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ""}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here's a snapshot of your parcel activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Total Parcels" value={summary.totalParcels} />
        <StatCard
          label="Total Spent"
          value={`৳${Number(summary.totalCost || 0).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}`}
        />
        <StatCard
          label="Paid"
          value={summary.totalPaid}
          accent="text-emerald-600"
        />
        <StatCard
          label="Unpaid"
          value={summary.totalUnpaid}
          accent="text-amber-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-[#113a3a] mb-4">
            Your Parcels by Status
          </h2>
          {isLoading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-md" />
            </div>
          ) : statusChartData.length === 0 ? (
            <p className="text-center py-16 text-gray-500 text-sm">
              You haven't sent any parcels yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="status"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={60}
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
                    <Cell
                      key={i}
                      fill={CHART_COLORS[i % CHART_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-[#113a3a] mb-4">Payment Status</h2>
          {isLoading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-md" />
            </div>
          ) : paidChartData.length === 0 ? (
            <p className="text-center py-16 text-gray-500 text-sm">
              No payment data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={paidChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {paidChartData.map((_, i) => (
                    <Cell key={i} fill={PAID_COLORS[i % PAID_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
