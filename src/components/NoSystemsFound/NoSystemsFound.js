import Card from "@mui/material/Card";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import Icon from "@mui/material/Icon";
import * as React from "react";
import { useMaterialUIController } from "../../context/theme/themeContext";
import { AddBox } from "@mui/icons-material";


function NoSystemsFound() {
  const [controller, dispatch] = useMaterialUIController();

  let projectInfo = {
    name: '',
    workSpaceId: localStorage.getItem('workSpaceId'),
    description: '',
  }
  const onChangeHandler = (e)=>{
    let name = e.target.name, value = e.target.value;
    projectInfo[name] = value
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    // _Project.create(projectInfo).then(createResul=>{
    //   if(createResul.status == '201'){
    //     PushNotification(dispatch,  "System has been created successfully", 'success')
    //     setBackDrop(dispatch, false)
    //   }else {
    //     PushNotification(dispatch,  'Could not create the system ', 'error', 3000)
    //   }
    // })
  }
  return (

    <Box   sx={{ width: "60%", backgroundColor: '', p:0, m:5}}>

          <MDButton>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <MDTypography variant="h4" fontWeight="medium"  mt={1}> Create</MDTypography>
              <AddBox  sx={{ fontSize: 40 }} />
            </Box>
          </MDButton>
          No Systems Found
    </Box>

  );
}

export default NoSystemsFound;
