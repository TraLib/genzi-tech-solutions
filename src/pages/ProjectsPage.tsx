import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const ProjectsPage = () => {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <div className="pt-16">
        <ProjectsSection />
      </div>
      <Footer />
    </>
  );
};

export default ProjectsPage;
