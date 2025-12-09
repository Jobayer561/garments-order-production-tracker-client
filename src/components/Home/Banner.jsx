import { motion } from "framer-motion";
import BannerImg from "../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${BannerImg})`,
        }}
      >
        <div className="hero-overlay bg-black/40"></div>

        <div className="hero-content text-neutral-content text-center">
          <motion.div
            className="max-w-md"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.8,
                },
              },
            }}
          >
            <motion.h1
              className="mb-5 text-2xl md:text-5xl font-bold text-[#3BADCD]"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
            >
              GarmentsFlow
            </motion.h1>

            <motion.p
              className="mb-5"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
            >
              GarmentsFlow is a modern web-based system that streamlines the
              garment manufacturing process. From receiving buyer orders to
              tracking every production stage.
            </motion.p>

            <motion.button
              className="px-4 py-2 my-btn"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.7 }}
            >
              View Product
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
