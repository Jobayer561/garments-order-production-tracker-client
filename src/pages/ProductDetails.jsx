import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "@/components/Shared/Container";
import Button from "@/components/Shared/Button/Button";
import PurchaseModal from "@/components/Modal/PurchaseModal";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import Heading from "@/components/Shared/Heading";
import ProductImages from "./ProductImage";
import CodModal from "@/components/Modal/CodModal";

const ProductDetails = () => {
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "payfirst" | "cod"

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
    images = [],
    title,
    description,
    category,
    availableQuantity,
    price,
    paymentOptions,
  } = product;

  return (
    <Container>
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row w-full gap-6 py-28 ">
        <div className="flex flex-col gap-6 flex-1">
          <ProductImages images={images} />
        </div>

        <div className="md:gap-10 flex-1 space-y-5 justify-center mt-6 lg:mt-22 px-6">
          <Heading title={title} subtitle={`Category: ${category}`} />

          <p className="text-xl font-semibold ">Description : {description}</p>

          <p className="font-semibold">
            Quantity: {availableQuantity} Units Left Only!
          </p>

          <div className="">
            <p className="font-bold text-2xl text-gray-500">Price: {price}$</p>
          </div>
          <div className="flex gap-3">
            {paymentOptions === "PayFirst" && (
              <Button
                label="Pay First"
                onClick={() => {
                  setModalType("PayFirst");
                  setIsOpen(true);
                }}
              />
            )}

            {paymentOptions === "Cash On Delivery" && (
              <Button
                className=""
                label="Cash On Delivery"
                onClick={() => {
                  setModalType("Cash On Delivery");
                  setIsOpen(true);
                }}
              />
            )}
          </div>

          <PurchaseModal
            product={product}
            closeModal={closeModal}
            isOpen={isOpen && modalType === "PayFirst"}
          />

          <CodModal
            product={product}
            closeModal={closeModal}
            isOpen={isOpen && modalType === "Cash On Delivery"}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
