import DataTable from "../../../../examples/Tables/DataTable";

import _Project from "../../../../_Models/_Project";
import { Progress, Project } from "../../../ProjectsPage/data/projectsTableData";
import team2 from "../../../../assets/images/team-2.jpg";
import MDBox from "../../../../components/MDBox";
import MDBadge from "../../../../components/MDBadge";
import MDTypography from "../../../../components/MDTypography";
import { Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import MDButton from "../../../../components/MDButton";
import Icon from "@mui/material/Icon";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import {
  PushNotification,
  setBackDrop,
  setRenderer,
  useMaterialUIController,
} from "../../../../context/theme/themeContext";
import Box from "@mui/material/Box";
import NewProject from "../NewProject/NewProject";
import NewSystem from "../../../../components/NewSystem/NewSystem";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Link } from "react-router-dom";
import MDAvatar from "../../../../components/MDAvatar";
import SystemAssessment from "../../../../components/SystemAssessment/SystemAssessment";
import _System from "../../../../_Models/_System";
const System = ({ image, name, email: description }) => (
  <MDBox display={'flex'}>
    {/*<MDBox sx={{backgroundColor: 'red', width: '2rem', height: '2rem', borderRadius: '50%'}}>*/}
    {/*  BS*/}
    {/*</MDBox>*/}
    <Avatar sx={{ backgroundColor: 'secondary', color: '#FFFFFF'}}>{name.substring(0, 2)}</Avatar>
    <MDBox ml={2} lineHeight={0} bgColor={''}>

      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  </MDBox>
);
function ChildSelector(props) {
  return <Tabs orientation={"horizontal"} value={props.value} onChange={props.onChange}>
    <Tab sx={{ mx: 2 }} label="Systems" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>home</Icon>} />
    <Tab sx={{ mr: 2 }} label="Zones" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>email</Icon>} />
    <Tab sx={{ mr: 2 }} label="Pipes" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>settings</Icon>} />
  </Tabs>;
}
let columns = [
  { Header: "name", accessor: "name", width: "30%", align: "left" },
  { Header: "Components", accessor: "components",  align: "left" },
  // { Header: "Zones", accessor: "zones", align: "center" },
  { Header: "Stat", accessor: "stat", align: "left" },
  { Header: "Assessment", accessor: "assessment", align: "left" },
  { Header: "Created At", accessor: "createdAt", align: "left" },
  { Header: "action", accessor: "action", align: "right" },
]

const SystemsTable = ({ systemsList, projectName,  }) => {
  const [controller, dispatch] = useMaterialUIController();
  const {renderer} = controller


  const [tableData, setTableData] = useState({ columns: [], rows: [] })

  function handleDelete(id){
    _System.delete(id).then(createResul=> {
      if (createResul.status == '200') {

        // document.location.reload()
        PushNotification(dispatch, "System has been deleted successfully", 'success')
        setRenderer(dispatch, 'dataTable')
       //  setTimeout(()=>{
       //   setRenderer(dispatch, 'projects')
       // }, 2000)
      } else {
        PushNotification(dispatch, 'Could not create the system ', 'error', 3000)
      }
    })
  }

  function addSystem(system){

  }

  useEffect( () => {
    if(systemsList !== undefined){
      let rows = systemsList.map((system, index) => {
        return (
          {
            id: '1',
            name: <System image={team2} name={system.name} email="The main breaking system" />,
            components: 2,
            stat: (
              <MDBox ml={-1}>
                <MDBadge badgeContent="Ready" color="success" variant="gradient" size="md" />
              </MDBox>
            ),
            systems: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                23/04/18
              </MDTypography>
            ),
            action: (
              <>
                <MDButton variant="gradient" color="info" size={"small"} sx={{ mr: 1 }}>
                  <Icon sx={{ fontWeight: "bold" }}>open_in_new</Icon>
                  <Link
                    sx={{color: 'white'}}
                    to={'/'+projectName+'/Systems/' + system.id+ '/assessment'}
                  >
                    &nbsp;<span style={{color: "white"}}>start assessment</span>
                  </Link>

                </MDButton>
                <MDButton variant="gradient" color="light" size={"small"} sx={{ mr: 1 }} onClick={()=>{setBackDrop(dispatch,    <Box sx={{pl: '30vw', mt: '20vh'}}><NewSystem systemId={system.id}></NewSystem></Box>)}}>
                  <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
                  &nbsp;edit
                </MDButton>
                <MDButton variant="gradient" color="error" size={"small"} sx={{ mr: 1 }} onClick={()=>{handleDelete(system.id)}}>
                  <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                  &nbsp;delete
                </MDButton>
                <MDButton variant="gradient" color="dark" size={"small"} sx={{ mr: 1 }}>
                  <Icon sx={{ fontWeight: "bold" }}>open_in_new</Icon>
                  <Link
                    sx={{color: 'white'}}
                    to={'/'+projectName+'/Systems/' + system.id + '/info'}
                  >
                    &nbsp;<span style={{color: "white"}}>open</span>
                  </Link>
                </MDButton>
              </>
            ),
            createdAt: system.createdAt.toString().substring(0, 10),
            assessment: <Progress color="info" value={80} />,
          }
        )
      })
      setTableData({ columns: columns, rows: rows })
    }


  }, [systemsList, renderer.systemsTable])

  const downloadPdf = (rows, columns) => {
    const cols = columns.filter((col) => col.Header != 'action')
    const doc = new jsPDF()
    doc.text(`Project  : ${projectName}`, 24, 10)
    doc.autoTable({
      theme: "grid",
      columns: cols.map(col => ({ dataKey: col.accessor, title: col.Header })),
      body: rows.map(row => ({ ...row, zones: 5, pipes: "online", systems: "23/04/18", assessment: "80%" })),
      headStyles: {
        halign: 'center',
        fontSize: 14,
      },
      bodyStyles: {
        halign: 'center',
        fontSize: 12,
      }
    })
    doc.save('Systems list.pdf')
  }


  return (
    <MDBox mt={6} mb={4} sx={{position:'relative'}}>
      <MDBox position={'absolute'} mt={-2} py={1} px={0} right={4} mr={4} variant="gradient" borderRadius="lg" coloredShadow="dark" display={'flex'} justifyContent={'space-around'}>
        <MDButton variant="gradient" size={"small"} color="secondary" sx={{mx:2}} onClick={() => {
          setBackDrop(dispatch,
            <Box sx={{ pl: '30vw', mt: '20vh' }}>
              <NewSystem></NewSystem>
            </Box>
          )
        }}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;New sub system
        </MDButton>
        <MDButton variant="gradient" size={"small"} color="secondary"  sx={{mr:2}} onClick={() => {
          downloadPdf(systemsList, columns)
        }}>
          <Icon sx={{ fontWeight: "bold" }}>save</Icon>
          &nbsp;Export
        </MDButton>
        <MDButton variant="gradient" size={"small"} color="secondary"  sx={{mr:2}} onClick={() => {
          setBackDrop(dispatch,
            <Box sx={{ pl: '30vw', mt: '20vh' }}>
              <NewProject></NewProject>
            </Box>
          )
        }}>
          <Icon sx={{ fontWeight: "bold" }}>repeat</Icon>
          &nbsp;Refresh
        </MDButton>
      </MDBox>
      <DataTable
        pagination={{color: 'dark', variant: "gradient"}}
        showTotalEntries={true}
        table={tableData}
        useControlledState={   state => {
          return React.useMemo(
          () => ({
          ...state,
          data: tableData.rows,
          }),
          [state, tableData.rows]
          )
        }}
        isSorted={false}
        entriesPerPage={{defaultValue: 3}}
        // showTotalEntries={false}
        noEndBorder
      />
    </MDBox >
  )

}

export default SystemsTable
