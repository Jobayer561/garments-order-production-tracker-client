import Banner from "@/components/Home/Banner";
import Brands from "@/components/Home/Brands";
import CustomerFeedback from "@/components/Home/CustomerFeedback";
import HowItWorks from "@/components/Home/HowItWorks";
import OurProducts from "@/components/Home/OurProducts";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import ProcessSnapshot from "@/components/Home/ProcessSnapshot";
import Team from "@/components/Home/Team";
import Newsletter from "@/components/Home/Newsletter";
import Container from "@/components/Shared/Container";
import OrderPolicies from "./OrderPolicies";
const Home = () => {
  return (
    <div>
      <Banner />

      <Container>
        <OurProducts />
        <HowItWorks />
        <Team />
        <CustomerFeedback />
        <Brands />
        <OrderPolicies />
        <WhyChooseUs />
        <ProcessSnapshot />
        <Newsletter />
      </Container>
    </div>
  );
};

export default Home;
