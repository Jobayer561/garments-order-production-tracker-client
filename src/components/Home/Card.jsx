import { Link } from "react-router";
import { useEffect, useState } from "react";

const Card = ({ product, index }) => {
  const { _id, title, description, price, images = [] } = product;
  const [isVisible, setIsVisible] = useState(false);

  const imgUrl =
    images.length > 0
      ? images[0]
      : "https://via.placeholder.com/400x300?text=No+Image";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`bg-base-100 rounded-xl shadow-md overflow-hidden
                  border border-gray-50/35 flex flex-row gap-4 p-3
                  transform transition-all duration-500 ease-out
                  ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
    >
      <div className="flex-1 h-48 overflow-hidden bg-gray-100 rounded-lg">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#3BADCD] line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <span className="text-2xl font-bold text-[#3BADCD]">
            ${price.toFixed(2)}
          </span>
          <Link
            to={`/allProducts/${_id}`}
            className="btn w-full px-4 py-2 rounded-full bg-[#3BADCD] text-white text-sm font-medium hover:bg-[#3BADCD]/80 transition-transform hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
