import { Button } from "@/components/ui/button";
import Card from "./Card";
import Container from "../Shared/Container";
import Banner from "./Banner";

const Plants = () => {
  return (
    <div>
      <Banner />
      <Container>
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          <Card />
        </div>
      </Container>
    </div>
  );
};

export default Plants;
