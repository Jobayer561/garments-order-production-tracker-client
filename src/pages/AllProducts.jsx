import Card from "@/components/Home/Card";
import Container from "@/components/Shared/Container";
import LoadingSpinner from "@/components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/allProducts`);
      return result.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Container>
      <div className="py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#3BADCD] mt-8">
          All Products
        </h2>
        {products && products.length > 0 ? (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 px-4">
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default AllProducts;
