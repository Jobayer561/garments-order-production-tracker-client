import React from "react";
import { motion } from "framer-motion";

const steps = [
  { key: "design", title: "Design", note: "Tech pack approved" },
  { key: "sourcing", title: "Sourcing", note: "Fabric & trims ready" },
  { key: "cutting", title: "Cutting", note: "Markers & lay planning" },
  { key: "stitching", title: "Stitching", note: "Lines allocated" },
  { key: "qc", title: "QC", note: "Inline + final checks" },
  { key: "packing", title: "Packing", note: "Polybag & cartons" },
  { key: "dispatch", title: "Dispatch", note: "AWB generated" },
];

function StepIcon({ index }) {
  return (
    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#3BADCD]/10 ring-1 ring-[#3BADCD]/20">
      <span className="text-sm font-semibold">{index + 1}</span>
    </div>
  );
}

export default function ProcessSnapshot() {
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
          Production & Process Snapshot
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          className="text-center text-gray-500 mb-8"
        >
          Quick visual of your garment production workflow
        </motion.p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {steps.map((s, idx) => (
            <motion.div
              variants={cardVariants}
              key={s.key}
              whileHover={{
                y: -4,
                scale: 1.01,
                transition: { duration: 0.15 },
              }}
              className="rounded-2xl border border-gray-100  backdrop-blur p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <StepIcon index={idx} />
                <div>
                  <h3 className="text-base md:text-lg font-semibold">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-400">{s.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
