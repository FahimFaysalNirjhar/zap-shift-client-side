import React from "react";
import { useQuery } from "@tanstack/react-query";
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
  Legend,
} from "recharts";

const STATUS_LABELS = {
  "pending-pickup": "Pending Pickup",
  driver_assigned: "Rider Assigned",
  rider_accepted: "Accepted",
  picked_up: "Picked Up",
  delivered: "Delivered",
  pending: "Pending",
  accepted: "Accepted",
  available: "Available",
  in_delivery: "In Delivery",
};

const PARCEL_COLORS = ["#c7e94f", "#5a9c1f", "#0ea5e9", "#6366f1", "#10b981"];
const RIDER_COLORS = ["#f59e0b", "#10b981"];

const StatCard = ({ label, value, accent }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
    <p className="text-xs text-gray-500">{label}</p>
    <p className={`text-2xl font-bold mt-1 ${accent ?? "text-[#113a3a]"}`}>
      {value}
    </p>
  </div>
);

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcelStats = [], isLoading: parcelLoading } = useQuery({
    queryKey: ["stats", "parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/deliver-status/stats");
      return res.data;
    },
  });

  const { data: riderStatusStats = [], isLoading: riderStatusLoading } =
    useQuery({
      queryKey: ["stats", "riders", "status"],
      queryFn: async () => {
        const res = await axiosSecure.get("/riders/status/stats");
        return res.data;
      },
    });

  const { data: riderWorkStats = [], isLoading: riderWorkLoading } = useQuery({
    queryKey: ["stats", "riders", "workStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/work-status/stats");
      return res.data;
    },
  });

  const parcelChartData = parcelStats.map((s) => ({
    status: STATUS_LABELS[s._id] ?? s._id,
    count: s.count,
  }));

  const riderStatusChartData = riderStatusStats.map((s) => ({
    name: STATUS_LABELS[s._id] ?? s._id,
    value: s.count,
  }));

  const riderWorkChartData = riderWorkStats.map((s) => ({
    name: STATUS_LABELS[s._id] ?? s._id,
    value: s.count,
  }));

  const totalParcels = parcelStats.reduce((sum, s) => sum + s.count, 0);
  const totalDelivered =
    parcelStats.find((s) => s._id === "delivered")?.count ?? 0;
  const totalRiders = riderStatusStats.reduce((sum, s) => sum + s.count, 0);
  const activeRiders =
    riderWorkStats.find((s) => s._id === "in_delivery")?.count ?? 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#113a3a]">
          Admin Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          A snapshot of parcels and riders across the platform.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Total Parcels" value={totalParcels} />
        <StatCard
          label="Delivered"
          value={totalDelivered}
          accent="text-emerald-600"
        />
        <StatCard label="Total Riders" value={totalRiders} />
        <StatCard
          label="Riders In Delivery"
          value={activeRiders}
          accent="text-sky-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Parcel status — bar chart, spans 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-[#113a3a] mb-4">
            Parcels by Status
          </h2>
          {parcelLoading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-md" />
            </div>
          ) : parcelChartData.length === 0 ? (
            <p className="text-center py-16 text-gray-500 text-sm">
              No parcel data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={parcelChartData}>
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
                  {parcelChartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PARCEL_COLORS[i % PARCEL_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Rider approval status — donut */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-[#113a3a] mb-4">
            Rider Approval Status
          </h2>
          {riderStatusLoading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-md" />
            </div>
          ) : riderStatusChartData.length === 0 ? (
            <p className="text-center py-16 text-gray-500 text-sm">
              No rider data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={riderStatusChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {riderStatusChartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PARCEL_COLORS[i % PARCEL_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    fontSize: 13,
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12 }}
                  iconType="circle"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Rider work status — donut, full width below */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-[#113a3a] mb-4">
            Rider Availability
          </h2>
          {riderWorkLoading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-md" />
            </div>
          ) : riderWorkChartData.length === 0 ? (
            <p className="text-center py-16 text-gray-500 text-sm">
              No rider data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={riderWorkChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {riderWorkChartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={RIDER_COLORS[i % RIDER_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
