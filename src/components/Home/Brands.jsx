import React from "react";
import { motion } from "framer-motion";

const Brands = () => {
  const brands = [
    {
      name: "Zara",
      img: "https://3.bp.blogspot.com/-ixyooXdN4Vk/UokWCBQITCI/AAAAAAAAAEw/xvVZ-v21Rw4/s1600/url45.jpeg",
    },
    {
      name: "H&M",
      img: "https://tse4.mm.bing.net/th/id/OIP.oIzisEP36cEqUj1UYGFQOgHaE8?pid=Api&P=0&h=220",
    },
    {
      name: "Levi’s",
      img: "https://moaapi.net/sites/default/files/2023-08/levis-storefront.jpg",
    },
    {
      name: "Gucci",
      img: "https://wallpapers.com/images/hd/gucci-background-o9mcw3kimz6y3e0s.jpg",
    },
    {
      name: "Louis Vuitton",
      img: "https://eskipaper.com/images/louis-vuitton-logo-1.jpg",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-[1440px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#3BADCD]">
          Garments Brands
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              className="relative rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
              variants={cardVariants}
            >
              <img
                src={brand.img}
                alt={brand.name}
                className="w-full h-64 object-cover bg-white"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-100 bg-black/25">
                <h3 className="text-2xl font-bold mb-1">{brand.name}</h3>
                <p className="text-gray-300 text-sm">
                  Popular international garments brand
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;
