import Container from "../Shared/Container";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Banner from "./Banner";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OurProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/products`);
      return result.data;
    },
  });
  console.log(products);

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#3BADCD] mt-8">
        Our Products
      </h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default OurProducts;
