import DataTable from "../../../../examples/Tables/DataTable";

import _Project from "../../../../_Models/_Project";
import { Progress, Project } from "../../../ProjectsPage/data/projectsTableData";
import team2 from "../../../../assets/images/team-2.jpg";
import MDBox from "../../../../components/MDBox";
import MDBadge from "../../../../components/MDBadge";
import MDTypography from "../../../../components/MDTypography";
import { Button, Table, TableContainer, TableHead } from "@mui/material";
import Link from "@mui/material/Link";
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
import NewZone from "../../../../components/NewZone/NewZone";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ProjectsRow from "../../../dashboard/components/Projects/ProjectsRow";
import DataTableHeadCell from "../../../../examples/Tables/DataTable/DataTableHeadCell";
import MDInput from "../../../../components/MDInput";
import { FETCH_STATUS } from "../../../../assets/HttpResponses";
import { useDataController } from "../../../../context/data/dataContext";
import * as PropTypes from "prop-types";
import ZoneRow from "../../../../components/ZoneRow/ZoneRow";
import ConduitsRow from "../../../../components/ConduitsRow/ConduitsRow";
import NewConduit from "../../../../components/NewConduit/NewConduit";


let   columns =  [
  { Header: "Name", accessor: "name", width: "30%", props:{align: "left"} },
  { Header: "From", accessor: "from", align: "left" },
  { Header: "To", accessor: "to", align: "center" },
  { Header: "Created At", accessor: "createdAt", align: "center" },
  { Header: "action", accessor: "action", props: {align: "center"} },
]




const ConduitsTable = ({zonesList}) => {
  const [controller, dispatch] = useMaterialUIController();
  const [dataController, dataDispatch] = useDataController();
  let {renderer} = controller
  let {currentProject} = dataController
  const [ rows, setRows ] = useState([])
  const [ render, setRender ] = useState(false)
  const [ newLine, setNewLine ] = useState(false)
  const [ newZoneName, setNewZoneName ] = useState('')

  useEffect( () => {
    if(zonesList !== undefined){
      let rows = zonesList.map((system, index)=>{

        return(
          {
            id: system.id,
            name: system.name,
            from: system.fromZone.name,
            to: system.toZone.name,
            createdAt: system.createdAt.toString().substring(0, 10),
          }
        )
      })
      setRows(rows)

    }

  }, [zonesList])


  function deleteZone(id){
    let newRows = rows.filter(zone =>zone.id !== id)
    setRows(newRows)

  }

  const handleCreateNew = ()=>{
    _Project.addZone({name: newZoneName, projectId: currentProject.id})
      .then(async createResult => {
        let zone = await createResult.json()
        if (createResult.status == FETCH_STATUS.POSTED) {
          PushNotification(dispatch, "System has been updated successfully", 'success')
          rows.push(          {
            id: zone.id,
            name: zone.name,
            from: 'kjllklkjll',
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
            createdAt: zone.createdAt.toString().substring(0, 10),
            assessment: <Progress color="info" value={Math.floor(Math.random() * 100)} />,
          })
          // setRenderer(dispatch, 'projects')
          setNewLine(false)

        } else {
          PushNotification(dispatch, 'Could not update the system correctly ', 'error', 3000)
        }
      })
      .catch(error=>{

      })
  }

  const handleCancelNew = (e)=>{
    setNewLine(false)
  }


  function handleSubmit(e){
    e.preventDefault()
    handleCreateNew()
  }

  // const handleNewZone = (e)=>{
  //     rows.push(newEntryRow)
  //     setRender(!render)
  // }

  return (
    <Card sx={{boxShadow: '10px 10px 10px grey', mt:6, mb: 2, width: '100%',}} >
      <MDBox  mt={-3} py={1} px={0}  ml={'75%'} mr={4}
              variant="gradient" borderRadius="lg" coloredShadow="dark"  display={'flex'} justifyContent={'space-around'}>
        <MDButton variant="gradient" size={"small"} color="secondary" onClick={()=>{setBackDrop(dispatch, <NewConduit></NewConduit>)}}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;New Conduit
        </MDButton>
        <MDButton variant="gradient"  size={"small"} color="secondary" onClick={()=>{}}>
          <Icon sx={{ fontWeight: "bold" }}>save</Icon>
          &nbsp;Export
        </MDButton>
        <MDButton variant="gradient"  size={"small"} color="secondary" onClick={()=>{}}>
          <Icon sx={{ fontWeight: "bold" }}>repeat</Icon>
          &nbsp;Refresh
        </MDButton>

      </MDBox>
      <TableContainer>

        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <DataTableHeadCell
                  key={'header' + index}
                  {...column.props}
                >
                  {column.Header}
                </DataTableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              newLine &&
              <TableRow>
                <TableCell colSpan={6}>
                  <MDBox  display={'flex'} component="form" role="form" onSubmit={handleSubmit} onChange={(e)=>{setNewZoneName(e.target.value)}}>
                    <MDInput label={'Name'} fullWidth sx={{mr:2}} required></MDInput>
                    <MDButton variant="gradient" color="info"  sx={{mr:1, px:10}} type={'submit'}>
                      <Icon sx={{ fontWeight: "bold" }}>save</Icon>
                      &nbsp;Save
                    </MDButton>
                    <MDButton variant="gradient" color="error"  sx={{mr:1, px:6}} onClick={handleCancelNew}>
                      <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                      &nbsp;Cancel
                    </MDButton>
                  </MDBox>
                </TableCell>
              </TableRow>
            }
            {rows.map((conduit, index) => (
              <ConduitsRow key={'zoneRow' + index} conduit={conduit} deleteZone={deleteZone}/>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
        {/*<DataTable*/}
        {/*  showTotalEntries={true}*/}
        {/*  table={tableData}*/}
        {/*  isSorted={false}*/}
        {/*  entriesPerPage={false}*/}
        {/*  showTotalEntries={false}*/}
        {/*  noEndBorder*/}
        {/*/>*/}
    </Card>
  )

}

export default ConduitsTable
