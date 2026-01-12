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
    <div className="relative w-full min-h-[60vh] max-h-[70vh] md:h-[70vh] overflow-hidden shadow-xl mt-16 md:mt-16">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.img
                key={index}
                src={slide.img}
                alt={slide.title}
                className="absolute w-full h-full object-cover top-0 left-0"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            )
        )}
      </AnimatePresence>

      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-black/65 via-black/45 to-black/30" />

      <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start md:text-left text-center px-6 md:px-12 z-10 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="backdrop-blur-[1px]"
          >
            <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-white/70 mb-3 animate-fade-in">
              Order Tracking • Production Visibility • Faster Fulfillment
            </p>
            <h1 className="mb-5 text-3xl md:text-5xl lg:text-6xl font-bold text-[#3BADCD] drop-shadow-md">
              {slides[current].title}
            </h1>
            <p className="mb-8 max-w-2xl mx-auto md:mx-0 text-white text-base md:text-lg leading-relaxed">
              {slides[current].desc}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <Link
                to={"/allProducts"}
                className="px-5 py-3 my-btn text-base shadow-lg shadow-[#3BADCD]/30"
              >
                View Products
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 w-full flex flex-col items-center gap-4 z-20">
        <div className="flex justify-center items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={index === current}
              className={`w-3 h-3 rounded-full transition ${
                index === current
                  ? "bg-[#3BADCD] scale-110 shadow shadow-[#3BADCD]/50"
                  : "bg-white/60 hover:bg-white/90"
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

        <motion.div
          initial={{ y: 0, opacity: 0.7 }}
          animate={{ y: [0, 6, 0], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex items-center gap-2 text-white/80 text-sm"
        >
          <span>Scroll</span>
          <span className="w-1 h-6 rounded-full bg-white/70 block" />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
