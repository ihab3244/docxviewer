import {
  Box,
  Chip,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Chart } from "react-google-charts";
import MDTypography from "../../../../components/MDTypography";
import MDBox from "../../../../components/MDBox";
import LatestAssessments from "../../../../components/LatestAssessments/LatestAssessments";
import ProfileInfoCard from "../../../../examples/Cards/InfoCards/ProfileInfoCard";
import NoEnoughData from "../../../../components/NoEnoughData/NoEnoughData";
import { useEffect, useState } from "react";
import { getThreatTypeLS } from "../../../../assets/StorageItems";
const CharTitle = ({title, subtitle})=>{

  return(
    <MDBox display="flex" justifyContent="space-between"  pt={1} px={2} flexDirection={'column'}>
      <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">{title}</MDTypography>
      <MDTypography  textTransform="capitalize" color={"text"} sx={{fontSize: '14px'}}>{subtitle}</MDTypography>
    </MDBox>
  )
}

const SystemGeneralInfo = ({system}) => {
  const [cifDistribution, setCifDistribution] = useState([ ['', "Safety", "Availability", "Business", "Confidentiality"], [" ", 22, 20, 13, 15]])
  const [actorsDistribution, setActorsDistribution] = useState([ ])
  const [internThreatTypesStats, setThreatTypesStats] = useState({old: [], new: []})

  useEffect(()=>{
    console.log('////////////////////////////////')

    // texts.forEach(entry=>{
    //   console.log(entry)
    // })
    //
    // $("text").each(function () {
    //   if ($(this).text() == "Previous data") {
    //     $(this).text('Popularity');
    //   }
    // });
  }, [system])

  useEffect(()=>{
    try{
      let threatTypesStats = system['threatTypesStats']
      if(threatTypesStats !== undefined){

        let data1 = [["threatType", "done"]]
        let defaultThreatTypes = getThreatTypeLS()
        defaultThreatTypes?.forEach(entry=>{
          data1.push([entry.name, entry._count.threats])
        })

        let data2 = [["threatType", "done"]]
        threatTypesStats.forEach(entry=>{
          data2.push([entry.name, entry.total])
        })

        setThreatTypesStats({old: data1, new: data2})
        setTimeout(()=>{
          let collection = document.getElementsByTagName('text')
          for (let i = 0; i < collection.length; i++) {
            if(collection[i].textContent == 'Previous data') {
              collection[i].textContent = 'Expected'
              break
            }
            if(collection[i].textContent == 'Previous') {collection[i].textContent = 'Expected'}
            if(collection[i].textContent == 'data') {collection[i].textContent = ''}

            console.log(collection[i]);
          }
        }, 300)

      }
    }
    catch (e){
      alert('error')

    }
  }, [system])




  return(
    <Box sx={{p: 1, with:'100%', mt: 4, mb: 3}}>
      <Grid  container={true} spacing={2}>
        <Grid item xs={4}>
            <ProfileInfoCard
              systemId={system.id}
              title="Primary Information"
              description={system.description}
              info={{
                Workspace: 'SIRAM',
                Project: 'train',
                zone: system.zone !== null ? system.zone.name:'not affected yet',
                components: <>{system.components?.map(entry =>{
                  if(entry == null) return ''
                  return <Chip label={entry.name}  size="small" key={entry.id} sx={{mr:2}}/>
                })}</>,
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <Chip label="Brand new" color="info" size="small" />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <Chip label="Require attention" color="error" size="small" />,
                  color: "twitter",
                }
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={true}
            />

        </Grid>
        {/*<Grid item xs={4}>*/}
        {/*  <LatestAssessments />*/}
        {/*</Grid>*/}
        {
          system.ready && <>
            <Grid item xs={8}>
              <Paper sx={{p:1}}>
                <CharTitle title={'Assessment Progress'} subtitle={'grouped by threat types'}></CharTitle>

                <Chart
                  chartType="ColumnChart"
                  width="100%"
                  height="400px"
                  diffdata={internThreatTypesStats}
                  options={{
                    is3D: true,
                    diff: { newData: { widthFactor: 0.5, legend: 'none' } }
                  }}
                />
              </Paper>
            </Grid>
          </>
        }
        {
          !system.ready &&
          <Grid item xs={4} sx={{backgroundColor: 'red'}}>
              <NoEnoughData></NoEnoughData>
          </Grid>
        }


      </Grid>
    </Box>
  )
}
export default SystemGeneralInfo
