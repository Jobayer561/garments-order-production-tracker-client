import { Link } from "react-router";

const Card = ({ product }) => {
  const { _id, title, description, price, images = [] } = product;

  const imgUrl =
    images.length > 0
      ? images[0]
      : "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div
      className="bg-base-100 rounded-xl shadow-md overflow-hidden
                 hover:shadow-lg transition-shadow duration-300
                 flex flex-row gap-4 p-3 border border-gray-50/35"
    >
      <div className="flex-1 h-48 overflow-hidden bg-gray-100 rounded-lg">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 
                     transition-transform duration-300"
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

        <div className="mt-3">
          <span className="text-2xl font-bold text-[#3BADCD] block">
            ${price}
          </span>

          <Link
            to={`/allProducts/${_id}`}
            className="btn mt-3 w-full px-4 py-2 rounded-full bg-[#3BADCD] 
                       text-white text-sm hover:bg-[#3BADCD]/80 
                       transition-transform hover:scale-105 whitespace-nowrap"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
