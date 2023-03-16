import { getFRS } from "../../assets/StorageItems";
import FoundationalRequirementsRow
  from "../../layouts/SystemDetails/components/FoundationalRequirementsTable/FoundationalRequirementsRow";
import { CircularProgress, Fab, Grid, Icon, Paper, Stack, Table, TableBody, TableHead, TableRow } from "@mui/material";
import LoadingProvider from "../LodingProvider/LoadingProvider";
import UI_STATUS from "../LodingProvider/UiStatus";
import MDTypography from "../MDTypography";
import { useEffect, useMemo, useState } from "react";
import _Zone from "../../_Models/_Zone";
import MDBox from "../MDBox";
import MDButton from "../MDButton";
import {
  PushNotification,
  removeApplication,
  setBackDrop,
  useMaterialUIController,
} from "../../context/theme/themeContext";
import DataTableHeadCell from "../../examples/Tables/DataTable/DataTableHeadCell";

const Error = ({msg, id})=>{
  const [controller, dispatch] = useMaterialUIController();
  return  <MDBox sx={{px:4, height: '100%', width: '100%', backgroundColor: '#FFFFFF'}} display={'flex'} alignItems={'center'}>
    <Stack  spacing={2}>
    <MDBox sx={{ backgroundColor: '#FFFFFF'}} display={'flex'} alignItems={'center'}>
      <MDBox sx={{px:4, width: '100%', backgroundColor: '#FFFFFF'}} display={'flex'} alignItems={'center'}>
        <Icon>error</Icon>
        <MDTypography>{msg}</MDTypography>
      </MDBox>
    </MDBox>
      <Grid container={true} spacing={2}>
        <Grid item xs={3}>
          <MDButton color={"error"} fullWidth onClick={()=>{removeApplication(dispatch, id)}}>
            <Icon>close</Icon>
            Close
          </MDButton>
        </Grid>
        <Grid item xs={2}>
          <MDButton color={"info"} fullWidth sx={{display:'flex'}}>
            <Icon>refresh</Icon>
            Retry
          </MDButton>
        </Grid>
      </Grid>
   </Stack>
  </MDBox>
}

const Loading = ({stepLabel})=>{

  return<Paper sx={{p:4, height: '100%', width: '100%'}}>
    <CircularProgress></CircularProgress>
    <MDTypography>{stepLabel}</MDTypography>
  </Paper>
}

const FoundationalRequirementsTable = ({zone, id}) => {
  const [controller, dispatch] = useMaterialUIController();
  const [status, setStatus] = useState(UI_STATUS.LOADING)
  const [zoneDetails, setZoneDetails] = useState(null)
  const [threatBy, setThreatBy] = useState(UI_STATUS.READY)
  const [stepLabel, setStepLabel] = useState('Preparing treatment necessary information, please be patient ')
  const [acceptedFrs, setAcceptedFrs] = useState([])
  let requiredThreatEntriesNumber = 42

  const FRs = getFRS()


  let zoneFrs = FRs.map(entry=>{
    return {name: entry.name, max:9}
  })

  function getRisk(exposure, vulnerability, impact){
    let  likelihood = getLikelihood(exposure, vulnerability)
    if(likelihood == 1 || impact == 1) return 1
    switch (impact){
      case 2:
        if(likelihood < 4){
          return 1
        }
        return 2
      break;
      case 3:
        if(likelihood < 3) return 1
        if(likelihood == 5) return 3
        return 2
        break;
      case 4:
        if(likelihood == 1) return 1
        if(likelihood == 2 || likelihood == 3) return 2
        return likelihood - 1
        break;
      case 5:
        if(likelihood < 4) return likelihood
        return 4
        break;
    }

    return


  }


  function getLikelihood(exposure, vulnerability) {
    return exposure + vulnerability - 1
  }

  function isTreatable(systems){
    for (let system of systems){
      return true
      // if( system['threatEntries'].length < requiredThreatEntriesNumber){
      //  setStatus(UI_STATUS.ERROR)
      //   break
      // }
    }
  }

  function getMaxByFR(system){
    let FRs = getFRS()

    for (let fr of FRs){
      fr['max'] = 0
    }

    for(let threatEntry of system['threatEntries']){
      if(threatEntry['applicability']){
        let risk = getRisk(threatEntry['exposure'], threatEntry['vulnerability'])
        // console.log('risk' + risk)
        let threatEntryFr = threatEntry['threat']['fr']
        let index = FRs.findIndex(entry=>entry.id == threatEntryFr['id'])
        // console.log('index ' + index)
        if(risk > FRs[index]['max']) FRs[index]['max'] = risk
        // console.log(FRs[index])
      }
    }

    let result = FRs.map(entry=>{
      return {name: entry.name, max: entry.max}
    })

    return result
  }

  function getZoneFrs(systems){
    for (let system of systems){
      let systemFrs = getMaxByFR(system)
      for(let i =0; i<systemFrs.length;i++){
        if(systemFrs[i].max > zoneFrs[i].max){
          zoneFrs[i].max = systemFrs[i].max
        }
      }
    }
    return zoneFrs
  }

  function generateAcceptedFrs(FRs, targetFrs){
    for (let i = 0; i < FRs.length; i++) {
      FRs[i]['systemRequirement'] = FRs[i]['systemRequirement'].filter(slc=> {
        if(slc['SLC'] <= targetFrs[i]['max']) return true
        return false
      })
    }
    let filtered = FRs.filter(entry=>entry['systemRequirement'].length > 0)
    filtered.sort(function( a , b){
      a = a.name.toString().substr(0, 3)
      b = b.name.toString().substr(0, 3)
      if(a > b) return 1;
      if(a < b) return -1;
      return 0;
    })
    setStatus(UI_STATUS.READY)
    setAcceptedFrs(filtered)
  }


  useEffect(()=>{
    _Zone.getOne(zone.id)
      .then(getZone=>{
        getZone.json()
          .then(zone=>{
            setStepLabel('Data loaded correctly, doing the math now')
            setZoneDetails(zone)
          })
      })
  }, [zone])

  useEffect(()=>{
    if(zoneDetails !== null){
      if(isTreatable(zoneDetails.systems)){
        let zonesFrs = getZoneFrs(zoneDetails.systems)
        generateAcceptedFrs(FRs, zonesFrs)
      }else {
        PushNotification(dispatch, 'Please finish the assessment step first', 'error', 3000 , 'Not ready for treatment yet')
        removeApplication(dispatch, id)
        setStatus(UI_STATUS.ERROR)
      }
    }

  }, [zoneDetails])


  return<LoadingProvider
    status={status}
    error={<Error msg={'This zone is not ready for treatment yet, please finish the assessment process for all the SuCs of this zone'} id={id}></Error>}
    Loading={<Loading stepLabel={stepLabel}></Loading>}>
    <Paper sx={{p:4, height: '100%', width: '100%'}}>
      <Table>
        <TableHead>
          <TableRow>
            <DataTableHeadCell>Name</DataTableHeadCell>
            <DataTableHeadCell>Treatment Progress</DataTableHeadCell>
            <DataTableHeadCell align={"right"}>Details</DataTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            acceptedFrs?.map((fr, index)=>{
              return (<FoundationalRequirementsRow key={index} isOpen={false} FR={fr} zone={zone}/>)
            })
          }
        </TableBody>
      </Table>
    </Paper>
  </LoadingProvider>
}

export default FoundationalRequirementsTable
