import DataTable from "../../../../examples/Tables/DataTable";

import _Project from "../../../../_Models/_Project";
import { Progress, Project } from "../../../ProjectsPage/data/projectsTableData";
import team2 from "../../../../assets/images/team-2.jpg";
import MDBox from "../../../../components/MDBox";
import MDBadge from "../../../../components/MDBadge";
import MDTypography from "../../../../components/MDTypography";
import { Box, Button, TableHead } from "@mui/material";
import Link from "@mui/material/Link";
import { useEffect, useMemo, useState } from "react";
import Card from "@mui/material/Card";
import MDButton from "../../../../components/MDButton";
import Icon from "@mui/material/Icon";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ProjectsRow from "../../../dashboard/components/Projects/ProjectsRow";
import TableContainer from "@mui/material/TableContainer";
import _Threat from "../../../../_Models/_Threat";
import ThreatRow from "../ThreatRow/ThreatRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ThreatsTable from "../ThreatsTable/ThreatsTable";
import Collapse from "@mui/material/Collapse";
import PropTypes from "prop-types";
import { getThreatTypeLS, getThreatTypesLS, setThreatType } from "../../../../assets/StorageItems";
import { setCurrentThreatType, useDataController } from "../../../../context/data/dataContext";


let   columns =  [
  { Header: "Name", accessor: "name", width: "30%", align: "left" },
  { Header: "Origin", accessor: "zones", align: "left" },
  { Header: "Type", accessor: "pipes", align: "left" },
  { Header: "Components", accessor: "systems", align: "center" },
  { Header: "Assessment", accessor: "assessment", align: "center" },
  { Header: "action", accessor: "action", align: "center" },
]



let ThreatTypes = getThreatTypesLS()

function ThreatTypeRow({threatType}) {
  const [dataController, dataDispatch] = useDataController()
  let {currentThreatType} = dataController

  const [applicable, setApplicable] = useState(0);
  useEffect(()=>{

  }, [threatType])
  return <>
    <TableRow  display={"flex"}>
      <TableCell ml={0}  sx={{ backgroundColor: "" }}>
        <MDTypography display="block" variant="button" fontWeight="medium">{threatType.name}</MDTypography>
      </TableCell>
      <TableCell ml={2} >
        {/*<MDTypography display="block" variant="caption" fontWeight="medium">Assessment</MDTypography>*/}
        {/*<MDTypography variant="caption"><Progress value={65} color={"error"} /></MDTypography>*/}
      </TableCell>
      {
        (currentThreatType.id == undefined) &&
        <TableCell  align={'right'}>
          {applicable === 0 &&  <MDButton variant="gradient" color="error" size={"small"} onClick={() => { setApplicable(1)}}>Not Applicable</MDButton>}
          {applicable === 1 &&  <MDButton variant="gradient" color="warning" size={"small"} onClick={() => { setApplicable(-1)}}>Confirm ?</MDButton>}
          {applicable === -1 &&  <MDButton variant="gradient" color="success" size={"small"} onClick={() => { setApplicable(0)}}>Applicable</MDButton>}
        </TableCell>
      }
      <TableCell width={'20px'} >
        <IconButton
          sx={{ backgroundColor: "", width: '20px'}}
          aria-label="expand row"
          size="small"
          onClick={()=>{
            if(currentThreatType.id == threatType.id){
              setCurrentThreatType(dataDispatch, {})
            }else {
              setCurrentThreatType(dataDispatch, threatType)}
            }
        }
        >
          {currentThreatType.id == threatType.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
    </TableRow>
    {
      currentThreatType.id == threatType.id &&
      <TableRow>
        <TableCell sx={{ backgroundColor: "#EEEEEE" }} colSpan={6}>
          <ThreatsTable threats={threatType.threats}></ThreatsTable>
        </TableCell>
      </TableRow>
    }


  </>;
}
ThreatTypeRow.propTypes = {
  type: PropTypes.any,
  onClick: PropTypes.func,
  open: PropTypes.any,
};

const ThreatTypesTable = ({}) => {

  const [threatTypes, setThreatTypes] = React.useState(getThreatTypesLS());


  useEffect( () => {
    // let getAll = await _Threat.getAll(0, 100)
    // let threats = await getAll.json()
    // console.log(threats)
    // setThreats(threats)
    setThreatTypes(getThreatTypesLS())
    if(threatTypes.length > 0){
      setThreatType(threatTypes)
    }



  }, [])

  return (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TYPE</TableCell>
                {/*<TableCell>Assessment state</TableCell>*/}
                <TableCell align={'right'}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                ThreatTypes?.map((threatType, index)=>{
                  return (
                    <ThreatTypeRow threatType={threatType} key={'treatType'+index}/>)
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
  )
}

ThreatTypesTable.propTypes = {
  FR: PropTypes.shape({}),

  isOpen: PropTypes.bool,
};
export default ThreatTypesTable


