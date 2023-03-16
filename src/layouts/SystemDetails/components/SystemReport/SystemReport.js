import { Box, Divider, Grid, Paper, Stack } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import Switch from "@mui/material/Switch";
import MDTypography from "../../../../components/MDTypography";


const ReportSwitch = ({text})=>{
  return           <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
    <MDBox mt={0.5}>
      <Switch/>
    </MDBox>
    <MDBox width="80%" ml={0.5}>
      <MDTypography variant="button" fontWeight="regular" color="text">
        {text}
      </MDTypography>
    </MDBox>
  </MDBox>
}
const SystemReport = ({}) => {

  return (
    <Paper sx={{mx: 0, p:2}}>
      <Grid  container={true} spacing={2}>
        <Grid item xs={8}>
        <Stack>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">Standard</MDTypography>
          <ReportSwitch text={'Definition'}></ReportSwitch>
          <ReportSwitch text={'Assessment team'}></ReportSwitch>
          <ReportSwitch text={'Assessment team'}></ReportSwitch>
          <Divider></Divider>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">Stuff</MDTypography>
          <ReportSwitch text={'Include company'}></ReportSwitch>
          <ReportSwitch text={'Assessment team'}></ReportSwitch>
          <ReportSwitch text={'Assessment team'}></ReportSwitch>

          <Divider></Divider>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">Results</MDTypography>
          <ReportSwitch text={'Applicability measurement'}></ReportSwitch>
          <ReportSwitch text={'Threat actors distribution'}></ReportSwitch>
          <ReportSwitch text={'Threat actors distribution'}></ReportSwitch>


        </Stack>
        </Grid>
        <Grid item xs={4}>preview</Grid>

      </Grid>
    </Paper>
  )
}
export default SystemReport
