import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const [paymentInfo, setPaymentInfo] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        if (res.data?.success) {
          setPaymentInfo({
            transactionId: res.data.transationId,
            trackingId: res.data.trackingId,
          });
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, [sessionId, axiosSecure]);

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
        <p className="text-gray-500">Confirming your payment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Something went wrong
        </h2>
        <p className="text-gray-500 max-w-sm">
          We couldn't confirm your payment. If money was deducted, please
          contact support with your session ID.
        </p>
        <Link
          to="/dashboard/parcels"
          className="mt-2 px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg
            className="w-9 h-9 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Payment Successful
        </h2>
        <p className="text-gray-500 mb-6">
          Your parcel has been booked and payment received.
        </p>

        <div className="text-left bg-gray-50 rounded-xl p-4 space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Tracking ID</span>
            <span className="text-sm font-semibold text-gray-800">
              {paymentInfo?.trackingId || "—"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Transaction ID</span>
            <span className="text-sm font-mono text-gray-800 truncate max-w-[180px]">
              {paymentInfo?.transactionId || "—"}
            </span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Link
            to="/dashboard/parcels"
            className="flex-1 px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
          >
            My Parcels
          </Link>
          <Link
            to="/"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
