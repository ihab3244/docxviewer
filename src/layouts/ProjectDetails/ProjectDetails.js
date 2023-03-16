import { Card } from "@mui/material";
import MDBox from "../../components/MDBox";
import Box from "@mui/material/Box";
import SystemsTable from "../RAT/components/SystemsTable/SystemsTable";
import ProjectGeneralInfo from "../RAT/components/ProjectGeneralInfo/ProjectGeneralInfo";
import ZonesTable from "../RAT/components/ZonesTable/ZonesTable";
import FoundationalRequirementsTable from "../../components/FoundationalRequirementsRow/FoundationalRequirementsTable"
import { useState } from "react";
import MDTypography from "../../components/MDTypography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import { setBackDrop, useMaterialUIController } from "../../context/theme/themeContext";


function ChildSelector(props) {
  return <Tabs orientation={"horizontal"} value={props.value} onChange={props.onChange}>
    <Tab sx={{ mx: 2 }} label="General Info" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>feed</Icon>} />
    <Tab sx={{ mr: 2 }} label="Zones and conduits" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>auto_awesome_mosaic</Icon>} />
    <Tab sx={{ mx: 2 }} label="Sub systems" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>dns</Icon>} />

    <Tab sx={{ mr: 2 }} label="Treatment"
         icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>temp_preferences_custom</Icon>} />
    {/*<Tab sx={{ mr: 2 }} label="Report" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>summarize</Icon>} onClick={() => {*/}
    {/*  alert('hi')*/}
    {/*}} />*/}
  </Tabs>;
}

const ProjectDetails = ({project}) => {
  const [tabValue, setTabValue] = useState(0);
  const [controller, dispatch] = useMaterialUIController();
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  return(
    <>

      <Card sx={{ p:2, width: '70vw'}}>
        <MDBox
          display={'flex'} alignItems={'center'} justifyContent={'space-between'}
          mx={1} mb={2} mt={4} py={3} px={2} variant="gradient" bgColor="dark"
          borderRadius="lg" ZZcoloredShadow="info"
        >
          <MDTypography color={"white"}>{project.name}</MDTypography>

          <MDBox
            display={'flex'} alignItems={'center'} justifyContent={'space-between'}
            mx={2} mt={-8} py={3} px={2} variant="gradient" bgColor="white"
            borderRadius="lg" ZZcoloredShadow="white"
          >
            <ChildSelector value={tabValue} onChange={handleSetTabValue}></ChildSelector>
          </MDBox>
        </MDBox>
        <Box sx={{ display: tabValue == 0 ? 'block' : 'none' }}>
          <ProjectGeneralInfo project={project} zonesList={{}}></ProjectGeneralInfo>
        </Box>
        <Box sx={{ display: tabValue == 1 ? 'block' : 'none', backgroundColor: ''}}>
          <SystemsTable systemsList={project.systems}></SystemsTable>
        </Box>
        <Box sx={{ display: tabValue == 2 ? 'block' : 'none' }}>
          <ZonesTable zonesList={{}}></ZonesTable>
        </Box>
        <Box sx={{ display: tabValue == 3 ? 'block' : 'none', my: 1 }}>
          <FoundationalRequirementsTable/>
        </Box>

      </Card>
    </>

  )
}
export default ProjectDetails
