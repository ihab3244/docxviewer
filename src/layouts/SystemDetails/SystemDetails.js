import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import MDTypography from "../../components/MDTypography";
import Icon from "@mui/material/Icon";
import * as React from "react";
import _System from "../../_Models/_System";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { setCurrentGlobalSystem, useDataController } from "../../context/data/dataContext";
import ThreatTypesTable from "./components/ThreatTypesTable/ThreatTypesTable";
import Box from "@mui/material/Box";
import SystemGeneralInfo from "./components/SystemGeneralInfo/SystemGeneralInfo";
import SystemStats from "./components/SystemsStats/SystemStats";
import SystemReport from "./components/SystemReport/SystemReport";
import { TemplateHandler } from 'easy-template-x';
import {
  CircularProgress,
  ClickAwayListener,
  Divider,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
} from "@mui/material";
import { setBackDrop, useMaterialUIController } from "../../context/theme/themeContext";
import NewSystem from "../../components/NewSystem/NewSystem";
import { Check } from "@mui/icons-material";
import Switch from "@mui/material/Switch";
import LoadingProvider from "../../components/LodingProvider/LoadingProvider";
import UI_STATUS from "../../components/LodingProvider/UiStatus";
import html2canvas from "html2canvas";
import docxGenerator from "../../Apis/DocxGenerator";

function ChildSelector(props) {
  return <MDBox sx={{mt: -10}}  pb={3} pt={1} px={1} variant="gradient" bgColor="info" borderRadius="lg">
  <Tabs orientation={"horizontal"} value={props.value} onChange={props.onChange} sx={{color: '#FFFFFF'}} indicatorColor={'primary'}>
    <Tab sx={{ mx: 2, }} label={<MDTypography color={"white"}>General Info</MDTypography>} icon={<Icon fontSize="small" sx={{ mt: -0.25, color: '#FFFFFF' }}>information</Icon>}/>
    <Tab sx={{ mr: 2 }} label={<MDTypography color={"white"}>Assessment</MDTypography>} icon={<Icon fontSize="small" sx={{ mt: -0.25, color: '#FFFFFF'  }}>settings</Icon>} />
    <Tab sx={{ mr: 2 }} label={<MDTypography color={"white"}>Report & Statistics</MDTypography>} icon={<Icon fontSize="small" sx={{ mt: -0.25, color: '#FFFFFF'  }}>query_stats</Icon>} />
  </Tabs></MDBox>;
}

ChildSelector.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};



function SystemDetails() {
  const { systemId, tab } = useParams()
  const [system, setSystem] = useState({ systems: [] })
  const [state, setState] = useState(UI_STATUS.LOADING)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tabValue, setTabValue] = useState(1);
  const [dataController, dataDispatch] = useDataController();
  const [controller, dispatch] = useMaterialUIController();
  let {currentGlobalSystem} = dataController
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  useEffect(()=>{
    switch (tab){
      case 'info':
        setTabValue(0)
        break
      case 'assessment':
        setTabValue(1)
        break
    }

  }, [tab])

  useEffect( () => {
    _System.getOne(systemId)
      .then(getProject=>{
        getProject.json()
          .then(system=>{
            setSystem(system)
            setCurrentGlobalSystem(dataDispatch, system)
            setState(UI_STATUS.READY)
          })
      })

  }, [systemId])

  async function handleGenerateReport() {
    setTabValue(2)

    let canvas = await html2canvas(document.querySelector('#applicabilityGraph'))
    let im = canvas.toBlob(r => {
      const data = {
        customer: 'oualid',
      };
      docxGenerator('../../report.docx', data, r).then(r => {
      })
    }, 'image/jpeg', 1)


  }

  return (
    <DashboardLayout>
      {/*<DashboardNavbar absolute />*/}
      <Card sx={{ mt: 20 }}>
        <MDBox display={'flex'} alignItems={'center'} justifyContent={'space-between'} mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg">
          <Stack>
            <MDBox display={'flex'} alignItems={'center'} sx={{position:'relative'}}>
              <Grow in={menuOpen}>
                <MDBox sx={{position: 'absolute', top:50, zIndex: (theme) => theme.zIndex.drawer + 9999}}>
                  {/*<ClickAwayListener onClickAway={()=>{setMenuOpen(false)}}>*/}
                    <Paper sx={{p:1}}>
                      <Stack spacing={2}>
                        {/*<MDButton variant="gradient" color="dark" sx={{ mr: 1 }} onClick={()=>{setBackDrop(dispatch,    <Box sx={{pl: '30vw', mt: '20vh'}}><NewSystem systemId={system.id}></NewSystem></Box>)}}>*/}
                        {/*  <Icon sx={{ fontWeight: "bold" }}>edit</Icon>*/}
                        {/*  &nbsp;edit*/}
                        {/*</MDButton>*/}
                        {/*<MDButton variant="gradient" color="dark" size={"small"} sx={{ mr: 1 }} onClick={()=>{setBackDrop(dispatch,    <Box sx={{pl: '30vw', mt: '20vh'}}><NewSystem systemId={system.id}></NewSystem></Box>)}}>*/}
                        {/*  <Icon sx={{ fontWeight: "bold" }}>report</Icon>*/}
                        {/*  &nbsp;Report*/}
                        {/*</MDButton>*/}
                        <MenuList dense>
                          <MenuItem>
                            <Icon>settings</Icon>
                            <ListItemText inset>Setting</ListItemText>
                          </MenuItem>
                          <Divider></Divider>
                          <MenuItem onClick={()=>{setMenuOpen(false)
                            setBackDrop(dispatch,    <Box sx={{pl: '30vw', mt: '20vh'}}><NewSystem systemId={system.id}></NewSystem></Box>)}}>
                            <Icon>edit</Icon>
                            <ListItemText inset>Edit</ListItemText>
                          </MenuItem>
                          <MenuItem
                            // onClick={()=>
                            // {setMenuOpen(false)
                            //   setBackDrop(dispatch,    <Box sx={{ml: '25vw', mt: '20vh', width: '30%'}}><SystemReport systemId={system.id}></SystemReport></Box>)}}

                            onClick={handleGenerateReport}
                          >
                            <Icon>summarize</Icon>
                            <ListItemText inset>Report</ListItemText>
                          </MenuItem>


                        </MenuList>
                      </Stack>
                    </Paper>
                  {/*</ClickAwayListener>*/}
                </MDBox>
              </Grow>
              <Icon fontSize={"large"} color={'action'} sx={{color: '#FFFFFF', mr: 2, }} onClick={()=>{setMenuOpen(!menuOpen)}}>{menuOpen? 'close': 'menu'}</Icon>
              <MDBox>
                <MDTypography variant="h5" color="white">{system.name}</MDTypography>
                <MDTypography  color={"light"} fontWeight={"bold"} sx={{fontSize: '16px'}} >Sub-system</MDTypography>
              </MDBox>
            </MDBox>
          </Stack>
          <ChildSelector value={tabValue} onChange={handleSetTabValue} />
        </MDBox>
        <LoadingProvider status={state} Loading={
          <Box sx={{backgroundColor: '', width: '100%', height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
          </Box>
        }>
          <MDBox pt={3}>
            <Box sx={{ display: tabValue == 0 ? 'block' : 'none' }}>
              {system.id !== undefined && <SystemGeneralInfo system={system}></SystemGeneralInfo>}
            </Box>
            <Box sx={{ display: tabValue == 1 ? 'block' : 'none' }}>
              {/*{ThreatTypes.map((FR, index) => (*/}
              {/*  // <FoundationalRequirementsTable FR={FR} isOpen={index == 0 ? true : false} />*/}
              {
                currentGlobalSystem !== {} &&
                <ThreatTypesTable/>
              }
            </Box>
            <Box sx={{ display: tabValue == 2 ? 'block' : 'none' }}>
              {/*{ThreatTypes.map((FR, index) => (*/}
              {/*  // <FoundationalRequirementsTable FR={FR} isOpen={index == 0 ? true : false} />*/}
              {
                currentGlobalSystem !== {} &&
                <SystemStats system={system}/>
              }
            </Box>
            <Box sx={{ display: tabValue == 3 ? 'block' : 'none' }}>
              {/*{ThreatTypes.map((FR, index) => (*/}
              {/*  // <FoundationalRequirementsTable FR={FR} isOpen={index == 0 ? true : false} />*/}
              {
                currentGlobalSystem !== {} &&
                <SystemReport system={system}/>
              }
            </Box>

          </MDBox>
        </LoadingProvider>

      </Card>
    </DashboardLayout>
  );
}

export default SystemDetails;
