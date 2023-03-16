import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import { Progress } from "../../../ProjectsPage/data/projectsTableData";

function ChildSelector(props) {
  return <Tabs orientation={"horizontal"} value={props.value} onChange={props.onChange}>
    <Tab sx={{ mx: 2 }} label="Systems" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>home</Icon>} />
    <Tab sx={{ mr: 2 }} label="Zones" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>email</Icon>} />
    <Tab sx={{ mr: 2 }} label="Pipes" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>settings</Icon>} />
  </Tabs>;
}

ChildSelector.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

function FrRow({FR}) {

  // const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  const [open, setOpen] = React.useState(false);



  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} sx={{backgroundColor: '', width: '100%'}} >
        <TableCell component="th" scope="row" colSpan={5} align={'center'}>{FR.label}</TableCell>



        {/*{open &&<TableCell align="right" sx={{backgroundColor: ''}}></TableCell>}*/}
        {/*{open &&<TableCell align="right" sx={{backgroundColor: ''}}></TableCell>}*/}
        {/*{open &&<TableCell align="right" sx={{backgroundColor: ''}}></TableCell>}*/}
        {/*{open && <TableCell align="right"><ChildSelector value={tabValue} onChange={handleSetTabValue} /></TableCell>}*/}



      </TableRow>
      {/*<TableRow sx={{backgroundColor: 'lightgrey'}}>*/}
      {/*    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>*/}
      {/*    <Collapse in={open} timeout="auto" unmountOnExit>{renderChild()}</Collapse>*/}
      {/*   </TableCell>*/}
      {/*</TableRow>*/}
    </>
  );
}
FrRow.propTypes = {
  FR: PropTypes.shape({
    name: PropTypes.string.isRequired,

  }).isRequired,
};

export default FrRow
