import { Link } from "react-router";
import { useEffect, useState } from "react";

const Card = ({ product, index }) => {
  const {
    _id,
    title,
    description,
    price,
    availableQuantity,
    images = [],
  } = product;
  const inStock =
    typeof product?.availableQuantity === "number"
      ? product.availableQuantity > 0
      : true;
  const [isVisible, setIsVisible] = useState(false);

  const imgUrl =
    images.length > 0
      ? images[0]
      : "https://via.placeholder.com/400x300?text=No+Image";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 90);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`group relative basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4 p-[1px] rounded-2xl bg-gradient-to-br from-[#3BADCD] via-white to-transparent shadow-lg hover:shadow-2xl transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-base-100 flex flex-col gap-4 p-4 transition-transform duration-500 group-hover:-translate-y-1">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#3BADCD]/10 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-[#3BADCD]/8 blur-3xl" />

        <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-[0.5deg]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#3BADCD] shadow">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-gray-400 dark:text-white line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          {inStock ? (
            <div className="px-3 py-1 rounded-full bg-[#3BADCD]/10 text-[#3BADCD] text-xs font-semibold border border-[#3BADCD]/20">
              In stock
            </div>
          ) : (
            <div className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold border border-red-200">
              Out of stock
            </div>
          )}
          <Link
            to={`/allProducts/${_id}`}
            className="px-4 py-2 rounded-full bg-[#3BADCD] text-white text-sm font-semibold shadow-lg shadow-[#3BADCD]/25 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[#3BADCD]/35"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
