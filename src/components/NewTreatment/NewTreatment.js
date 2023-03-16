import Card from "@mui/material/Card";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import { Box, Chip, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, NativeSelect, OutlinedInput, Select, Stack, TextField, Typography, useTheme, } from "@mui/material";
import Grid from "@mui/material/Grid";
import { PushNotification, setBackDrop, useMaterialUIController } from "../../context/theme/themeContext";
import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useEffect, useState } from "react";
import { CURRENT_SYSTEM, getCIFs, getEntryPoints, getStandardLs } from "../../assets/StorageItems";
import { useDataController } from "../../context/data/dataContext";
import CompliancePercentage from "./componenets/CompliancePercentage";
import _Zone from "../../_Models/_Zone";

function NewTreatment({zone, sr, treatment}) {
  const [dataController, dataDispatch] = useDataController()
  const [controller, dispatch] = useMaterialUIController();
  let {currentProject} =  dataController
  const STORAGE_KEY = sr.id + currentProject.id + zone.id
  const CurrentTreatmentStorage = JSON.parse(localStorage.getItem(STORAGE_KEY))

  const [activeStep, setActiveStep] = React.useState(0);
  const [render, setRender] = React.useState(false);


  let treatmentInfoDefaults = {
    countermeasure: '',
    countermeasureTypes: [],
    implementationStatusId: 0,
    countermeasureComment: '',

    efficiencyId: 0,
    efficiencyComment: '',
    penTestResult: 0,

    workSpaceId: localStorage.getItem('workSpaceId'),
    systemRequirementId: sr.id,
  }

  const [treatmentInfo, setTreatmentInfo] = useState(treatmentInfoDefaults);

  useEffect(()=>{

    if (CurrentTreatmentStorage == null) {
      if(treatment !== undefined){
        treatment['countermeasureTypes'] = treatment['countermeasureTypes'].map(entry=>entry['countermeasureTypeId'])
        localStorage.setItem(STORAGE_KEY, JSON.stringify(treatment))
        setTreatmentInfo(treatment)
      }else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(treatmentInfoDefaults))
      }
    }else {
      setTreatmentInfo(CurrentTreatmentStorage)
    }

  }, [sr, zone, treatment])



  const onChangeHandler = (event)=>{
    const { target: { name, value}, } = event;
    treatmentInfo[name] = value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(treatmentInfo))
    setTreatmentInfo(treatmentInfo)
    setRender(!render)
  }

  const SecurityEfficiency = ({}) => {
    const [counterMeasure, setCounterMeasure] = React.useState([]);

    useEffect(()=>{
      if(CurrentTreatmentStorage !== null){
        setCounterMeasure(CurrentTreatmentStorage.counterMeasure)
      }
    })

    const handleChange = (event) => {

      const { target: { name, value}, } = event;
      switch (name){
        case 'counterMeasure':
          setCounterMeasure(typeof value === 'string' ? value.split(',') : value,);
          break

      }
      onChangeHandler(event)
    };


    const ImplementationStatus = getStandardLs()[1]['Efficiency']
    return(
      <Stack spacing={2}>
        <FormControl>
          <InputLabel id="id">Efficiency Confidence</InputLabel>
          <Select
            name={'efficiencyId'}
            labelId="id"
            id="demo-simple-select"
            defaultValue={treatmentInfo.efficiencyId}
            label="Efficiency Confidence"
            onChange={(e)=>{
              onChangeHandler(e)
              setRender(!render)
            }}
          >
            {
              ImplementationStatus.map((entry, index)=> <MenuItem value={entry.id} key={index}>{entry.name}</MenuItem>)
            }


          </Select>
        </FormControl>
        <TextField type="text" label="Comment" name="efficiencyComment" variant="outlined"
                   defaultValue={treatmentInfo.efficiencyComment}
                   onChange={onChangeHandler}
                   multiline  rows={3} required  fullWidth />
        <TextField type="text" label="Penetration test result" name="penTestResult" variant="outlined"
                   placeholder={'The pen test success percentage'}
                   defaultValue={treatmentInfo.penTestResult}
                   onChange={onChangeHandler}
                   type={'number'}
                   required  fullWidth />
      </Stack>
    )
  }

  const steps = [
    {label:'Compliance Percentage', component:  <CompliancePercentage threat={sr} assessmentInfo={treatmentInfo} CurrentTreatmentStorage={CurrentTreatmentStorage} onChangeHandler={onChangeHandler}/>},
    {label:'Security Efficiency', component:  <SecurityEfficiency threat={sr} />},
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(activeStep < steps.length - 1) handleNext()
    else {
      _Zone.createTreatment(zone.id, treatmentInfo).then(createResul=>{
        if(createResul.status == '201'){
          PushNotification(dispatch,  "Treatment has been created successfully", 'success')
          setBackDrop(dispatch, false)
        }else {
          PushNotification(dispatch,  'Could not create the Treatment ', 'error', 3000)
        }
      })


    }

  }


  const handleNotApplicable = ()=>{
    setBackDrop(dispatch, false)
    // _ThreatEntry.create({
    //   applicability: false,
    //   threatId: sr.id,
    //   systemId: dataController['currentGlobalSystem']['id']
    // }).then(createResul=>{
    //   if(createResul.status == '201'){
    //     PushNotification(dispatch,  "Threat set not applicable", 'success')
    //     setBackDrop(dispatch, false)
    //   }else {
    //     PushNotification(dispatch,  'Could not set threat to not applicable successfully ', 'error', 3000)
    //   }
    // })
  }
  return (
        <Card sx={{ width: "60%", backgroundColor: '', p: 2, ml: '20%', minHeight: '400px' }}>
          <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="success" mx={2} mt={-3} p={3} mb={1}
                 textAlign="center">
            {/*<MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>*/}
            {/*  /!*<Icon sx={{ fontWeight: "bold" }}>add</Icon>*!/*/}
            {/*  New System*/}
            {/*</MDTypography>*/}
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
          <MDBox>
            <MDBox sx={{m:3, minHeight: '90%'}}>
              {
                steps.map((step, index)=>{
                  return(
                    <MDBox component="form" role="form"  onSubmit={handleSubmit} key={'step'+index}>
                      <Box sx={{display: index == activeStep ?'block' : 'none'}}>
                        {
                          step['component']
                        }
                        <MDBox pt={4} pb={3}>
                          <Grid container={true}  spacing={2}>
                            <Grid item xs={4}>
                              <MDButton

                                variant="gradient" color="error" fullWidth onClick={() => {
                                activeStep == 0 ? handleNotApplicable() : handleBack()

                              }}>
                                {activeStep == 0 ? 'Close' : 'Back'}
                              </MDButton>
                            </Grid>
                            <Grid item xs={8}>
                              <MDButton
                                variant="gradient" color="info" fullWidth type={'submit'}>
                                {activeStep == steps.length - 1 ? 'Submit' : 'Next'}
                              </MDButton>
                            </Grid>
                          </Grid>
                        </MDBox>
                      </Box>

                    </MDBox>
                  )
                })
              }
            </MDBox>
          </MDBox>
          {/*{*/}
          {/*  activeStep == steps.length - 1  &&*/}
          {/*  <MDBox pt={4} pb={3} mx={3}>*/}
          {/*    <Grid container={true} xs={12} spacing={2}>*/}
          {/*      <Grid item xs={4}>*/}
          {/*        <MDButton*/}

          {/*          variant="gradient" color="error" fullWidth onClick={() => {*/}
          {/*          activeStep == 0?setBackDrop(dispatch, false): handleBack()*/}

          {/*        }}>*/}
          {/*          {activeStep == 0 ? 'Not Applicable' : 'Back'}*/}
          {/*        </MDButton>*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={8}>*/}
          {/*        <MDButton*/}
          {/*          variant="gradient" color="info" fullWidth type={'submit'}>*/}
          {/*         Submit*/}
          {/*        </MDButton>*/}
          {/*      </Grid>*/}
          {/*    </Grid>*/}
          {/*  </MDBox >*/}
          {/*}*/}


        </Card>
  );
}

export default NewTreatment;
