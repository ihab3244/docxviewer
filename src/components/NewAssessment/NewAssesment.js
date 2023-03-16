import Card from "@mui/material/Card";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { v4 as uuid } from "uuid";
import {
  Box, Button,
  ButtonGroup,
  Chip, ClickAwayListener, Collapse,
  FormControl, FormControlLabel, Grow,
  IconButton,
  InputAdornment,
  InputLabel, ListItem,
  MenuItem, MenuList,
  NativeSelect,
  OutlinedInput, Paper, Popper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import _Project from "../../_Models/_Project";
import { PushNotification, setBackDrop, setRenderer, useMaterialUIController } from "../../context/theme/themeContext";
import Icon from "@mui/material/Icon";
import * as React from "react";
import NewProject from "../../layouts/RAT/components/NewProject/NewProject";
import HorizontalLinearStepper from "../HorizontalLinearStepper/HorizontalLinearStepper";
import * as PropTypes from "prop-types";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useEffect, useState } from "react";
import { DeleteOutlined, VisibilityOff } from "@mui/icons-material";
import {
  CURRENT_SYSTEM,
  getActors,
  getCIFs,
  getEntryPoints,
  getStandardLs,
  OPEN_NEXT_ASSESSMENT,
} from "../../assets/StorageItems";
import _ThreatEntry from "../../_Models/_ThreatEntry";
import { useDataController } from "../../context/data/dataContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MultipleSelection from "../MultipleSelection/MultipleSelection";
import Switch from "@mui/material/Switch";

function ExposureEntry({title, desc}) {
  return <MDBox sx={{ display: "flex", mb:2}}>
    <MDTypography  textTransform={"capitalize"} fontWeight={"bold"} sx={{mr: 2, width: '120px'}}>{title+': '}</MDTypography>
    <MenuList>
      {
        desc.map((entry, index)=>  <ListItem key={'exe'+index}> <MDTypography  fontWeight={'light'} as={'p'}>{'- '+entry.text}</MDTypography></ListItem>)
      }
    </MenuList>

  </MDBox>;
}



const options = ['Not Applicable', 'Close'];
const actionOptions = ['Update', 'Update and open next'];

function NewAssessment({threat, isDeployed}) {
  const [dataController, dataDispatch] = useDataController()
  const [render, setRender] = useState(false)
  const [openNext, setOpenNext] =  React.useState(localStorage.getItem(OPEN_NEXT_ASSESSMENT) == 'true' ? true : false);
  let {currentGlobalSystem} = dataController
  const storageAssessmentKey = threat.id + currentGlobalSystem.id
  let threatEntryLS = JSON.parse(localStorage.getItem(storageAssessmentKey))
  const storageKey = threat.id + currentGlobalSystem.id
  const [controller, dispatch] = useMaterialUIController();
  const [activeStep, setActiveStep] = React.useState(0);
  let assessmentInfoDefaults = {
    TTP1: '',
    TTP2: '',
    Actors: [],
    entryPoints: [],
    affectedComponents: [],
    exposure: -1,
    vulnerability: -1,
    CIFs: [],
    CIFvalueId: '',
    workSpaceId: localStorage.getItem('workSpaceId'),
    description: '',
    threatId: threat.id,
    systemId: dataController['currentGlobalSystem']['id']
  }
  const [assessmentInfo, setAssessmentInfo] = useState(assessmentInfoDefaults);


  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const Exposure = ({}) => {
    const [render, setRender] = useState(false)
    const [expandDetails, setExpandDetails] = useState(false)
    const exposures = getStandardLs()[0]['exposures']

    const sx = {
      exposureForm: {
        mb: 5,
        '&:hover':{
          '.test':{
            display: 'block'
          }
        },
        '.test':{
          p:2, mt:2,
          display: 'none'
        }
      },


    }

    return <>
      <MDBox sx={sx}>
        <FormControl fullWidth sx={sx.exposureForm}>
          <InputLabel id="demo-multiple-chip-label">Exposure</InputLabel>

          <Select label={'Exposure'} fullWidth onChange={(e)=>{
            onChangeHandler(e)
            setRender(!render)
          }
          } name={'exposure'}  value={assessmentInfo.exposure}>
            {
              exposures.map((entry, index) => {
                return <MenuItem value={entry.value} key={entry.id}>{entry.name}</MenuItem>
              })
            }
          </Select>
          <Paper className={'test'}>
            <Stack>
              {
                exposures.map((entry, index) => {
                  return   <ExposureEntry title={entry.name} desc={entry.descriptions}/>
                })
              }
            </Stack>
          </Paper>
        </FormControl>

        <FormControl fullWidth sx={sx.exposureForm}>
          <InputLabel id="demo-multiple-chip-label">Vulnerability</InputLabel>
          <Select label={'Vulnerability'} fullWidth onChange={(e)=>{
            onChangeHandler(e)
            setRender(!render)
          }
          } name={'vulnerability'}  value={assessmentInfo.vulnerability}>
            {
              exposures.map((entry, index) => {
                return <MenuItem value={entry.value} key={entry.id}>{entry.name}</MenuItem>
              })
            }
          </Select>
          <Paper className={'test'}>
            <Stack>
              {
                exposures.map((entry, index) => {
                  return   <ExposureEntry title={entry.name} desc={entry.descriptions}/>
                })
              }
            </Stack>
          </Paper>
        </FormControl>
      </MDBox>
    </>
  }

  const handleClick = () => {
    if(selectedIndex == 0){
      activeStep == 0 ? handleNotApplicable() : handleBack()
    } else {
      setBackDrop(dispatch, false)
    }

    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  useEffect(()=>{

    if (localStorage.getItem(storageKey) == null) localStorage.setItem(storageKey, JSON.stringify(assessmentInfoDefaults))
    setAssessmentInfo(JSON.parse(localStorage.getItem(storageKey) ))

  }, [threat])

  const onChangeHandler = (event)=>{
    const { target: { name, value}, } = event;
    assessmentInfo[name] = value
    localStorage.setItem(storageKey, JSON.stringify(assessmentInfo))

  }

  const TTP = ({}) => <Stack spacing={2}>

      <TextField type="text" label="Tactics, techniques and Procedures" name="TTP1" variant="outlined"
               placeholder={'Enter the tactics the threat actor will use to execute this threat'}
                 defaultValue={assessmentInfo.TTP1}
               onChange={onChangeHandler}
               multiline required rows={3} fullWidth />


      <MDInput type="text" label="Tactics, techniques and Procedures" name="TTP2" variant="outlined"
               placeholder={'Enter the tactics the threat actor will use to execute this threat'}
               defaultValue={assessmentInfo.TTP2}
               onChange={onChangeHandler}
               multiline  rows={3} fullWidth />

    </Stack>
  TTP.propTypes = { threat: PropTypes.shape({}).isRequired,  };

  const StepTwo = ({}) =>{
    assessmentInfo['applicability'] = true
    setAssessmentInfo(assessmentInfo)
    const ThreatActors = getActors()

    const EntryPoints = getEntryPoints()

    const SystemComponents = [
      {id: 0, name:  'jhkjhkjhkjhkjhk'},
    ];



    const [threatActors, setThreatActors] = useState(assessmentInfo.Actors);
    const [entryPoints, setEntryPoints] = useState(assessmentInfo.entryPoints);
    const [affectedComponents, setAffectedComponents] = useState(assessmentInfo.affectedComponents);



    const handleChange = (event) => {
      const { target: { name, value}, } = event;
      switch (name){
        case 'Actors':
          setThreatActors(typeof value === 'string' ? value.split(',') : value,);
          break
        case 'entryPoints':
          setEntryPoints(typeof value === 'string' ? value.split(',') : value,);
          break
        case 'affectedComponents':
          setAffectedComponents(typeof value === 'string' ? value.split(',') : value,);
          break;
      }
      onChangeHandler(event)
    };

    return(
      <Stack spacing={2}>
        <MultipleSelection value={threatActors} label={'Threat Actors'} name={'Actors'} list={ThreatActors} handleChange={handleChange}></MultipleSelection>
        <MultipleSelection value={entryPoints} label={'Entry Points'} name={'entryPoints'} list={EntryPoints} handleChange={handleChange}></MultipleSelection>
        <MultipleSelection value={affectedComponents} label={'Affected Components'} name={'affectedComponents'} list={currentGlobalSystem.components} handleChange={handleChange}></MultipleSelection>
      </Stack>
    )
  }
  StepTwo.propTypes = { threat: PropTypes.shape({}).isRequired,  };

  const StepThree = ({}) =>{

    const CIFs = getCIFs()
    const [CIF, setCIF] = useState(assessmentInfo.CIFs);
    const handleChange = (event) => {
      const { target: { name, value}, } = event;
      setCIF(typeof value === 'string' ? value.split(',') : value,);
      onChangeHandler(event)
    };

    return(
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}><MultipleSelection value={CIF} label={'Critical Impact Factors'} name={'CIFs'} list={CIFs} handleChange={handleChange}></MultipleSelection></Grid>
          <Grid item xs={4}>
            <FormControl fullWidth={true}>
              <InputLabel id="demo-multiple-chip-label" fullWidth>Impact  value</InputLabel>
              <Select label={'Impact  value'} name={'CIFvalueId'} onChange={(e)=>{
                onChangeHandler(e)
                setRender(!render)
              }} value={assessmentInfo.CIFvalueId}>
                {
                  getStandardLs()[0]['CIFvalues'].map((entry)=>{
                    return <MenuItem value={entry.id}>{entry.name}</MenuItem>
                  })
                }
              </Select>

            </FormControl>
          </Grid>

        </Grid>
        {/*CIFvalueId: ''*/}

        <TextField type="text" label="description" name="description" variant="outlined"
                   placeholder={'Enter the tactics the threat actor will use to execute this threat'}
                   defaultValue={assessmentInfo.description}
                   onChange={onChangeHandler}
                   multiline required rows={3} fullWidth />

      </Stack>
    )
  }
  // StepThree.propTypes = { threat: PropTypes.shape({}).isRequired,  };

  const Submit = ({}) =>{

    const CIFs = getCIFs()
    console.log('*********************************************************************')
    console.log(CIFs)
    const [CIF, setCIF] = useState(assessmentInfo.CIF);




    const handleChange = (event) => {
      const { target: { name, value}, } = event;
      setCIF(typeof value === 'string' ? value.split(',') : value,);
      onChangeHandler(event)
    };

    return(
      <MDBox>Submit</MDBox>
    )
  }


  const steps = [

    {label:'Basic Info', component:  <TTP threat={threat} />},
    {label:'Actor Details', component:    <StepTwo threat={threat} />},
    {label:'Impact', component:  <StepThree/>},
    {label:'Evaluation', component:  <Exposure />},
    // {label:'Submit', component:  <Submit/>},
  ];

  const handleNext = () => {setActiveStep((prevActiveStep) => prevActiveStep + 1);};

  const handleBack = () => {setActiveStep((prevActiveStep) => prevActiveStep - 1);};


  function submitCreate(){
    _ThreatEntry.create(assessmentInfo).then(createResul=>{
      if(createResul.status == '201'){
        PushNotification(dispatch,  "System has been created successfully", 'success')
        localStorage.removeItem(storageAssessmentKey)
        setBackDrop(dispatch, false)
      }else {
        PushNotification(dispatch,  'Could not create the system ', 'error', 3000)
      }
    })
  }

  function submitUpdate(){
    _ThreatEntry.update(currentGlobalSystem.id, threat.id, assessmentInfo).then(createResul=>{
      if(createResul.status == '200'){
        PushNotification(dispatch,  "Threat update successfully", 'success')
        setBackDrop(dispatch, false)
        localStorage.removeItem(storageKey)
      }else {
        PushNotification(dispatch,  'Could update the threat entry successfully', 'error', 3000)
      }
    })
  }

  function doOpenNext(next){

  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(activeStep < steps.length - 1) handleNext()
    else {
      if(isDeployed) submitCreate()
      else submitCreate()
    }
  }


  const handleNotApplicable = ()=>{
    if(isDeployed){
      _ThreatEntry.update(currentGlobalSystem.id, threat.id, {applicability: false}).then(createResul=>{
        alert(createResul.status)
        if(createResul.status == '200'){
          PushNotification(dispatch,  "Threat update successfully", 'success')
          localStorage.removeItem(storageKey)
          setBackDrop(dispatch, false)
        }else {
          PushNotification(dispatch,  'Could update the threat entry successfully', 'error', 3000)
        }
      })
    }else {
      _ThreatEntry.create({
        applicability: false,
        threatId: threat.id,
        systemId: dataController['currentGlobalSystem']['id']
      }).then(createResul=>{
        if(createResul.status == '201'){
          PushNotification(dispatch,  "Threat set not applicable", 'success')
          localStorage.removeItem(storageKey)
          setBackDrop(dispatch, false)
        }else {
          PushNotification(dispatch,  'Could not set threat to not applicable successfully ', 'error', 3000)
        }
      })
    }


  }

  return (
        <Card sx={{ width: "60%", backgroundColor: '', p: 2, ml: '20%', minHeight: '550px' }}>
          <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="success" mx={2} mt={-3} p={3} mb={1} textAlign="center">
            <Stepper activeStep={activeStep}>
              {steps.map((step, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={step.label} {...stepProps} sx={{color: 'secondary'}}>
                    <StepLabel {...labelProps} sx={{color: 'secondary'}}>{step.label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <MDTypography display="block" variant="button" color="white" my={1}>
            </MDTypography>
          </MDBox>
          <MDBox sx={{m:3,}} component="form" role="form"  onSubmit={handleSubmit}>
            {steps[activeStep]['component']}
            <MDBox sx={{position: 'absolute', bottom: 20, width: '93%'}}>

              {/*<Box sx={{width: '96%', display: 'flex',alignItems:'center', justifyContent: 'flex-end', backgroundColor: '', ml:2}}>*/}
              {/*  <FormControlLabel control={<Switch defaultChecked  checked={openNext} onChange={(event, checked)=>{*/}
              {/*    setOpenNext(checked)*/}
              {/*    localStorage.setItem(OPEN_NEXT_ASSESSMENT, checked.toString())*/}
              {/*  }}/>} label="Open next" />*/}
              {/*</Box>*/}
              <Grid container={true} xs={12} spacing={2}>

                <Grid item xs={4} sx={{position: 'relative'}}>
                  <ButtonGroup  color={"success"} variant="contained" ref={anchorRef} aria-label="split button" fullWidth sx={{ borderRadius: 10, backgroundColor: 'green'}}>
                    <Grid container xs={12}>
                      <Grid item={true} xs={9}>
                        <MDButton onClick={handleClick}  sx={{borderRadius: 0,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                        }} fullWidth={true} color={"error"}>{options[selectedIndex]}</MDButton>
                      </Grid>
                      <Grid item={true} xs={3}>
                        <MDButton
                          color={"error"}
                          sx={{
                            borderRadius: 0,
                            borderLeft: '2px solid grey',
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10
                          }}
                          aria-controls={open ? 'split-button-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-label="select merge strategy"
                          aria-haspopup="menu"
                          onClick={handleToggle}
                        >
                          <ArrowDropDownIcon />
                        </MDButton>
                      </Grid>
                    </Grid>
                  </ButtonGroup>
                  <Collapse in={open}>
                    <Paper sx={{ position: 'absolute', width: '100%', zIndex: (theme) => theme.zIndex.drawer + 9999}}>
                      <MenuList id="split-button-menu" autoFocusItem>
                        {options.map((option, index) => (
                          <MenuItem key={option} disabled={index === 2} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>{option}</MenuItem>
                        ))}
                      </MenuList>
                    </Paper>
                  </Collapse>
                </Grid>
                {/*<Grid item xs={2}>*/}
                {/*  <MDButton*/}
                {/*    variant="gradient" color="error" fullWidth onClick={() => {*/}
                {/*    activeStep == 0 ? handleNotApplicable() : handleBack()*/}

                {/*  }}>*/}
                {/*    {activeStep == 0 ? 'Not Applicable' : 'Back'}*/}
                {/*  </MDButton>*/}
                {/*</Grid>*/}
                {
                  activeStep > 0 &&
                  <Grid item xs={2}>
                    <MDButton
                      variant="gradient" color="warning" fullWidth onClick={()=>{setActiveStep(activeStep-1)}}>
                      Back
                    </MDButton>
                  </Grid>
                }
                <Grid item xs={activeStep == 0 ? 8:6}>
                  <MDButton
                    variant="gradient" color="info" fullWidth type={'submit'}>
                    {
                      activeStep == steps.length - 1
                        ? isDeployed
                          ? 'Update'
                          : 'Submit'
                        : 'Next'
                    }
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
  );
}

export default NewAssessment;
