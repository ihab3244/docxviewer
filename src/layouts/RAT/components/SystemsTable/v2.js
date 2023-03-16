import DataTable from "../../../../examples/Tables/DataTable";

import _Project from "../../../../_Models/_Project";
import { Progress, Project } from "../../../ProjectsPage/data/projectsTableData";
import team2 from "../../../../assets/images/team-2.jpg";
import MDBox from "../../../../components/MDBox";
import MDBadge from "../../../../components/MDBadge";
import MDTypography from "../../../../components/MDTypography";
import { Button, TableHead } from "@mui/material";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import MDButton from "../../../../components/MDButton";
import Icon from "@mui/material/Icon";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { setBackDrop, useMaterialUIController } from "../../../../context/theme/themeContext";
import Box from "@mui/material/Box";
import NewProject from "../NewProject/NewProject";
import NewSystem from "../../../../components/NewSystem/NewSystem";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ProjectsRow from "../../../dashboard/components/Projects/ProjectsRow";
import * as PropTypes from "prop-types";

function ChildSelector(props) {
  return <Tabs orientation={"horizontal"} value={props.value} onChange={props.onChange}>
    <Tab sx={{ mx: 2 }} label="Systems" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>home</Icon>} />
    <Tab sx={{ mr: 2 }} label="Zones" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>email</Icon>} />
    <Tab sx={{ mr: 2 }} label="Pipes" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>settings</Icon>} />
  </Tabs>;
}


const ZoneSystemsRow = props => <TableRow>
  <TableCell>{props.system.name}</TableCell>
  <TableCell><Progress color={"red"} value={props.system.assessment}></Progress></TableCell>
  <TableCell>{props.system.components}</TableCell>
  <TableCell>{props.system.components}</TableCell>
  <TableCell>{props.system.components}</TableCell>
  <TableCell align={"right"}>
    <MDButton variant="gradient" color="dark" size={"small"} sx={{ mr: 1 }}>
      <Icon sx={{ fontWeight: "bold" }}>details</Icon>
      <Link
        href={"/Systems/" + props.system.id}
      >
        &nbsp;Details
      </Link>

    </MDButton>
    <MDButton variant="gradient" color="info" size={"small"}>
      <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
      &nbsp;edit
    </MDButton>
    <MDButton variant="gradient" color="error" size={"small"}>
      <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
      &nbsp;delete
    </MDButton>
  </TableCell>
</TableRow>;

ZoneSystemsRow.propTypes = { system: PropTypes.any };

function ZoneSystems({systems}) {
  let   columns =  [
    { Header: "name", accessor: "name", width: "30%", align: "left" },
    { Header: "Zones", accessor: "zones", align: "center" },
    { Header: "Pipes", accessor: "pipes", align: "center" },
    { Header: "Components", accessor: "systems", align: "center" },
    { Header: "Assessment", accessor: "assessment", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]
  return(<TableContainer component={Paper} sx={{width: '100%', backgroundColor: ''}}>
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: '' }}>
          {columns.map((column) => (
            <TableCell
              {...column}

            >
              {column.Header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {systems.map(system=>
          <ZoneSystemsRow system={system} />
        )}

      </TableBody>
    </Table>
  </TableContainer>)

}

ZoneSystems.propTypes = { system: PropTypes.any };
const ZoneRow = ({zone, isOpen}) => {
  const [open, setOpen] = useState(isOpen)
  return(
    <>
      <TableRow sx={{ backgroundColor: "", '& > *': { borderBottom: 'unset'}  }}>
        <TableCell>{zone.name}</TableCell>
        <TableCell>Systems: {zone.systems.length}</TableCell>
        <TableCell sx={{ p: 0 }}>
          <Box sx={{ display: "flex" }}>
            Assessment <Progress color={"error"} value={zone.assessment} />
          </Box>
        </TableCell>
        <TableCell align={"right"}>
          <MDButton variant="gradient" color="info" size={"small"} sx={{ mr: 1 }}>
            <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
            &nbsp;edit
          </MDButton>
          <MDButton variant="gradient" color="error" size={"small"}>
            <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
            &nbsp;delete
          </MDButton>
        </TableCell>
      </TableRow>
      {
        open &&
        <TableRow sx={{backgroundColor: ''}}>
          <TableCell colSpan={4}>
            <ZoneSystems systems={zone.systems} />
          </TableCell>
        </TableRow>
      }

    </>


  )

}

const SystemsTable = ({systemsList}) => {
  let   zones =  [
    { name: 'Operational Zone', systems: [{name: 'Breaking System', assessment: 60, components: 5}], assessment: 30, align: "left" },
    { name: 'Wayland Zone', systems: [], assessment: 80, align: "left" },
    { name: 'Outside Zone', systems: [], assessment: 60, align: "left"},
  ]
  const [controller, dispatch] = useMaterialUIController();

  const [ tableData, setTableData ] = useState({ columns: [], rows: [] })
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  useEffect(async () => {
    let rows = systemsList.map((system,  index)=>{
      return(
        {
          id: '1',
          name: <Project image={team2} name={system.name} ema  il="Siram project description" />,
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
            <>
              <MDButton variant="gradient" color="dark" size={"small"} sx={{mr:1}}>
                <Icon sx={{ fontWeight: "bold" }}>details</Icon>
                <Link
                  href={'/Systems/'+system.id}
                >
                  &nbsp;Details
                </Link>

              </MDButton>
              <MDButton variant="gradient" color="info" size={"small"} >
                <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
                &nbsp;edit
              </MDButton>
              <MDButton variant="gradient" color="error" size={"small"}>
                <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                &nbsp;delete
              </MDButton>
            </>

          ),
          assessment: <Progress color="info" value={80} />,
        }
      )
    })
    setTableData({columns: columns, rows: rows})

  }, [systemsList])
  let   columns =  [
    { Header: "name", accessor: "name", width: "30%", align: "left" },
    { Header: "systems", accessor: "zones", align: "center" },
    { Header: "treatment", accessor: "systems", align: "center" },
    { Header: "action", accessor: "action", align: "right" },
  ]
  return (
    <Card sx={{ boxShadow: '10px 10px 10px grey', mt: 6, mb: 2, width: '100%', }}>
      <MDBox mt={-3} py={1} px={0} ml={'75%'} mr={4} variant="gradient" borderRadius="lg" coloredShadow="dark" display={'flex'} justifyContent={'space-around'}>
        <MDButton variant="gradient" size={"small"} color="secondary" onClick={() => {setBackDrop(dispatch, <Box sx={{ pl: '30vw', mt: '20vh' }}><NewSystem></NewSystem></Box>)}}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;New
        </MDButton>
        <MDButton variant="gradient" size={"small"} color="secondary" onClick={() => {
          setBackDrop(dispatch,
            <Box sx={{ pl: '30vw', mt: '20vh' }}>
              <NewProject></NewProject>
            </Box>
          )
        }}><Icon sx={{ fontWeight: "bold" }}>save</Icon>&nbsp;Export</MDButton>
        <MDButton variant="gradient" size={"small"} color="secondary" onClick={() => {setBackDrop(dispatch, <Box sx={{ pl: '30vw', mt: '20vh' }}><NewProject></NewProject></Box>)}}>
          <Icon sx={{ fontWeight: "bold" }}>repeat</Icon>
          &nbsp;Refresh
        </MDButton>
      </MDBox>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell  {...column}>{column.Header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {zones.map((zone, index) => (
              <ZoneRow zone={zone} isOpen={index == 0?true: false}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )

}

export default SystemsTable
