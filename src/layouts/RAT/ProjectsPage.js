import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import Projects from "../dashboard/components/Projects/Projects";
import Footer from "../../examples/Footer";

function ProjectsPage() {
  return (
    <DashboardLayout>

      <MDBox py={3.5} mt={10}>
        <MDBox>
          <Projects />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  )
}

export default ProjectsPage
