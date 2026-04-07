import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const AboutPage = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="pt-16">
        <AboutSection />
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
