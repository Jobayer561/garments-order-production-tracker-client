import { useState } from "react";

const ProductImages = ({ images = [] }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 justify-center">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setActiveImage(img)}
            className={`w-20 h-20 object-cover rounded cursor-pointer border 
            ${activeImage === img ? "border-blue-500" : "border-gray-300"}`}
            alt=""
          />
        ))}
      </div>

      <div className="w-full">
        <img
          src={activeImage}
          className="w-full max-h-[380px] object-contain"
          alt=""
        />
      </div>
    </div>
  );
};

export default ProductImages;
