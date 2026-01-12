import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";

const OrderDetails = () => {
  const { id } = useParams();

  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/orders/${id}`
      );
      console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const {
    _id,
    transactionId,
    buyer,
    product,
    quantity,
    totalPrice,
    paymentMethod,
    status,
    createdAt,
    trackingHistory = [],
  } = order;
  const { name: buyerName, email: buyerEmail } = buyer || {};
  const { name: productName, category, image } = product || {};

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-[#3badcd] mb-6 text-center">
        Order Details
      </h1>

      <div className="shadow-lg rounded-lg p-6 space-y-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
        <section>
          <h2 className="text-xl font-semibold text-[#3badcd] mb-4">
            Order Information
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <p className="text-gray-700 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Order ID:
              </span>{" "}
              {_id}{" "}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Transaction ID:
              </span>{" "}
              {transactionId}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Status:
              </span>{" "}
              {status}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Created At:
              </span>{" "}
              {createdAt}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Payment Method:
              </span>{" "}
              {paymentMethod}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Total Price:
              </span>
              $ {totalPrice}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3badcd] mb-4">
            Buyer Information
          </h2>
          <div className="grid grid-cols-1 gap-4 ">
            <p className="text-gray-700 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Name:
              </span>{" "}
              {buyerName}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                Email:
              </span>{" "}
              {buyerEmail}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3badcd] mb-4">
            Product Information
          </h2>
          <div className="flex items-center gap-4">
            <img
              src={image}
              alt="Product"
              className="w-20 h-20 rounded-md border"
            />
            <div className="track">
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Product:
                </span>{" "}
                {productName}
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Category:
                </span>{" "}
                {category}
              </p>

              <p className="text-gray-700 dark:text-gray-200">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Quantity:
                </span>{" "}
                {quantity}
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#3badcd]">
              Tracking History
            </h2>
            {trackingHistory.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No tracking updates yet.
              </p>
            ) : (
              trackingHistory.map(
                ({
                  status: trackingStatus,
                  location,
                  note,
                  createdAt,
                  _id,
                }) => (
                  <div
                    key={_id}
                    className="border-l-4 border-[#3badcd] pl-3 py-2  rounded-md"
                  >
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      Status: {trackingStatus}
                    </p>
                    {location && (
                      <p className="text-gray-700 dark:text-gray-200">
                        Location: {location}
                      </p>
                    )}
                    {note && (
                      <p className="text-gray-700 dark:text-gray-200">
                        Note: {note}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(createdAt).toLocaleString()}
                    </p>
                  </div>
                )
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderDetails;
