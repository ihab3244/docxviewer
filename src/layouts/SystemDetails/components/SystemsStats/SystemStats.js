import { Grid, Paper } from "@mui/material";
import { Chart } from "react-google-charts";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { useEffect, useState } from "react";
import { getThreatTypeLS } from "../../../../assets/StorageItems";
import MDButton from "../../../../components/MDButton";
import docxGenerator, { readLocalImage } from "../../../../Apis/DocxGenerator";
import image from '../../../../assets/images/uploadPlaceHolder.png'
import html2canvas from "html2canvas";
const CharTitle = ({title, subtitle})=>{

  return(
    <MDBox display="flex" justifyContent="space-between"  pt={1} px={2} flexDirection={'column'}>
      <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">{title}</MDTypography>
      <MDTypography textTransform="capitalize" color={"text"} sx={{fontSize: '14px'}}>{subtitle}</MDTypography>
    </MDBox>
  )
}

const SystemStats = ({system}) => {

  const [cifDistribution, setCifDistribution] = useState([ ['', "Safety", "Availability", "Business", "Confidentiality"], [" ", 22, 20, 13, 15]])
  const [actorsDistribution, setActorsDistribution] = useState([ ])
  const [applicabilityDistribution, setApplicabilityDistribution] = useState({old: [], new: []})


  useEffect(()=>{
    let cifD = system['CIFsDistribution']
    let actorsD = system['actorsDistribution']

    if(cifD !== undefined){
      let names = cifD.map(entry=>{
        return entry.name
      })
      let values = cifD.map(entry=>{
        return entry.total
      })
      setCifDistribution([ [' '].concat(names), [' '].concat(values)])
      let actors =   [["Zone", "Systems"]]
      actorsD.forEach(entry=>{
        actors.push([entry.name, entry.total])
      })
      setActorsDistribution(actors)
    }
  }, [system])

  useEffect(()=>{
    let threatTypesStats = system['threatTypesStats']
    let data1 = [["Name", "Applicable"]]
    let data2 = [["Dinosaur", "Applicable"]]
    threatTypesStats.forEach(entry=>{
      data1.push([entry.name, entry['applicable'] + entry['notApplicable']])
      data2.push([entry.name, entry['applicable']])
    })

    setApplicabilityDistribution({old: data1, new: data2})

  }, [system])
  const assessmentData1 = [
    ,
    ["Physical damage", 5],
    ["Loss of essential services", 6],
    ["Compromise of information", 3],
    ["Technical failures", 4],
    ["Unauthorized actions", 6],
    ["Compromise of functions", 4],
    ["Natural events", 4],
    ["Disturbance due to radiation", 2],
  ];
  const assessmentData2 = [
    ["Dinosaur", "Length"],
    ["Physical damage", 3],
    ["Loss of essential services",2],
    ["Compromise of information", 3],
    ["Technical failures", 4],
    ["Unauthorized actions", 3],
    ["Compromise of functions", 4],
    ["Natural events", 1],
    ["Disturbance due to radiation", 2],
  ];

  const options = {
    is3D: true,
  };



  return(

    <Grid  container={true} spacing={2} pt={5}>
      <Grid item xs={4} >
        <Paper sx={{p:1}}  >
          <CharTitle title={'Applicability'} subtitle={'threat applicability by type'}></CharTitle>
          <div id={'applicabilityGraph'}>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              diffdata={applicabilityDistribution}
              options={{
                legend: {old: 'jhkjhkj'}
              }}
            />
          </div>

        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{p:1}}>
          <CharTitle title={'Critical impact factors'} subtitle={'CIFs over all the system threats'}></CharTitle>
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={cifDistribution}
            options={{ chart: {}, }}
          />
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{p:1}}>
          <CharTitle title={'Threat actors'} subtitle={'Actors distribution over all threats'}></CharTitle>
          <Chart
            chartType="PieChart"
            data={actorsDistribution}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </Paper>
      </Grid>

    </Grid>
  )
}

export default SystemStats
