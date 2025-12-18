import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "@/components/Shared/Container";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import Heading from "@/components/Shared/Heading";
import ProductImages from "./ProductImage";
import UseRole from "@/hooks/UseRole";
import { useNavigate } from "react-router";
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

  console.log("product details", status);
  console.log(role);
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

  return (
    <Container>
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row w-full gap-6 py-36">
        <div className="flex flex-col gap-6 flex-1">
          <ProductImages images={images} />
        </div>

        <div className="md:gap-10 flex-1 space-y-5 justify-center mt-6 lg:mt-0 px-6">
          <Heading
            title={title}
            subtitle={
              <>
                Category: <span className="text-[#3badcd]">{category}</span>
              </>
            }
          />
          <p className="text-[16px] font-semibold">
            Description: <span className="text-[#3badcd]">{description}</span>
          </p>

          {demoVideoLink && (
            <div className="mt-2 flex gap-2">
              <p className="font-semibold">Demo Video:</p>
              <a
                href={demoVideoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3badcd] hover:underline font-semibold"
              >
                Watch Video
              </a>
            </div>
          )}

          <p className="font-semibold">
            Quantity:{" "}
            <span className="text-[#3badcd]">{availableQuantity}</span> Units
            Left Only!
          </p>
          <p className="font-semibold">
            Minimum Order Quantity:{" "}
            <span className="text-[#3badcd]">{minimumOrderQuantity}</span>
          </p>

          <div>
            <p className="font-bold text-xl mb-4">
              Price: <span className="text-[#3badcd]">{price}</span> $
            </p>

            <p className="font-semibold">
              Payment Options:{" "}
              <span className="text-[#3badcd] mt-4">{paymentOption}</span>
            </p>

            <button
              className={`w-full bg-[#3badcd] rounded-full py-3 text-white font-semibold hover:scale-105 transition-transform hover:opacity-80 mt-4 ${
                role !== "Buyer" || status !== "approve"
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
              disabled={role !== "Buyer" || status !== "approve"}
              onClick={() => {
                if (role === "Buyer" && status === "approve") {
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
