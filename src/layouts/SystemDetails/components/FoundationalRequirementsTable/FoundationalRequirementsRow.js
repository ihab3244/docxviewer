import DataTable from "../../../../examples/Tables/DataTable";
import { Progress, Project } from "../../../ProjectsPage/data/projectsTableData";
import MDBox from "../../../../components/MDBox";
import MDBadge from "../../../../components/MDBadge";
import MDTypography from "../../../../components/MDTypography";
import { Box, Button, SwipeableDrawer, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ThreatsTable from "../ThreatsTable/ThreatsTable";
import Collapse from "@mui/material/Collapse";
import PropTypes from "prop-types";
import { getFRS } from "../../../../assets/StorageItems";
import MDButton from "../../../../components/MDButton";
import Icon from "@mui/material/Icon";
import { setBackDrop, useMaterialUIController } from "../../../../context/theme/themeContext";
import FoundationalRequirementsTable
  from "../../../../components/FoundationalRequirementsRow/FoundationalRequirementsTable";
import NewTreatment from "../../../../components/NewTreatment/NewTreatment";
import _Zone from "../../../../_Models/_Zone";

const SRRow = async (dispatch, zone, sr)=>{
  let text = 'Start treatment'
  let treatment
  try {
    let getOne = await _Zone.getTreatment(zone.id, sr.id)
    if (getOne.status == '200') {
      treatment = await getOne.json()
      text = 'Update treatment'
      zone=zone
    }
  }
  catch (e){

  }

  return {
    title: <MDBox ml={2} lineHeight={0} bgColor={''}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {sr.title}
      </MDTypography>
      <MDTypography variant="caption">{sr.description}</MDTypography>
    </MDBox>,
    SLC: sr.SLC,
    stat: 'New',
    action: <Box>
      <MDButton variant="gradient" color="info" size={"small"} sx={{ mr: 1 }} onClick={() => {
        setBackDrop(dispatch, <Box sx={{mt: '10%'}}><NewTreatment sr={sr} zone={zone} treatment={treatment}></NewTreatment></Box>)
      }}>{text}</MDButton>
    </Box>
  }
}


const SystemRequirementsTable = ({srs, zone}) => {

  const [controller, dispatch] = useMaterialUIController();
  const [buttonText, setButtonText] = useState('Start Treatment');
  const [render, setRender] = useState(false);

  const openTreatment = (sr) => {
    setBackDrop(dispatch, <Box sx={{marginTop: '8%'}}><NewTreatment sr={sr} zone={zone}></NewTreatment></Box>)
  }


  let   columns =  [
    { Header: "Name", accessor: "title", width: "30%", align: "left" },
    { Header: "SLC", accessor: "SLC", align: "left" },
    { Header: "Stat", accessor: "stat", align: "left" },
    { Header: "action", accessor: "action", align: "right" },
  ]
  const [tableData, setTableData] = useState({ columns: [], rows: [] })
  const [rows, setRows] = useState([])

  async function prepareData() {
    let t = []
    for (const sr of srs) {
      let row = await SRRow(dispatch, zone, sr)
      t.push(row)
    }
    return t
  }

  useEffect(()=>{
    prepareData()
      .then(result=>{
        setTableData({columns: columns, rows: result})
        setRender(!render)
      })

  }, [srs])

  // useEffect(()=>{
  //   if(typeof rows == "object"){
  //     setTableData({columns: columns, rows: rows})
  //   }
  // }, [rows])

  return<>
    <DataTable
      pagination={{color: 'dark', variant: "gradient"}}
      showTotalEntries={true}
      table={tableData}
      isSorted={false}
      entriesPerPage={{defaultValue: 5}}
      // showTotalEntries={false}
      noEndBorder
    />
  </>
}







const FoundationalRequirementsRow = ({FR, isOpen=false, zone}) => {

  const [threats, setThreats]= useState([])
  const [open, setOpen] = React.useState(isOpen);

  useEffect( () => {
    // let getAll = await _Threat.getAll(0, 100)
    // let threats = await getAll.json()
    // setThreats(threats)


  }, [])

  return (
        <>
        <TableRow>
            <TableCell>
              <MDTypography variant="caption"  fontWeight="medium">{FR.name}</MDTypography>
            </TableCell>
            <TableCell>
                <MDTypography variant="caption"><Progress value={80} color={'secondary'}/></MDTypography>
            </TableCell>
            <TableCell align={'right'}>
              <IconButton
                sx={{backgroundColor: ''}}
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <SystemRequirementsTable srs={FR['systemRequirement']} zone={zone}></SystemRequirementsTable>
            </Collapse>
          </TableCell>
        </TableRow>
        </>






  )

}

FoundationalRequirementsRow.propTypes = {
  FR: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool.isRequired,
};
export default FoundationalRequirementsRow


