import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const ContactPage = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="pt-16">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
