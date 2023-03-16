import Card from "@mui/material/Card";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {
  Box, ButtonGroup, ClickAwayListener,
  FormControl, FormLabel, Grow, IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  NativeSelect, OutlinedInput, Popper,
  Select, Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { PushNotification, setBackDrop, setRenderer, useMaterialUIController } from "../../context/theme/themeContext";
import Icon from "@mui/material/Icon";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useEffect, useState } from "react";
import { DeleteOutlined, Label, VisibilityOff } from "@mui/icons-material";
import _System from "../../_Models/_System";
import { useDataController } from "../../context/data/dataContext";
import _Conduit from "../../_Models/_Conduit";


const GeneralInfo = ({systemInfo, onChange}) => {
  const [fromZones, setFromZones] = useState([])
  const [toZones, setToZones] = useState([])
  const [render, setRender] = useState(true)
  const [defaultValue, setDefaultValue] = useState('')
  const [dataController, dispatch] = useDataController()
  let {currentProject} = dataController

  const onChangeHandler = (e) => {
    const {name, value} = e.target
    switch (name){
      case 'from':
        setToZones(currentProject.zones.filter(entry=> entry.id != value))
        break
      case 'to':
        setFromZones(currentProject.zones.filter(entry=> entry.id != value))
        break
    }
    onChange(e)
  }


  useEffect(()=>{
    try{
      setFromZones(currentProject.zones)
      setToZones(currentProject.zones)
    }catch (e){

    }

  }, [currentProject])
  useEffect(()=>{
    setDefaultValue(systemInfo.name)
  }, [systemInfo])

  useEffect(()=>{


  }, [systemInfo])

  return <>
    <Stack  sx={{mb:2}} spacing={2}>
      <MDInput type="text" label="Name" variant="outlined" name={"name"} value={systemInfo.name} fullWidth required onChange={onChange} />
      <FormControl>
        <InputLabel id="demo-simple-select-label">From</InputLabel>
        <Select type="text" label="From" variant="outlined" name={"from"} value={systemInfo.from} fullWidth required onChange={onChangeHandler}>
          {
            fromZones.map(zone=>{
              return <MenuItem value={zone.id}>{zone.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">To</InputLabel>
        <Select type="text" label="to" variant="outlined" name={"to"} value={systemInfo.to} fullWidth required onChange={onChangeHandler}>
          {
            toZones.map(zone=>{
              return <MenuItem value={zone.id}>{zone.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Stack>
      <MDInput
        sx={{mb:2}}
        multiline rows={3} type="text"
        name={"description"} label="Description"
        variant="outlined" fullWidth
        onChange={onChange}
      />
  </>;
};

const AssessmentInfo = ({systemInfo, onChange}) => {
  const [components, setComp] = useState(systemInfo.components)
  const [render, setRender] = useState(false)
  const [dataController, dispatch] = useDataController()
  let {currentProject} = dataController

  function addNewComponent(){
    systemInfo.components.push('')
    setComp(components)
    setRender(!render)
  }


  return <MDBox mb={2}>
    <FormControl sx={{ m: 0, minWidth: 120 }} fullWidth>
      <InputLabel id="demo-controlled-open-select-label">Zone</InputLabel>
      <Select
        name={'zoneId'}
        value={systemInfo.zoneId}
        label="Zone"
        onChange={onChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {
          currentProject.zones.map(entry=>{
            return <MenuItem value={entry.id}>{entry.name}</MenuItem>
          })
        }
      </Select>
    </FormControl>
    <fieldset  style={{border: '1px solid grey', borderRadius: '5px', padding: 5}}>
      <legend>
        <MDTypography  variant="caption" sx={{fontSize: '16px'}}>Components</MDTypography>
      </legend>
        {
          components.map((component, index)=>{
            return <FormControl fullWidth variant="standard">
              <OutlinedInput
                type="text" label="" variant="outlined" name={"component"+components.length+1} fullWidth required sx={{mb:1}}
                value={component} onChange={(e)=>{
                  components[index] = e.target.value
                  setComp(components)
                  setRender(!render)
                }}
                endAdornment={
                  <InputAdornment position="end">
                    {
                      index > 0 &&
                      <IconButton
                        onClick={(e)=>{
                          setComp(components.filter((_, i)=> i !== index ))
                          console.log(components)
                        }}
                        edge="end"
                      >
                        <DeleteOutlined />
                      </IconButton>
                    }
                  </InputAdornment>
                }
              />
            </FormControl>
          })
        }

      <MDButton fullWidth color={'secondary'} sx={{mt: 2}} onClick={addNewComponent}>
        <Icon>add</Icon>Add One
      </MDButton>

    </fieldset>
  </MDBox>
};

const NewConduit = ({systemId}) => {
  const [render, setRender] = useState(false)
  const [system, setSystem] = useState({components: []})
  const [controller, dispatch] = useMaterialUIController();
  const [dataController, dataDispatch] = useDataController();
  let {currentProject} = dataController
  const [activeStep, setActiveStep] = useState(0);
  const [conduitsInfo, setConduitsInfo] = useState({
    projectId: currentProject.id,
    name: '',
    description: '',
    from: '',
    to: '',

  });

  async function getSystem() {
    let getSystem = await _System.getOne(systemId)
    let detailedSystem = await getSystem.json()
    let t = {
      projectId: currentProject.id,
      name: detailedSystem.name,
      description: '',
      zoneId: detailedSystem.zoneId,
      components: detailedSystem.components.map(component => component.name),

    }
    // setSystem(system)
    setConduitsInfo(t)
    setRender(!render)
  }
  useEffect( () => {
    if (systemId !== undefined) {
      getSystem().then()
    }
  }, [systemId])



  const onChangeHandler = (e)=>{
    let name = e.target.name, value = e.target.value;
    conduitsInfo[name] = value
    setConduitsInfo(conduitsInfo)
    setRender(!render)
  }

  let steps = [
    {label:'Basic Info', component:  <GeneralInfo systemInfo={conduitsInfo} onChange={onChangeHandler} />},
    // {label:'Assessment information', component:  <AssessmentInfo conduitsInfo={conduitsInfo} onChange={onChangeHandler} />},
  ];

  const handleNext = () => {
    if(activeStep == steps.length - 1){
      return
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function handleCreate(){
    _Conduit.create(conduitsInfo).then(createResul=>{
      if(createResul.status == '201'){
        PushNotification(dispatch,  "System has been created successfully", 'success')


        setTimeout(()=>{
          setBackDrop(dispatch, false)
          setRenderer(dispatch, 'ConduitsTable')
        }, 1)
      }else {
        PushNotification(dispatch,  'Could not create the system ', 'error', 3000)
      }
    })
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(activeStep == steps.length-1){
      if(systemId !==undefined){

        _System.update(systemId, conduitsInfo).then(createResul=>{
          if(createResul.status == '200'){
            PushNotification(dispatch,  "System has been updated successfully", 'success')

            setBackDrop(dispatch, false)
          }else {
            PushNotification(dispatch,  'Could not update the system correctly ', 'error', 3000)
          }
        })
      }
      else {
        handleCreate()
      }

    }
    else {
      handleNext()
    }
  }
  return (
      <Box sx={{ width: "60%", backgroundColor: '', p: 0, m: 0,  }}>
        <Card sx={{ p: 2 }}>
          <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="success" mx={2} mt={-4} p={3} mb={1} textAlign="center">
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              {/*<Icon sx={{ fontWeight: "bold" }}>add</Icon>*/}
              New Conduit
            </MDTypography>
            {
              steps.length > 1 &&
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
            }

          </MDBox>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <Box sx={{m:3}}>
              {steps[activeStep]['component']}
              {/*<input type="text" label="Name" variant="outlined" name={"name"} defaultValue={conduitsInfo.name} fullWidth required  />*/}
            </Box>
            <MDBox pt={4} pb={3} px={3}>
                <MDBox mt={4} mb={1}>
                  <Grid container={true} spacing={2}>
                    <Grid item xs={4}>
                      <MDButton variant="gradient" color="error" fullWidth onClick={() => {activeStep == 0?setBackDrop(dispatch, false): handleBack()}}>
                        {activeStep == 0 ? 'Cancel' : 'Back'}
                      </MDButton>
                    </Grid>
                    <Grid item xs={8}>
                      <MDButton variant="gradient" color="info" fullWidth type={'submit'}>
                        {activeStep == steps.length - 1 ? 'Submit' : 'Next'}
                      </MDButton>
                    </Grid>
                  </Grid>
                </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </Box>

  );
};

export default NewConduit;
