import Navbar from "@/components/Navbar";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const CommunityPage = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="pt-16">
        <CommunitySection />
      </div>
      <Footer />
    </>
  );
};

export default CommunityPage;
