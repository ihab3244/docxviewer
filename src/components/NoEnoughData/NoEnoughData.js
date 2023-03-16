import { Icon, Paper } from "@mui/material";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import Application from "../Application/Application";


let NoEnoughData = ({title, desc, icon, iconProps})=>{

  return <Paper sx={{p:1, height: '450px', display: 'flex',  justifyContent: 'center', flexDirection: 'column', pl: '15%',}}>

    <MDBox display={'flex'} alignItems={'center'} mb={2}>
      <Icon   {...iconProps}  >{icon}</Icon>
      <MDTypography variant={'h5'}>{title}</MDTypography>
    </MDBox>
  <MDTypography variant={'caption'} fontWeight={"bold"}>{desc}</MDTypography>
  </Paper>
}

NoEnoughData.defaultProps = {
  icon:  'info',
  iconProps: {fontSize: 'large', sx: {mr: 2}},
  title: 'There is no enough data yet',
  desc: 'Statistics will be available when enough assessment data is provided'
};
export default NoEnoughData
