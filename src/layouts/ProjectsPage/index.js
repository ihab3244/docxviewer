import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// RAA example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import projectsTableData, { Progress, Project } from "layouts/ProjectsPage/data/projectsTableData";
import { useState, useEffect, useMemo } from "react";
import _Project from "../../_Models/_Project";
import team2 from "../../assets/images/team-2.jpg";
import MDBadge from "../../components/MDBadge";
import { Button, MenuItem } from "@mui/material";
import Link from "@mui/material/Link";
import MDProgress from "../../components/MDProgress";
import TextField from "@mui/material/TextField";

let columns = [
  { Header: "name", accessor: "name", width: "30%", align: "left" },
  { Header: "Zones", accessor: "zones", align: "center" },
  { Header: "Pipes", accessor: "pipes", align: "center" },
  { Header: "Systems", accessor: "systems", align: "center" },
  { Header: "Assessment", accessor: "assessment", align: "center" },
  { Header: "Treatment", accessor: "treatment", align: "center" },
  { Header: "action", accessor: "action", align: "center" },
]
function ProjectsPage() {

  const [projects, setProjects] = useState()
  const [tableData, setTableData] = useState({ columns: [], rows: [] })

  useEffect(async () => {

    try {
      let getProjects = await _Project.getAll(0, 100)
      if (getProjects.status == '200') {
        console.clear()
        let projects = await getProjects.json()
        let rows = projects.map((project, index) => {
          return (
            {
              id: '1',
              name: <Project image={team2} name={project.name} ema il="Siram project description" />,
              zones: 5,
              pipes: (
                <MDBox ml={-1}>
                  <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
                </MDBox>
              ),
              systems: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  23/04/18
                </MDTypography>
              ),
              action: (
                <Button component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  <Link
                    href={'/ProjectDetails/' + project.id}
                  >
                    Details
                  </Link>

                </Button>
              ),
              assessment: <Progress color="info" value={80} />,
              treatment: <Progress color="info" value={40} />,
            }
          )
        })
        setTableData({ columns: columns, rows: rows })
      } else {
        console.log('failed downloading projects list')
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <DashboardLayout>
      {/*<DashboardNavbar />*/}
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">Projects</MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={tableData}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProjectsPage;
