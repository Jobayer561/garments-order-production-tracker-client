import { Button } from "@/components/ui/button";
import Container from "../Shared/Container";
import Banner from "./Banner";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HowItWorks from "./HowItWorks";

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
      <Banner />
      <Container>
        {products && products.length > 0 ? (
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
            {products.map((product) => (
              <Card key={product._id} product={product} />
            ))}
          </div>
        ) : null}
        <HowItWorks />
      </Container>
    </div>
  );
};

export default OurProducts;
