import React from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Aisha Rahman",
    role: "Head of Design",
    initials: "AR",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    description:
      "Creative visionary with 10+ years in fashion and product design, crafting innovative solutions.",
  },
  {
    name: "Vikram Patel",
    role: "Production Lead",
    initials: "VP",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description:
      "Expert in streamlining operations and ensuring quality production with sustainable practices.",
  },
  {
    name: "Nabila Khan",
    role: "Quality Manager",
    initials: "NK",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    description:
      "Meticulous quality control specialist ensuring every product meets the highest standards.",
  },
  {
    name: "Imran Chowdhury",
    role: "Sourcing Manager",
    initials: "IC",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    description:
      "Strategic sourcing expert building strong supplier relationships and optimizing costs.",
  },
];

export default function Team() {
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
          Team / Meet Our Experts
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {team.map((m) => (
            <motion.div
              variants={cardVariants}
              key={m.name}
              whileHover={{
                y: -4,
                scale: 1.01,
                transition: { duration: 0.15 },
              }}
              className="rounded-2xl border border-gray-100  backdrop-blur p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-[#3BADCD]/20">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-base md:text-lg font-semibold">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.role}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {m.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
