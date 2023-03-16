import { Box, CircularProgress } from "@mui/material";
import { useEffect, useImperativeHandle, useState } from "react";
import { useDataController } from "../../../../../../context/data/dataContext";
import { PushNotification, setBackDrop, useMaterialUIController } from "../../../../../../context/theme/themeContext";
import NewAssessment from "../../../../../../components/NewAssessment/NewAssesment";
import MDButton from "../../../../../../components/MDButton";
import _ThreatEntry from "../../../../../../_Models/_ThreatEntry";
import { FETCH_STATUS } from "../../../../../../assets/HttpResponses";
import LoadingProvider from "../../../../../../components/LodingProvider/LoadingProvider";
import UI_STATUS from "../../../../../../components/LodingProvider/UiStatus";


const ThreatStates = {
  NEW:0,
  CHANGED_LOCALLY : 1,
  DEPLOYED: 2,
  DEPLOYED_AND_UPDATED: 3
}
const ThreatRowActions = ({threat, nextThreat}) => {
  const [render, setRender] = useState(false)
  const [state, setState] = useState(UI_STATUS.LOADING)
  const [assessmentStat, setAssessmentStat] = useState(0)
  const [controller, dispatch] = useMaterialUIController()
  const [dataController, dataDispatch] = useDataController()
  let {currentGlobalSystem} = dataController
  const storageAssessmentKey = threat.id + currentGlobalSystem.id
  let threatEntryLS = JSON.parse(localStorage.getItem(storageAssessmentKey))
  const [threatEntry, setThreatEntry] = useState(null);
  const [action, setAction] = useState({label: 'Start Assessment', color: 'info'});





  useEffect(()=>{
    if(threatEntry == null &&  threatEntryLS !== null){

      setAction({label: 'Continue Assessment', color: 'info'})
      setAssessmentStat(ThreatStates.CHANGED_LOCALLY)
    }


    if(threatEntry !== null && threatEntry !== null){
      setAssessmentStat(ThreatStates.DEPLOYED)
      if(threatEntry.applicability) setAction({label: 'Edit deployed  assessment', color: 'primary'})
      else setAction({label: 'Set Applicable', color: 'success'})
    }

    if(threatEntry !== null && threatEntry !== threatEntryLS && threatEntryLS !== null){
      setAssessmentStat(ThreatStates.DEPLOYED_AND_UPDATED)
      setAction({label: 'Continue Editing', color: 'info'})
    }


  }, [threatEntry, render])

  useEffect(()=>{
    if(currentGlobalSystem.id !== undefined){
      _ThreatEntry.getOne(currentGlobalSystem.id, threat.id)
        .then(r=>{
        if(r.status == FETCH_STATUS.OK){
          r.json()
            .then(r=>{
              setThreatEntry(r)
              setState(UI_STATUS.READY)
            }).catch(r=>{
          })
        }else {
          setState(UI_STATUS.ERROR)
        }
      })
        .catch(e=>{
          console.log(e)
        })
    }

  }, [threat, currentGlobalSystem])

  const openNewAssessment = () => {setBackDrop(dispatch, <Box sx={{ p: '10%' }}><NewAssessment threat={threat}  isDeployed={threatEntry == null ? false: true}></NewAssessment></Box>)}

  const openNextNewAssessment = () => {setBackDrop(dispatch, <Box sx={{ p: '10%' }}><NewAssessment threat={nextThreat} isDeployed={threatEntry == null ? false: true}></NewAssessment></Box>)}
  //
  // useImperativeHandle()

  const handleNotApplicable = ()=>{
    _ThreatEntry.create({
      applicability: false,
      threatId: threat.id,
      systemId: currentGlobalSystem['id']
    }).then(createResul=>{
      if(createResul.status == '201'){
        PushNotification(dispatch,  "Threat marked not applicable", 'success')
        setAssessmentStat(ThreatStates.DEPLOYED)
        setAction({label: 'Set Applicable', color: 'success'})
        localStorage.removeItem(storageAssessmentKey)
      }else {
        PushNotification(dispatch,  'Could not set threat to not applicable successfully ', 'error', 3000)
      }
    })
  }
  // function writeStatus(){
  //   switch (assessmentStat) {
  //     case ThreatStates.NEW:
  //       setActionText('Start Assessment')
  //       break;
  //     case ThreatStates.CHANGED_LOCALLY:
  //       setActionText('Continue Assessment')
  //       break;
  //     case ThreatStates.DEPLOYED:
  //       if(threatEntry.applicability){
  //        setActionText('Edit Assessment')
  //       }else {
  //         setActionText('Applicable')
  //         setActionColor('success')
  //       }
  //       break;
  //     case ThreatStates.DEPLOYED_AND_UPDATED:
  //       setActionText('Continue Editing')
  //
  //   }
  // }


  return(
    <LoadingProvider status={UI_STATUS.READY} Loading={<CircularProgress />}>
      <MDButton variant="gradient" color={action.color} size={"small"} sx={{ mr: 1, minWidth: 200}} onClick={openNewAssessment}>{action.label}</MDButton>
      {
        assessmentStat == ThreatStates.NEW &&
        <MDButton variant="gradient" color={"error"} size={"small"} sx={{ mr: 1, minWidth: 200}} onClick={handleNotApplicable}>Not Applicable</MDButton>
      }
    </LoadingProvider>
  )




}
export default  ThreatRowActions
