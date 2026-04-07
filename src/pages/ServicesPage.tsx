import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const ServicesPage = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="pt-16">
        <ServicesSection />
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
