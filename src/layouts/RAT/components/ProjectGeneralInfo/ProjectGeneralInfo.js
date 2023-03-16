import {
  Avatar, AvatarGroup,
  Box, Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack, Switch,
  TextField,
} from "@mui/material";
import team1 from '../../../../assets/images/team-1.jpg';
import modelUlr from './STATION.glb'
import { Chart } from "react-google-charts";
import MDTypography from "../../../../components/MDTypography";
import MDBox from "../../../../components/MDBox";
import NoEnoughData from "../../../../components/NoEnoughData/NoEnoughData";
import ProfileInfoCard from "../../../../examples/Cards/InfoCards/ProfileInfoCard";
import ProjectInfoCard from "../../../../components/ProjectInfoCard/ProjectInfoCard";
import Tooltip from "@mui/material/Tooltip";
import MDAvatar from "../../../../components/MDAvatar";
import DefaultProjectCard from "../../../../examples/Cards/ProjectCards/DefaultProjectCard";
import { useEffect } from "react";
import team2 from "../../../../assets/images/team-2.jpg";
import team3 from "../../../../assets/images/team-3.jpg";
import team4 from "../../../../assets/images/team-4.jpg";
import ProjectPrimaryInfo from "../../../../components/ProjectPrimaryInfo/ProjectPrimaryInfo";
import LatestAssessments from "../../../../components/LatestAssessments/LatestAssessments";
import ModelViewer from "../../../../components/ModelViewer/ModelViewer";


const ProjectGeneralInfo = ({project, zonesList}) => {



  useEffect(()=>{
    project.authors = [
      { image: team1, name: "Elena Morison" },
      { image: team2, name: "Ryan Milly" },
      { image: team3, name: "Nick Daniel" },
      { image: team4, name: "Peterson" },
    ]
    project.action = {
      type: "event",
      route: "/pages/profile/profile-overview",
      color: "info",
      label: "view project",
    }
    project.label = 'label'
    project.description = ''
  }, [project])

   const data = [
    ["Zone", "Systems"],
    ["Comfort", 2],
    ["Vehicle to Wayside ", 1],
    ["Operational", 7],
  ];

  const assessmentData1 = [
    ["zone", "Length"],
    ["Physical damage", 5],
    ["Loss of essential services", 6],
    ["Compromise of information", 3],
    ["Technical failures", 4],
  ];
  const assessmentData2 = [
    ["Dinosaur", "Length"],
    ["Physical damage", 1],
    ["Loss of essential services",2],
    ["Compromise of information", 3],
    ["Technical failures", 4],
  ];

   const options = {
    is3D: true
  };

   const diffdata = {
    old: assessmentData1,
    new: assessmentData2,
  };
  return(
    <Box sx={{py: 1, with:'100%'}}>
      <Grid  container={true} spacing={2}>
        {/*<Grid item xs={4}>*/}
        {/*  <DefaultProjectCard project={project}/>*/}
        {/*</Grid>*/}
        <Grid item xs={3}>
          {/*/!*<ZonesTable zonesList={zonesList}></ZonesTable>*!/*/}
          {/*<Paper sx={{p: 2}}>*/}
          {/*  <Stack spacing={2}>*/}
          {/*    /!*<MDTypography fontWeight={"bold"}>workspace:</MDTypography>*!/*/}
          {/*    /!*<FormControl>*!/*/}
          {/*    /!*  <InputLabel id="demo-multiple-chip-label">Standard</InputLabel>*!/*/}
          {/*    /!*  <Select variant={"outlined"} label={'Standard'} name={'standard'} value={'0'}>*!/*/}
          {/*    /!*    <MenuItem id={'0'}>ISO 27005</MenuItem>*!/*/}
          {/*    /!*    <MenuItem id={'1'}>ISO 27005</MenuItem>*!/*/}
          {/*    /!*  </Select>*!/*/}
          {/*    /!*</FormControl>*!/*/}
          {/*    /!*<Progress value={80} color={'error'}></Progress>*!/*/}
          {/*    <Invoice date={'Operation Zone'}  price="25" id={'20'}></Invoice>*/}
          {/*    <Invoice date="Operational Zone" id="60" price="25" />*/}
          {/*    <Invoice date={'Comfort Zone'} price={'kkjlk'}  id={'18'}></Invoice>*/}
          {/*    <Invoice date={'Vehicle to Wayside'} price={'kkjlk'} id={'15'}></Invoice>*/}
          {/*  </Stack>*/}

          {/*</Paper>*/}
          {/*<ProjectInfoCard*/}
          {/*  systemId={project.id}*/}
          {/*  title="Primary Information"*/}
          {/*  description={project.description}*/}
          {/*  info={{*/}
          {/*    Workspace: 'PRIMARY',*/}
          {/*    'zones and conduits': 'Not affected yet',*/}
          {/*    'sub-systems': 'Not affected yet',*/}
          {/*    components: 'hihi',*/}
          {/*    Participants:   <MDBox display="flex">*/}
          {/*      <Tooltip key={name} title={name} placement="bottom">*/}
          {/*        <MDAvatar*/}
          {/*          src={team1}*/}
          {/*          alt={name}*/}
          {/*          size="xs"*/}
          {/*          sx={({ borders: { borderWidth }, palette: { white } }) => ({*/}
          {/*            border: `${borderWidth[2]} solid ${white.main}`,*/}
          {/*            cursor: "pointer",*/}
          {/*            position: "relative",*/}
          {/*            ml: -1.25,*/}

          {/*            "&:hover, &:focus": {*/}
          {/*              zIndex: "10",*/}
          {/*            },*/}
          {/*          })}*/}
          {/*        />*/}
          {/*      </Tooltip>*/}
          {/*      <Tooltip key={name} title={name} placement="bottom">*/}
          {/*        <MDAvatar*/}
          {/*          src={team1}*/}
          {/*          alt={name}*/}
          {/*          size="xs"*/}
          {/*          sx={({ borders: { borderWidth }, palette: { white } }) => ({*/}
          {/*            border: `${borderWidth[2]} solid ${white.main}`,*/}
          {/*            cursor: "pointer",*/}
          {/*            position: "relative",*/}
          {/*            ml: -1.25,*/}

          {/*            "&:hover, &:focus": {*/}
          {/*              zIndex: "10",*/}
          {/*            },*/}
          {/*          })}*/}
          {/*        />*/}
          {/*      </Tooltip>*/}
          {/*      <Tooltip key={name} title={name} placement="bottom">*/}
          {/*        <MDAvatar*/}
          {/*          src={team1}*/}
          {/*          alt={name}*/}
          {/*          size="xs"*/}
          {/*          sx={({ borders: { borderWidth }, palette: { white } }) => ({*/}
          {/*            border: `${borderWidth[2]} solid ${white.main}`,*/}
          {/*            cursor: "pointer",*/}
          {/*            position: "relative",*/}
          {/*            ml: -1.25,*/}

          {/*            "&:hover, &:focus": {*/}
          {/*              zIndex: "10",*/}
          {/*            },*/}
          {/*          })}*/}
          {/*        />*/}
          {/*      </Tooltip>*/}
          {/*    </MDBox>*/}


          {/*  }}*/}
          {/*  social={[*/}
          {/*    {*/}
          {/*      link: "https://www.facebook.com/CreativeTim/",*/}
          {/*      icon: <Chip label="Brand new" color="info" size="small" />,*/}
          {/*      color: "facebook",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      link: "https://twitter.com/creativetim",*/}
          {/*      icon: <Chip label="Require attention" color="error" size="small" />,*/}
          {/*      color: "twitter",*/}
          {/*    }*/}
          {/*  ]}*/}
          {/*  action={{ route: "", tooltip: "Edit Profile" }}*/}
          {/*  shadow={true}*/}
          {/*/>*/}

          <Paper sx={{p:1}}>
            {project.authors !== undefined && <ProjectPrimaryInfo project={project}/>}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{height: 445}}>
            <ModelViewer scale="1" modelPath={modelUlr} />
          </Paper>
          {/*<LatestAssessments />*/}
        </Grid>
        {
          (project !== undefined && project.ready == true) &&
          <>
            <Grid item xs={4}>
              <Paper sx={{p:1}}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
                  <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Systems Distribution per zone
                  </MDTypography>
                </MDBox>
                <Chart
                  chartType="PieChart"
                  data={data}
                  options={options}
                  width={"100%"}
                  height={"400px"}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{p:1}}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
                  <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Zone Treatment
                  </MDTypography>
                </MDBox>
                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="400px"
                  diffdata={diffdata}
                  options={
                    {legend: { position: "none" },  diff: { newData: { legend: { position: "none" }, widthFactor: 0.8 } } }
                  }
                />
              </Paper>
            </Grid>
          </>

        }

        {
          (project.ready == false || project.ready == undefined) &&
          <>
            <Grid item xs={5}>
             <NoEnoughData></NoEnoughData>
            </Grid>
          </>

        }


      </Grid>
    </Box>
  )
}
export default ProjectGeneralInfo
