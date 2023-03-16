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
import { useEffect, useMemo, useState } from "react";
import MDButton from "../../../../components/MDButton";
import { setBackDrop, useMaterialUIController, } from "context/theme/themeContext";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import MDToggleButton from "../../../../components/MDToggleButton";
import NewAssessment from "../../../../components/NewAssessment/NewAssesment";
import { CURRENT_SYSTEM } from "../../../../assets/StorageItems";
import _ThreatEntry from "../../../../_Models/_ThreatEntry";
import useFetch from "../../../../Apis/useFetch";
import UI_STATUS from "../../../../components/LodingProvider/UiStatus";
import { FETCH_STATUS } from "../../../../assets/HttpResponses";
import ThreatRowActions from "./components/ThreatRowActions/ThreatRowActions";

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

const ThreatRow = ({ threat, nextThreat }) => {
  const [controller, dispatch] = useMaterialUIController();
  const [threatEntry, setThreatEntry] = React.useState(null);

 if(threat !== undefined){
   return (
     <>
       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} sx={{ backgroundColor: '', width: '100%' }} >
         <TableCell component="th" scope="row">{threat.name}</TableCell>
         <TableCell component="th" scope="row">{threat['Origin']}</TableCell>
         <TableCell scope="row" align={'right'}>
           <ThreatRowActions threat={threat} nextThreat={nextThreat}></ThreatRowActions>
         </TableCell>
       </TableRow>
     </>
   );
 }
};
ThreatRow.propTypes = { threat: PropTypes.shape({}).isRequired, };

export default ThreatRow
