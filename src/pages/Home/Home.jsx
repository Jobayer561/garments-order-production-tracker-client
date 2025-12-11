import Banner from "@/components/Home/Banner";
import Brands from "@/components/Home/Brands";
import CustomerFeedback from "@/components/Home/CustomerFeedback";
import HowItWorks from "@/components/Home/HowItWorks";
import OurProducts from "@/components/Home/OurProducts";
import Container from "@/components/Shared/Container";
import FactoryStatistics from "./FactoryStatistics";

const Home = () => {
  return (
    <div>
      <Banner />

      <Container>
        <OurProducts />
        <HowItWorks />
        <CustomerFeedback />
        <Brands />
        <FactoryStatistics />
      </Container>
    </div>
  );
};

export default Home;
