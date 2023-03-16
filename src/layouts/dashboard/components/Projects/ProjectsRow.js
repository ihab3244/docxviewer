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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MDButton from "../../../../components/MDButton";
import _Project from "../../../../_Models/_Project";
import { setCurrentGlobalProject as globalSetCurrentProject, updateProjectList, useDataController } from "../../../../context/data/dataContext";
import useFetch from "../../../../Apis/useFetch";
import { FETCH_STATUS } from "../../../../assets/HttpResponses";
import LoadingProvider from "../../../../components/LodingProvider/LoadingProvider";
import { Card, CircularProgress, Paper, Slide, SwipeableDrawer, Zoom } from "@mui/material";
import {
  addApplication,
  PushNotification,
  setBackDrop, setRenderer,
  useMaterialUIController,
} from "../../../../context/theme/themeContext";
import MDInput from "../../../../components/MDInput";
import MDBox from "../../../../components/MDBox";
import SystemsTable from "../../../RAT/components/SystemsTable/SystemsTable";
import ZonesTable from "../../../RAT/components/ZonesTable/ZonesTable";
import ProjectGeneralInfo from "../../../RAT/components/ProjectGeneralInfo/ProjectGeneralInfo";
import FoundationalRequirementsTable
  from "../../../../components/FoundationalRequirementsRow/FoundationalRequirementsTable";
import ProjectDetails from "../../../ProjectDetails/ProjectDetails";
import Tooltip from "@mui/material/Tooltip";
import MDAvatar from "../../../../components/MDAvatar";
import team1 from "../../../../assets/images/team-1.jpg";
import team2 from "../../../../assets/images/team-2.jpg";
import team3 from "../../../../assets/images/team-3.jpg";
import team4 from "../../../../assets/images/team-4.jpg";
import ProjectReport from "../../../RAT/components/ProjectReport/ProjectReport";
import NoEnoughData from "../../../../components/NoEnoughData/NoEnoughData";
import NewProject from "../../../RAT/components/NewProject/NewProject";
import NewConduit from "../../../../components/NewConduit/NewConduit";
import ConduitsTable from "../../../RAT/components/ConduitsTable/ConduitsTable";
import UiStatus from "../../../../components/LodingProvider/UiStatus";

const ChildSelector = props => <Tabs orientation={"horizontal"} value={props.value} onChange={props.onChange}>
  <Tab sx={{ mx: 2 }} label="General Info" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>feed</Icon>} />
  <Tab sx={{ mr: 2 }} label="Zones" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>auto_awesome_mosaic</Icon>} />
  <Tab sx={{ mr: 2 }} label="Conduits" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>auto_awesome_mosaic</Icon>} />
  <Tab sx={{ mx: 2 }} label="Sub systems" icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>dns</Icon>} />

  {/*<Tab sx={{ mr: 2 }} label="Treatment"*/}
  {/*     icon={<Icon fontSize="small" sx={{ mt: -0.25 }}>temp_preferences_custom</Icon>} />*/}
</Tabs>;

ChildSelector.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

const ProjectsRow = ({ project, rowRender, isOpen, parentRender }) => {
  const [ deleting, setDeleting ] = useState(false)
  const containerRef = useRef(null);
  const [tabValue, setTabValue] = useState(2);
  const [editProject, setEditProject] = useState(false);
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(false);
  const [projectName, setProjectName] = useState(project.name.props.name);
  const [internCurrentProject, setInternCurrentProject] = useState({});
  const [dataController, dataDispatch] = useDataController();
  const [controller, dispatch] = useMaterialUIController();
  const {renderer} = controller

  const [projectDetails, setProjectDetails] = useState(null)
  let { projectList } = dataController
  const { currentProject } = dataController
  const [ status, setStatus] = useState(UiStatus.LOADING)

  function loadInternProject(){
    _Project.getOne(project.id)
      .then(op=>{
        op.json()
          .then(project=>{
            setProjectDetails(project)
            setStatus(UiStatus.READY)
          })
      })
      .catch(e=>{
        alert('error')

      })
  }
  useEffect(()=>{
    loadInternProject()
  }, [project])


  useEffect(()=>{
    loadInternProject()
  }, [renderer.ConduitsTable])

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);



  // const zonesList = useMemo(() => internCurrentProject.zones, [internCurrentProject,]);
  const zonesList = internCurrentProject.zones
  const conduitsList = internCurrentProject.conduits


  useEffect(()=> {
    if(currentProject.id !== undefined){
      setOpen(currentProject.id === internCurrentProject.id)
    }

  }, [currentProject, internCurrentProject])



  const handleOpenChange = () => {
    if (currentProject.id == internCurrentProject.id) {
      setOpen(false)
      globalSetCurrentProject(dataDispatch, {})
    } else {
      globalSetCurrentProject(dataDispatch, internCurrentProject)
    }
  }

  useEffect(() => {
    if (projectDetails !== null) {
      setInternCurrentProject(projectDetails)
    }
  }, [projectDetails, renderer.projects])

  // change Project name and re-render project rows
  const handleChange = () => {
    _Project.update(internCurrentProject.id, {
      name: projectName
    }).then(r => {
      if (r.status == FETCH_STATUS.OK) {
        r.json()
          .then(r => {
            updateProjectList(dataDispatch, r)
            // re-render project rows
            rowRender(projectList)
            setEditProject(false)
          })
      }
    })
  }

  const openTreatment = () => {
    setBackDrop(dispatch, <FoundationalRequirementsTable></FoundationalRequirementsTable>)
  }
  const handleEditProject = () => {
    // if (editProject) {
    //   handleChange()
    // } else {
    //   setProjectName(project.name.props.name)
    //   // setDescription(project.name.props.email)
    //   setEditProject(!editProject)
    // }

    setBackDrop(dispatch, <Box sx={{ pl: '30vw', mt: '20vh' }}><NewProject project={internCurrentProject}></NewProject></Box>)
  }

  async function handleDownload() {
      setBackDrop(
        dispatch,
        <Box sx={{ml: '10vw', mt: '5vh', width: '70%'}}>
          <ProjectReport project={project}></ProjectReport>
        </Box>
      )
//     const response = await fetch('report.docx');
//     console.log(response)
//     const templateFile = await response.blob();
//
// // 2. process the template
//     const data = {
//       "customer":"aleston" ,
//
//       "isoVersion":"27005" ,
//
//       "dateOfPerform":"15th October and 25th October 2018",
//
//       "systemOwner":"system owner",
//
//       "systemCustodian":"system custodian",
//
//       "securityAdministrator": "security Administrator",
//
//       "NetworkManager":"Network Manager",
//
//       "RiskAssessmentTeam":"RiskAssessment Team",
//
//       "SecurityGoverningBody":"Security Governing Body",
//
//       "BusinessFunctionalManagers":"Business Functional Managers",
//
//       "ChiefInformationOfficer":"Chief Information Officer"
//
//
//     };
//
//     const handler = new TemplateHandler();
//     const doc = await handler.process(templateFile, data);

// 3. save output
//     saveFile('myTemplate - output.docx', doc);
  }

  const renderUsers = [
    { image: team1, name: "Elena Morison" },
    { image: team2, name: "Ryan Milly" },
    { image: team3, name: "Nick Daniel" },
    { image: team4, name: "Peterson" },
  ].map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  function handleDelete(id){
    _Project.delete(id)
      .then(deleteResult=>{
        if(deleteResult.status == '200'){
          PushNotification(dispatch,  "System deleted successfully", 'success', 20000)
          setRenderer(dispatch, 'projects')
          // setDeleting(false)
          // // setRenderer(dispatch, 'projects')
          // // setRenderer(dispatch, 'zonesTable')
          // deleteZone(id)
        }else {

        }
      })
      .catch(error=>{


      })
  }

  return (
    <LoadingProvider status={status} Loading={<TableRow sx={{ backgroundColor: '' }}><TableCell colSpan={8} align={'center'}><CircularProgress /></TableCell></TableRow>}>
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' }, backgroundColor: '', width: '100%' }} onDoubleClick={()=>{addApplication(dispatch, {App: <ProjectDetails project={internCurrentProject} />, title: 'Project Details'} )}}>
          <TableCell align={'right'}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleOpenChange}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {!editProject && <TableCell component="th" scope="row">{project.name}</TableCell>}
          {editProject &&
            <TableCell component="th" scope="row">
              <MDBox ml={2} lineHeight={0} bgColor={''}>
                <MDInput value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              </MDBox>
            </TableCell>}
          {/* {currentProject.id !== internCurrentProject.id && editProject &&
            <TableCell component="th" scope="row">{project.editProject} </TableCell>} */}
          {!open &&
            <>
              <TableCell align="left"><MDBox display="flex">{renderUsers}</MDBox></TableCell>
              <TableCell align="left">{project.systems}</TableCell>
              <TableCell align="left">{project.zones}</TableCell>
              <TableCell align="right">{project.assessment}</TableCell>
              <TableCell align="right">{project.treatment}</TableCell>
              <TableCell align="right">{project.createdAt.toString().substring(0, 10)}</TableCell>
            </>
          }

          {open&& <TableCell align="right" sx={{ backgroundColor: '' }} colSpan={5}></TableCell>}

          {open && <TableCell align="left" sx={{ backgroundColor: '' }} colSpan={2}><ChildSelector value={tabValue} onChange={handleSetTabValue} /></TableCell>}
          {currentProject.id == undefined && <TableCell align="right">

            {
              deleting
                ? <>
                  <MDButton variant="gradient" color="warning" size={"small"} sx={{mr:1}} onClick={(e)=>{handleDelete(project.id)}}>
                    <Icon sx={{ fontWeight: "bold" }}>confirm</Icon>
                    &nbsp;confirm
                  </MDButton>
                  <MDButton variant="gradient" color="error" size={"small"}  onClick={(e)=>{setDeleting(false)}}>
                    <Icon sx={{ fontWeight: "bold" }}>cancel</Icon>
                    &nbsp;cancel
                  </MDButton>
                </>
                : <>
                  <MDButton variant="gradient" color="info" size={"small"} sx={{ mr: 1 }}  onClick={handleDownload}>Generate Report</MDButton>
                  <MDButton variant="gradient" color="info" size={"small"} sx={{ mr: 1 }}  onClick={openTreatment} disabled>Start Treatment</MDButton>
                  <MDButton variant="gradient" color="info" size={"small"} sx={{ mr: 1 }} onClick={handleEditProject} >
                    <Icon sx={{ fontWeight: "bold" }}>edit</Icon>
                    {editProject ? "save" : "edit"}
                  </MDButton>
                  <MDButton variant="gradient" color="error" size={"small"} onClick={()=>{setDeleting(true)}}>
                    <Icon sx={{ fontWeight: "bold" }}>delete</Icon>
                    &nbsp;delete
                  </MDButton>
                </>
            }
          </TableCell>}


        </TableRow>
        <TableRow sx={{ backgroundColor: '#EFEFEF' }} ref={containerRef}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            {/*<Box sx={{display: open == true ?'block': 'none'}}>*/}
            {/*    <Box sx={{display: tabValue == 0 ?'block': 'none'}}>*/}
            {/*      <SystemsTable systemsList={systemsList}></SystemsTable>*/}
            {/*    </Box>*/}
            {/*    <Box sx={{display: tabValue == 1 ?'block': 'none'}}></Box>*/}
            {/*</Box>*/}

            <Collapse in={open} mountOnEnter unmountOnExit  container={containerRef.current}>
              <Box sx={{ display: tabValue == 0 ? 'block' : 'none' }}>
               <ProjectGeneralInfo project={internCurrentProject} zonesList={zonesList}></ProjectGeneralInfo>
              </Box>
              <Box sx={{ display: tabValue == 1 ? 'block' : 'none' }}>
                <ZonesTable zonesList={zonesList}></ZonesTable>
              </Box>
              <Box sx={{ display: tabValue == 2 ? 'block' : 'none' }}>
                <ConduitsTable zonesList={conduitsList}> </ConduitsTable>

              </Box>
              <Box sx={{ display: tabValue == 3 ? 'block' : 'none' }}>
                <SystemsTable systemsList={internCurrentProject.systems}/>
              </Box>
              <Box sx={{ display: tabValue == 4 ? 'block' : 'none', my: 1 }}>
                {
                  project.ready
                    ? <FoundationalRequirementsTable/>
                    :<NoEnoughData title={'Treatment not avaliable yet'} desc={'All the sub-systems of this SUC must complete the assessment process before starting the treatment'} ></NoEnoughData>
                }
              </Box>
              <Box sx={{ display: tabValue == 4 ? 'block' : 'none', my: 1 }}>
                <ProjectReport/>
              </Box>


            </Collapse>
            {/*<Collapse in={open} timeout="auto" unmountOnExit>*/}
            {/*  <Card sx={{boxShadow: '10px 10px 10px grey', mt:6, mb: 2, width: '100%',}} >*/}
            {/*    <MDBox  mt={-3} py={1} px={0} variant="gradient" bgColor="" borderRadius="lg" coloredShadow="info"  ml={'70%'} mr={4} display={'flex'} justifyContent={'space-around'}>*/}
            {/*      <ChildSelector value={tabValue} onChange={handleSetTabValue} />*/}
            {/*    </MDBox>*/}
            {/*    {renderChild()}*/}
            {/*  </Card>*/}


            {/*</Collapse>*/}
          </TableCell>
        </TableRow>
      </>

    </LoadingProvider>
  );
};
ProjectsRow.propTypes = {
  project: PropTypes.shape({}).isRequired,
};

export default ProjectsRow
