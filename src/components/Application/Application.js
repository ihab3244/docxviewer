import { Box, Grow } from "@mui/material";
import { cloneElement, useEffect, useState } from "react";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import Icon from "@mui/material/Icon";
import { removeApplication, setBackDrop, useMaterialUIController } from "../../context/theme/themeContext";
import PropTypes from "prop-types";
import ProjectsRow from "../../layouts/dashboard/components/Projects/ProjectsRow";
import Draggable from "react-draggable";
const Application = ({title, id, sx, children}) => {
  const [controller, dispatch] = useMaterialUIController();
  const [min, setMin] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      // sx.position = 'sticky'
    }, 3000)

  }, [])
  return (
    <Draggable>
    <Grow in={true}>

      <Box sx={sx} id={'Application'}>
        {
          title !== undefined &&
          <MDBox bgColor={'dark'} m={0} px={1} py={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'} variant="gradient" bgColor="dark"
                 sx={{borderTopRightRadius: '10px',  borderTopLeftRadius: '10px', height: '5%'}}>
            <MDTypography color={'white'} fontWeight={min ? "light" : 'light'}>
              {title}
            </MDTypography>
            <Box>
              <Icon color={'warning'}  onClick={()=>{setMin(true)}}>arrow_drop_down</Icon>
              <Icon color={'error'} fontSize={"medium"} onClick={()=>{removeApplication(dispatch, id)}}>cancel</Icon>
            </Box>
          </MDBox>

        }

        <Box sx={{display: min?'none': 'block', width: '100%', height: title !== undefined ? '95%': '100%'}}>
          {
            cloneElement(children, {id: id, ...children})
          }
        </Box>
      </Box>

    </Grow>
    </Draggable>


  )
}
let AppSx = {position: 'absolute', right: '4%', bottom: '2%', backgroundColor: '', maxWidth: '100vw', maxHeight: '100vh', overflow: 'auto',  zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: '-5px 10px  10px lightgrey' }
Application.propTypes = {
  sx: PropTypes.shape({}),
};
Application.defaultProps = {
  sx: AppSx
};
export  {AppSx}
export default Application


