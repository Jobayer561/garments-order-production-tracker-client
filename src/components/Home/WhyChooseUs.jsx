import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Quality Control",
    desc: "Multi-stage QC ensures consistent stitching, sizing, and finishing.",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"
          stroke="#3BADCD"
          strokeWidth="1.5"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="#3BADCD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "On-time Delivery",
    desc: "Reliable lead-times with proactive updates at each milestone.",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="9" stroke="#3BADCD" strokeWidth="1.5" />
        <path
          d="M12 7v5l3 2"
          stroke="#3BADCD"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Transparent Tracking",
    desc: "Order tracker provides live status from cutting to dispatch.",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 5h18M3 12h18M3 19h18"
          stroke="#3BADCD"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Sustainable Fabrics",
    desc: "Certified materials and responsible sourcing for eco-friendly garments.",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21c-4-1-7-5-7-9 0-5 4-9 9-9 4 0 7 3 8 6-5 0-8 3-8 6 0 3-2 6-2 6z"
          stroke="#3BADCD"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-2 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#3BADCD]"
        >
          Why Choose Us
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f) => (
            <motion.div
              variants={cardVariants}
              key={f.title}
              whileHover={{
                y: -4,
                scale: 1.01,
                transition: { duration: 0.15 },
              }}
              className="group rounded-2xl border border-gray-100  backdrop-blur p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="inline-flex h-10 w-16 items-center justify-center rounded-xl bg-[#3BADCD]/10">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
