import CallToAction from "../../Components/CallToAction/CallToAction";
import HeroSection from "../../Components/HeroSection/HeroSection";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import RestaurentsSlider from "../../Components/RestaurentsSlider/RestaurentsSlider";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <RestaurentsSlider />
      <CallToAction />
    </div>
  );
};

export default Home;
