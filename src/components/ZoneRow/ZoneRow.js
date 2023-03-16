import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as PropTypes from "prop-types";
import MDButton from "../MDButton";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import MDBox from "../MDBox";
import MDInput from "../MDInput";
import _Project from "../../_Models/_Project";
import {
  addApplication,
  PushNotification,
  setBackDrop,
  setRenderer,
  useMaterialUIController,
} from "../../context/theme/themeContext";
import { useDataController } from "../../context/data/dataContext";
import FoundationalRequirementsTable from "../FoundationalRequirementsRow/FoundationalRequirementsTable";
import _Zone from "../../_Models/_Zone";



function ZoneRow({zone, deleteZone}) {
  const [editing, setEditing] = useState(false)
  const [ newName, setNewName ] = useState(zone.name)
  const [ deleting, setDeleting ] = useState(false)
  const [controller, dispatch] = useMaterialUIController();
  const [dataController, dataDispatch] = useDataController();


  function handleDelete(id){

    _Project.deleteZone(id)
      .then(deleteResult=>{
        if(deleteResult.status == '200'){
          PushNotification(dispatch,  "Zone deleted", 'success')
          setDeleting(false)
          // setRenderer(dispatch, 'projects')
          // setRenderer(dispatch, 'zonesTable')
          deleteZone(id)
        }
      })
      .catch(error=>{

      })
  }
  return <TableRow>
    {
      editing
        ?      <>
          <TableCell colSpan={6}>
            <MDBox  display={'flex'} component="form" role="form" onSubmit={''} >
              <MDInput label={'Name'} fullWidth sx={{mr:2}} required onChange={(e)=>{setNewName(e.target.value)}} value={newName}></MDInput>
              <MDButton variant="gradient" color="info"  sx={{mr:1, px:10}} type={'submit'}>
                <Icon sx={{ fontWeight: "bold" }}>save</Icon>
                &nbsp;Save
              </MDButton>
              <MDButton variant="gradient" color="error"  sx={{mr:1, px:6}} onClick={()=>{setEditing(false)}}>
                <Icon sx={{ fontWeight: "bold" }}>cancel</Icon>
                &nbsp;Cancel
              </MDButton>
            </MDBox>
          </TableCell>
        </>
        :   <>
          <TableCell>{zone.name}</TableCell>
          <TableCell>{zone.createdAt}</TableCell>
          {/*<TableCell>{zone.pipes}</TableCell>*/}
          {/*<TableCell>g</TableCell>*/}

          <TableCell align={"right"}     {...zone.props}>
            {
              deleting
              ? <>
                  <MDButton variant="gradient" color="warning" size={"small"} sx={{mr:1}} onClick={(e)=>{handleDelete(zone.id)}}>
                    <Icon sx={{ fontWeight: "bold" }}>confirm</Icon>
                    &nbsp;confirm
                  </MDButton>
                  <MDButton variant="gradient" color="error" size={"small"}  onClick={(e)=>{setDeleting(false)}}>
                    <Icon sx={{ fontWeight: "bold" }}>cancel</Icon>
                    &nbsp;cancel
                  </MDButton>
                </>
                : <>
                  <MDButton variant="gradient" color="info" size={"small"} sx={{mr:1}} onClick={(e)=>{
                    addApplication(dispatch, {App: <FoundationalRequirementsTable zone={zone}></FoundationalRequirementsTable>, title: zone.name + ' zone treatment portal', sx: {width: '80vw', boxShadow: null, height: '100%', top:0, bottom: '0%', right:0,}})
                    // setBackDrop(dispatch, <MDBox sx={{marginLeft: '20vw'}}>
                    //   <FoundationalRequirementsTable zone={zone}></FoundationalRequirementsTable>,
                    // </MDBox>)
                    // PushNotification(dispatch, 'Please finish the assessment step first', 'error', 60000 , 'Not ready for treatment yet')

                  }}>
                    <Icon sx={{ fontWeight: "bold" }}>start treatment</Icon>
                    &nbsp;start treatment
                  </MDButton>
                  <MDButton variant="gradient" color="light" size={"small"} sx={{mr:1}} onClick={(e)=>{setEditing(true)}}>
                    <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
                    &nbsp;edit
                  </MDButton>
                  <MDButton variant="gradient" color="error" size={"small"}  onClick={(e)=>{setDeleting(true)}}>
                    <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                    &nbsp;delete
                  </MDButton>
                </>

            }
          </TableCell>
        </>

    }


  </TableRow>;
}

export default ZoneRow

ZoneRow.propTypes = { zone: PropTypes.any };
