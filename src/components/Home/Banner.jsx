import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router";

import ManBanner from "../../assets/images/Man.jpg";
import WomanClothBanner from "../../assets/images/woman.webp";
import BannerImg from "../../assets/images/banner.jpg";

const slides = [
  {
    img: ManBanner,
    title: "GarmentsFlow",
    desc: "GarmentsFlow is a modern web-based system that streamlines the garment manufacturing process.",
  },
  {
    img: WomanClothBanner,
    title: "Fashion Made Easy",
    desc: "Track every order and manage production efficiently with GarmentsFlow.",
  },
  {
    img: BannerImg,
    title: "Fast & Reliable",
    desc: "From order to delivery, stay on top of your garment business effortlessly.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.img
                key={index}
                src={slide.img}
                alt={slide.title}
                className="absolute w-full h-full object-cover top-0 left-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            )
        )}
      </AnimatePresence>

      <div className="absolute w-full h-full bg-black/40 top-0 left-0"></div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-5 text-3xl md:text-5xl font-bold text-[#3BADCD]">
              {slides[current].title}
            </h1>
            <p className="mb-5 max-w-lg mx-auto text-white">
              {slides[current].desc}
            </p>
            <Link to={"/allProducts"} className="px-4 py-2 my-btn">
              View Product
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full ${
              index === current ? "bg-[#3BADCD]" : "bg-white/50"
            }`}
            onClick={() => setCurrent(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
