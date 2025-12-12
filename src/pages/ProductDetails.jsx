import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "@/components/Shared/Container";
import Button from "@/components/Shared/Button/Button";
import PurchaseModal from "@/components/Modal/PurchaseModal";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import Heading from "@/components/Shared/Heading";
import ProductImages from "./ProductImage";
import CodModal from "@/components/Modal/CodModal";
import UseRole from "@/hooks/UseRole";
const ProductDetails = () => {
  const { id } = useParams();
  const [role, isRoleLoading] = UseRole();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/allProducts/${id}`
      );
      return res.data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
  };

  if (isLoading) return <LoadingSpinner />;

  const {
    _id,
    images = [],
    title,
    description,
    category,
    availableQuantity,
    price,
    minimumOrderQuantity,
    paymentOptions,
  } = product;

  console.log(role);

  return (
    <Container>
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row w-full gap-6 py-28 ">
        <div className="flex flex-col gap-6 flex-1">
          <ProductImages images={images} />
        </div>

        <div className="md:gap-10 flex-1 space-y-5 justify-center mt-6 lg:mt-22 px-6">
          <Heading
            title={title}
            subtitle={
              <>
                Category: <span className="text-pink-400">{category}</span>
              </>
            }
          />
          <p className="text-[16px] font-semibold ">
            Description : <span className="text-pink-400"> {description}</span>
          </p>

          <p className="font-semibold">
            Quantity: <span className="text-pink-400">{availableQuantity}</span>{" "}
            Units Left Only!
          </p>
          <p className="font-semibold">
            Minimum Order Quantity :{" "}
            <span className="text-pink-400">{minimumOrderQuantity}</span>
          </p>

          <div className="">
            <p className="font-bold text-xl mb-4">
              Price: <span className="text-pink-400">{price}</span> $
            </p>

            <p className="font-semibold">
              Payment Options :{" "}
              <span className="text-pink-400 mt-4">{paymentOptions}</span>
            </p>

            <button
              className={`w-full bg-[#3badcd] rounded-full py-3 text-white font-semibold hover:scale-105 transition-transform hover:opacity-80 mt-4 ${
                role !== "buyer" ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={role !== "buyer"}
              onClick={() => {
                if (role === "buyer") {
                  navigate(`/order/${_id}`, { state: { product } });
                }
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
