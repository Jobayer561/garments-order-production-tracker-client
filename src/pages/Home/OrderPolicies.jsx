import React from "react";
import { motion } from "framer-motion";

const OrderPolicies = () => {
  const MotionH2 = motion.h2;
  const MotionDiv = motion.div;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <div>
      <section className="py-8 ">
        <div className="max-w-[1440px] mx-auto px-6">
          <MotionH2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-[#3badcd] mb-10 text-center"
          >
            Order Policies
          </MotionH2>

          <MotionDiv
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                title: "Minimum Order Quantity",
                text: "100 pieces per style.",
              },
              {
                title: "Production Time",
                text: "15–20 business days.",
              },
              {
                title: "Payment Terms",
                text: "50% advance, 50% before shipment.",
              },
              {
                title: "Shipping & Delivery",
                text: "DHL/FedEx, 5–7 business days after dispatch.",
              },
              {
                title: "Return Policy",
                text: "Returns accepted within 7 days for defects only.",
              },
              {
                title: "Customization",
                text: "Custom logos/designs require prior approval.",
              },
            ].map((item) => (
              <MotionDiv
                key={item.title}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  transition: { duration: 0.15 },
                }}
                className=" shadow-md rounded-xl p-6 border border-gray-50/35"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500">{item.text}</p>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default OrderPolicies;
