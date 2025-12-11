import React from "react";

const OrderPolicies = () => {
  return (
    <div>
      <section className="py-8 ">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3badcd] mb-10 text-center">
            Order Policies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className=" shadow-md rounded-xl p-6 border border-gray-50/35">
              <h3 className="text-xl font-bold mb-3">Minimum Order Quantity</h3>
              <p className="text-gray-500">100 pieces per style.</p>
            </div>

            <div className="b shadow-md rounded-xl p-6 border border-gray-50/35">
              <h3 className="text-xl font-bold mb-3">Production Time</h3>
              <p className="text-gray-500">15–20 business days.</p>
            </div>

            <div className=" shadow-md rounded-xl p-6 border border-gray-50/35">
              <h3 className="text-xl font-bold mb-3">Payment Terms</h3>
              <p className="text-gray-500">50% advance, 50% before shipment.</p>
            </div>

            <div className=" shadow-md rounded-xl p-6 border border-gray-50/35">
              <h3 className="text-xl font-bold mb-3">Shipping & Delivery</h3>
              <p className="text-gray-500">
                DHL/FedEx, 5–7 business days after dispatch.
              </p>
            </div>

            <div className=" shadow-md rounded-xl p-6 border border-gray-50/35">
              <h3 className="text-xl font-bold mb-3">Return Policy</h3>
              <p className="text-gray-500">
                Returns accepted within 7 days for defects only.
              </p>
            </div>

            <div className=" shadow-md rounded-xl p-6 border border-gray-50/35">
              <h3 className="text-xl font-bold mb-3">Customization</h3>
              <p className="text-gray-500">
                Custom logos/designs require prior approval.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderPolicies;
