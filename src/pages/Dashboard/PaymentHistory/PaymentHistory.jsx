import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdReceiptLong } from "react-icons/md";
import Loading from "../../../components/Loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center gap-2 mb-6">
        <MdReceiptLong className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-semibold">Payment History</h1>
      </div>

      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <MdReceiptLong className="w-10 h-10 mb-2 opacity-40" />
          <p>No payments found yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="table w-full">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th>#</th>
                <th>Parcel</th>
                <th>Tracking ID</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td className="font-medium">{payment.parcelName}</td>
                  <td className="text-sm text-gray-500">
                    {payment.trackingId}
                  </td>
                  <td className="text-xs text-gray-400 truncate max-w-35">
                    {payment.transationId}
                  </td>
                  <td className="font-semibold">
                    ${(payment.amount / 100).toFixed(2)}{" "}
                    <span className="text-xs uppercase text-gray-400">
                      {payment.currency}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        payment.paymentStatus === "paid"
                          ? "badge-success text-white"
                          : "badge-warning"
                      }`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="text-sm text-gray-500">
                    {new Date(payment.paidAt).toLocaleString()}
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

export default PaymentHistory;
