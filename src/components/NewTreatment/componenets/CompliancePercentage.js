import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import * as PropTypes from "prop-types";
import MultipleSelection from "../../MultipleSelection/MultipleSelection";
import { useEffect, useState } from "react";
import { getStandardLs } from "../../../assets/StorageItems";
import LoadingProvider from "../../LodingProvider/LoadingProvider";
import UI_STATUS from "../../LodingProvider/UiStatus";


const CompliancePercentage = ({CurrentTreatmentStorage, onChangeHandler, assessmentInfo}) => {
  const [counterMeasureType, setCounterMeasureType] = useState([]);
  const [render, setRender] = useState(false);
  const [state, setState] = useState(UI_STATUS.LOADING);


  useEffect(()=>{
    if(assessmentInfo !== null && assessmentInfo !== undefined){
      setState(UI_STATUS.READY)
    }
  }, [assessmentInfo])
  useEffect(()=>{
    if(CurrentTreatmentStorage !== null){
      setCounterMeasureType(CurrentTreatmentStorage.countermeasureTypes)
    }
  }, [])

  const handleChange = (event) => {

    const { target: { name, value}, } = event;
    switch (name){
      case 'countermeasureTypes':
        setCounterMeasureType(typeof value === 'string' ? value.split(',') : value,);
        break

    }
    onChangeHandler(event)
    // setRender(!render)
  };

  const CounterMeasures = getStandardLs()[1]['CountermeasureTypes'];

  const ImplementationStatus = getStandardLs()[1]['ImplementationStatus']
  return(
    <LoadingProvider status={state} Loading={ <CircularProgress />}>
      {
        assessmentInfo !== null &&
        <Stack spacing={2}>
          <TextField type="text" label="Counter Measure" name="countermeasure" variant="outlined"
                     placeholder={'AAA 802.1x'}
                     value={assessmentInfo.countermeasure}
                     defaultValue={assessmentInfo.countermeasure}
                     onChange={onChangeHandler}
                     required  fullWidth />

          <MultipleSelection value={counterMeasureType} label={'Counter Measure type'} name={'countermeasureTypes'} list={CounterMeasures} handleChange={handleChange}></MultipleSelection>


          <FormControl fullWidth>
            <InputLabel id="id">Implementation Status</InputLabel>
            <Select
              name={'implementationStatusId'}
              labelId="id"
              id="demo-simple-select"
              value={assessmentInfo.implementationStatusId}
              label="Implementation Status"
              onChange={(e)=>{
                onChangeHandler(e)
              }}
            >
              {
                ImplementationStatus.map((entry, index)=> <MenuItem value={entry.id} key={index}>{entry.name + ' Implemented'}</MenuItem>)
              }


            </Select>
          </FormControl>
          <TextField type="text" label="Comment" name="countermeasureComment" variant="outlined"
                     placeholder={'AAA 802.1x'}
                     defaultValue={assessmentInfo.countermeasureComment}
                     onChange={onChangeHandler}
                     multiline  rows={3} required  fullWidth />


        </Stack>
      }
    </LoadingProvider>

  )
}

CompliancePercentage.propTypes = { threat: PropTypes.shape({}).isRequired,  };
export default CompliancePercentage
