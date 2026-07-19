import React from "react";
import { Link, useSearchParams } from "react-router";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const parcelId = searchParams.get("parcelId"); // optional, if you pass it in cancel_url

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
          <svg
            className="w-9 h-9 text-red-500"
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

        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Payment Cancelled
        </h2>
        <p className="text-gray-500 mb-6">
          Your payment was not completed. No amount has been charged, and your
          parcel booking is still pending.
        </p>

        <div className="text-left bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500">
            You can retry the payment anytime from your parcel list, or contact
            support if you think this was a mistake.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link
            to="/dashboard/parcels"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-900 transition"
          >
            Retry Payment
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

export default PaymentCancel;
