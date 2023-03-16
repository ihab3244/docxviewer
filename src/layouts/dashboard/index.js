import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProjectsCards from "../../components/ProjectsCards/ProjectsCards";
import MDTypography from "../../components/MDTypography";
import { Box, Icon } from "@mui/material";
import Card from "@mui/material/Card";
import MDButton from "../../components/MDButton";
import LatestAssessments from "../../components/LatestAssessments/LatestAssessments";
import { Link } from "react-router-dom";



function Dashboard() {
  return (
    <DashboardLayout>
      <Grid container spacing={2} sx={{pt:8}}>
        <Grid item xs={12}>
          <Card sx={{mt: 0, mb:1}}>
            <MDBox
              display={'flex'} alignItems={'center'} justifyContent={'space-between'}
              mx={1} mt={0}  mb={1} py={1} px={2} variant="gradient"
              borderRadius="lg" ZZcoloredShadow="info"
            >
              <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Recently consulted projects
              </MDTypography>
              <Link
                sx={{color: 'white'}}
                to={'/rat'}
              >
              <MDButton>
                  <MDTypography variant="h6" fontWeight="medium" >see all</MDTypography>
                  <Icon color={'primary'} sx={{ml: 1}}>open_in_new</Icon>
              </MDButton>
              </Link>
            </MDBox>
            <ProjectsCards />
          </Card>
        </Grid>
        <Grid item xs={4}><LatestAssessments /></Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
