import { Box, Divider, Grid, Paper, Stack } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import Switch from "@mui/material/Switch";
import MDTypography from "../../../../components/MDTypography";
import MDButton from "../../../../components/MDButton";
import { setBackDrop, useMaterialUIController } from "../../../../context/theme/themeContext";

import { TemplateHandler } from "easy-template-x";
import { useState } from "react";

import * as ReactDOMServer from 'react-dom/server';


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



const ProjectReport = ({project}) => {

  const [controller, dispatch] = useMaterialUIController();
  const [docs, setDocs] = useState( require('./t.xlsx'));
  const [selectedDocs, setSelectedDocs] = useState([]);

  async function handleGenerate() {

  }
  return (
    <Paper sx={{mx: 0, p:4}}>
      <Grid container spacing={2}>
        <Grid item  xs={6}>
          <Grid  container={true} spacing={2} >
            <Grid item xs={6}>
              <Stack>
                <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">Standard</MDTypography>
                <ReportSwitch text={'Definition'}></ReportSwitch>
                <ReportSwitch text={'Assessment team'}></ReportSwitch>
                <ReportSwitch text={'Assessment team'}></ReportSwitch>
                <Divider></Divider>
                <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">Stuff</MDTypography>
                <ReportSwitch text={'Include company'}></ReportSwitch>
                <ReportSwitch text={'Assessment team'}></ReportSwitch>
                <ReportSwitch text={'Team roles'}></ReportSwitch>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack>
                <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">Results</MDTypography>
                <ReportSwitch text={'Applicability measurement'}></ReportSwitch>
                <ReportSwitch text={'Threat actors distribution'}></ReportSwitch>
                <ReportSwitch text={'Threat actors distribution'}></ReportSwitch>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item  xs={6}>
          <Grid  container={true} spacing={2}>
            <Grid item xs={12}>
              <Box sx={{height: '80vh'}}>
                <iframe
                  src={"https://docs.google.com/viewer?url=" + 'http://51.83.69.176/report.docx'+ "&embedded=true"}
                  title="file"
                  width="100%"
                  height="750"
                ></iframe>

              </Box>

            </Grid>
            <Grid item xs={5}>
              <MDButton color={"error"} fullWidth onClick={()=>{setBackDrop(dispatch, false)}}>Cancel</MDButton>
            </Grid>
            <Grid item xs={7}>
              <MDButton color={"info"} fullWidth  onClick={()=>{
                handleGenerate().then()
              }}>Generate</MDButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
export default ProjectReport
