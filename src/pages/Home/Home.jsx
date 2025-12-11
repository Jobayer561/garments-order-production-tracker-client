import Banner from "@/components/Home/Banner";
import CustomerFeedback from "@/components/Home/CustomerFeedback";
import HowItWorks from "@/components/Home/HowItWorks";
import OurProducts from "@/components/Home/OurProducts";
import Container from "@/components/Shared/Container";

const Home = () => {
  return (
    <div>
      <Banner />

      <Container>
        <OurProducts />
        <HowItWorks />
        <CustomerFeedback />
      </Container>
    </div>
  );
};

export default Home;
