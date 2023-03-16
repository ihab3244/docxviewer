import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ProjectsRow from "./ProjectsRow";
import * as React from "react";
import _Project from "../../../../_Models/_Project";
import { Progress, Project, EditProject } from "../../../ProjectsPage/data/projectsTableData";
import team2 from "../../../../assets/images/team-2.jpg";
import MDBadge from "../../../../components/MDBadge";
import { Button, TableHead } from "@mui/material";
import Link from "@mui/material/Link";
import MDButton from "../../../../components/MDButton";
import Icon from "@mui/material/Icon";
import { setBackDrop, setRenderer, useMaterialUIController } from "../../../../context/theme/themeContext";
import Box from "@mui/material/Box";
import NewProject from "../../../RAT/components/NewProject/NewProject";
import { setProjectList, useDataController } from "../../../../context/data/dataContext";
import DataTableHeadCell from "../../../../examples/Tables/DataTable/DataTableHeadCell";
const columns = [
  { label: '', align: 'left' },
  { label: 'Name', },
  { label: 'users', },
  { label: 'Systems', },
  { label: 'Zones', },
  { label: 'Assessment', },
  { label: 'Treatment', },
  { label: 'Created At', },
  { label: 'Actions ', align: 'right' },

]
function Projects() {
  const [controller, dispatch] = useMaterialUIController();
  const [render, setRender] = useState(false);
  const {renderer} = controller
  const [dataController, dataDispatch] = useDataController();
  let { projectList } = dataController
  // const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [rows, setRows] = useState([]);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  async function loadProjects() {
    try {
      let getProjects = await _Project.getAll(0, 100)
      if (getProjects.status == '200') {

        let projects = await getProjects.json()
        setProjectList(dataDispatch, projects)
      } else {
        console.log('failed downloading projects list')
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect( () => {
    loadProjects().then()
  }, [renderer.projects])

  useEffect( () => {
    if (projectList) {
       rowRender(projectList)
    }

  }, [projectList]);
  const rowRender = (projects) => {
    const rows = projects.map((project, index) => {
      return (
        {
          id: project.id,
          name: <Project image={project.image} name={project.name} email={project.description} />,
          editProject: <EditProject name={project.name} email="Siram project description" />,
          pipes: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          action: (
            <Button component="a" href="#" variant="caption" color="text" fontWeight="medium">
              <Link href={'/ProjectDetails/' + project.id}>Details</Link>
            </Button>
          ),
          assessment: <Progress color="info" value={80} />,
          treatment: <Progress color="info" value={40} />,
          systems: project['_count'].systems,
          zones: project['_count'].zones,
          createdAt: project['createdAt']
        }
      )
    })
    setRows(rows)
    setRender(!render)
  }

  return (
    <Card>
      <MDBox
        display={'flex'} alignItems={'center'} justifyContent={'space-between'}
        mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info"
        borderRadius="lg" ZZcoloredShadow="info"
      >
        <MDTypography variant="h6" color="white">Systems under control</MDTypography>
        <MDButton variant="gradient" color="dark" onClick={() => {setBackDrop(dispatch, <Box sx={{ pl: '30vw', mt: '20vh' }}><NewProject></NewProject></Box>)}}>
          <Icon sx={{ fontWeight: "bold" }}>library_add </Icon>
          &nbsp;add new system
        </MDButton>
      </MDBox>
      <MDBox pt={3}>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '' }}>
                {columns.map((column, index) => (
                  <DataTableHeadCell
                    key={'header' + index}
                    {...column}

                  >
                    {column.label}
                  </DataTableHeadCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <ProjectsRow key={row.id} project={row} rowRender={rowRender} isOpen={false}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MDBox>
    </Card>

  );
}

export default Projects;
