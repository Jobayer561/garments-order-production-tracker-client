import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/payment-success`, { sessionId })
        .then((res) => {
          console.log("Payment success response:", res.data);
        })
        .catch((err) => {
          console.error("Payment success error:", err.response?.data || err);
        });
    }
  }, [sessionId]);

  return (
    <div className="py-28">
      {" "}
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <IoBagCheckOutline className="w-16 h-16 text-[#3badcd] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order is being processed.
          </p>
          <Link
            to="/dashboard/my-orders"
            className="inline-block bg-[#3badcd] rounded-full text-white font-semibold py-2 px-4 hover:scale-105 hover:bg-[#3badcd]/80 transition duration-300"
          >
            Go to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
