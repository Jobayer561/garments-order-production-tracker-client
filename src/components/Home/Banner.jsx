import { motion } from "framer-motion";
import BannerImg from "../../assets/images/banner.jpg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-screen "
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
              garment manufacturing process. From receiving Buyer orders to
              tracking every production stage.
            </motion.p>

            <Link to={"/allProducts"} className="px-4 py-2 my-btn">
              View Product
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
