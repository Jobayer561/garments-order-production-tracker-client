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
    <div className="min-h-screen  p-8">
      <h1 className="text-3xl font-bold text-[#3badcd] mb-6 text-center">
        Order Details
      </h1>

      <div className=" shadow-lg rounded-lg p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-[#3badcd] mb-4">
            Order Information
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <p>
              <span className="font-medium">Order ID:</span> {_id}{" "}
            </p>
            <p>
              <span className="font-medium">Transaction ID:</span>{" "}
              {transactionId}
            </p>
            <p>
              <span className="font-medium">Status:</span> {status}
            </p>
            <p>
              <span className="font-medium">Created At:</span> {createdAt}
            </p>
            <p>
              <span className="font-medium">Payment Method:</span>{" "}
              {paymentMethod}
            </p>
            <p>
              <span className="font-medium">Total Price:</span>$ {totalPrice}
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#3badcd] mb-4">
            Buyer Information
          </h2>
          <div className="grid grid-cols-1 gap-4 ">
            <p>
              <span className="font-medium">Name:</span> {buyerName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {buyerEmail}
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
              <p>
                <span className="font-medium">Product:</span> {productName}
              </p>
              <p>
                <span className="font-medium">Category:</span> {category}
              </p>

              <p>
                <span className="font-medium">Quantity:</span> {quantity}
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
              <p className="text-gray-500">No tracking updates yet.</p>
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
                    <p className="font-semibold ">
                      Status: {trackingStatus}
                    </p>
                    {location && <p>Location: {location}</p>}
                    {note && <p>Note: {note}</p>}
                    <p className="text-sm ">
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
