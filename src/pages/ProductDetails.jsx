import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Container from "@/components/Shared/Container";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import Heading from "@/components/Shared/Heading";
import ProductImages from "./ProductImage";
import UseRole from "@/hooks/UseRole";
import useStatus from "@/hooks/useStatus";

const ProductDetails = () => {
  const { id } = useParams();
  const [role] = UseRole();
  const [status] = useStatus();
  const navigate = useNavigate();

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/allProducts/${id}`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const {
    _id,
    images = [],
    title,
    description,
    demoVideoLink,
    category,
    availableQuantity,
    price,
    minimumOrderQuantity,
    paymentOption,
  } = product;

  const inStock =
    typeof availableQuantity === "number" ? availableQuantity > 0 : true;
  const qtyLabel =
    typeof availableQuantity === "number"
      ? `${availableQuantity} in stock`
      : "Available";

  return (
    <Container>
      <div className="relative py-20">
        <div className="absolute inset-0 blur-3xl bg-[radial-gradient(circle_at_20%_10%,rgba(59,173,205,0.16),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(59,173,205,0.18),transparent_32%),radial-gradient(circle_at_60%_80%,rgba(59,173,205,0.12),transparent_35%)]" />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${id}-media`}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full"
            >
              <div className="rounded-3xl bg-white dark:bg-neutral-900 shadow-2xl shadow-[#3BADCD]/15 border border-white/40 dark:border-white/10 overflow-hidden backdrop-blur">
                <ProductImages images={images} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 px-4 py-3 shadow-sm">
                  <p className="text-gray-500 dark:text-gray-300">Category</p>
                  <p className="font-semibold text-[#0f172a] dark:text-white">
                    {category}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/90 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 shadow-sm">
                  <p className="text-gray-600 dark:text-gray-300">
                    Availability
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {qtyLabel}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
            className="relative rounded-3xl bg-white dark:bg-neutral-900 shadow-2xl shadow-[#3BADCD]/15 border border-white/40 dark:border-white/10 p-8 lg:p-10 space-y-7 backdrop-blur"
          >
            <div className="flex items-start justify-between gap-4">
              <Heading
                title={title}
                subtitle={
                  <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                    <span className="px-3 py-1 rounded-full bg-[#3BADCD]/10 text-[#3BADCD] font-semibold">
                      {category}
                    </span>
                    {minimumOrderQuantity && (
                      <span className="px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 border border-white/30 font-medium">
                        Minimum Order Quantity {minimumOrderQuantity}
                      </span>
                    )}
                  </div>
                }
              />
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  inStock
                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                    : "bg-red-100 text-red-600 border-red-200"
                }`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-200">
              {description}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
              <div className="p-4 rounded-2xl bg-[#3BADCD]/6 border border-[#3BADCD]/15 shadow-sm">
                <p className="text-gray-500 dark:text-gray-300">Price</p>
                <p className="text-3xl font-bold text-[#3BADCD]">${price}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/30 shadow-sm">
                <p className="text-gray-500 dark:text-gray-300">Payment</p>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {paymentOption}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/30 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 shadow-sm">
                <p className="text-gray-500 dark:text-gray-300">Quantity</p>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {qtyLabel}
                </p>
              </div>
              {minimumOrderQuantity && (
                <div className="rounded-2xl border border-white/30 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 shadow-sm">
                  <p className="text-gray-500 dark:text-gray-300">
                    Minimum order
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {minimumOrderQuantity}
                  </p>
                </div>
              )}
            </div>

            {demoVideoLink && (
              <motion.a
                href={demoVideoLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0.98, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#3BADCD] to-[#2b8aa6] text-white font-semibold shadow-lg shadow-[#3BADCD]/30"
              >
                Watch demo
              </motion.a>
            )}

            <motion.button
              whileHover={{
                scale: role === "Buyer" && status === "approve" ? 1.02 : 1,
              }}
              whileTap={{
                scale: role === "Buyer" && status === "approve" ? 0.99 : 1,
              }}
              className={`w-full bg-gradient-to-r from-[#3badcd] to-[#2b8aa6] rounded-full py-4 text-white font-semibold transition-all shadow-lg shadow-[#3BADCD]/30 ${
                role !== "Buyer" || status !== "approve"
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:shadow-[#3BADCD]/45"
              }`}
              disabled={role !== "Buyer" || status !== "approve"}
              onClick={() => {
                if (role === "Buyer" && status === "approve") {
                  navigate(`/order/${_id}`, { state: { product } });
                }
              }}
            >
              Order Now
            </motion.button>

            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-300 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Ships fast with shipping info
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
