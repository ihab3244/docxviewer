import Card from "@mui/material/Card";
import { Box, Collapse, Stack, Typography } from "@mui/material";
import { useEffect, useState, useCallback, useReducer } from "react";
import SectionOne from "../components/SectionOne";
import SectionTwo from "../components/SectionTwo";
import SectionThree from "../components/SectionThree";
import SectionFour from "../components/SectionFour";
import SectionList from "../components/SectionList";
import SideNav from "../components/sideNav";
import _Threat from "_Models/_Threat";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";
import _System from "../../../_Models/_System";
import { useParams } from "react-router-dom";
import { useDataController } from "../../../context/data/dataContext";


const threadList = [
  {
    id: 1,
    name: "Fire",
    type: "Physical damage",
    origines: "A, D, E"
  },
  {
    id: 2,
    name: "Polution",
    type: "Material damage",
    origines: "B, C, F"
  },
  {
    id: 3,
    name: "Electrical shock",
    type: "Human danger",
    origines: "A, B, C"
  }
]
const newAssessment = {
  id: 0,
  name: "fetching",
  type: "fetching",
  origines: "fetching",
  affected: false,
  description: "",
  criticalImpact: [],
  ttp1: "",
  ttp2: "",
  threadActors: [],
  affectedComponents: [],
  entryPoints: [],
  threatComment: "",
  checked: false
}

function NewAssessment({ ProjectName = "Test", systemName = "Breaking System", threat }) {
  const { systemId } = useParams()
  const [dataController, dataDispatch] = useDataController()
  const {currentProject} = dataController
  const [threads, setThreads] = useState("");
  const [system, setSystem] = useState({});
  const [threatNumber, setThreatNumber] = useState(0);
  const [section, setSection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [assessment, setAssessment] = useState(() => {
    //get data from the local storage
    const saved = localStorage.getItem(threatNumber.toString());
    const initialValue = JSON.parse(saved);
    return initialValue || newAssessment
  });
  const [state, dispatch] = useReducer(reducer, 0);



  // useEffect(async () => {
  //
  //   try {
  //     let getThread = await _Threat.getAll(0, 10)
  //     if (getThread.status == '200') {
  //
  //       alert('good fetch')
  //       let threats = await getThread.json()
  //       // // setThreads(threats)
  //       // setThreads(threats)
  //       alert('hh')
  //     } else {
  //       alert('hi')
  //       console.log('failed downloading threads list')
  //     }
  //   } catch (e) {
  //     console.log(e)
  //     alert('error')
  //   }
  // }, [])


  async function loadSystem() {
    try {
      let getThread = await _System.getOne(systemId)
      console.clear()
      console.log(getThread)
      if (getThread.status == '200') {
        let system = await getThread.json()
        // // setThreads(threats)
        // setThreads(threats)
        console.log(system)
      } else {
      }
    } catch (e) {
      console.log(e)

    }
  }
  useEffect(() => {
    loadSystem().then()
  }, [systemName])




  const handleChange = (e) => {
    localStorage.setItem(assessment.id, JSON.stringify(assessment));
    setAssessment(prevAssessment => {
      return { ...prevAssessment, [e.target.name]: e.target.value }
    })
  }

  //set a thread
  const handleSetThread = (e) => {

    const searchParam = e ? e.target.parentElement.id : (assessment.id + 1).toString()
    const myAssess = threadList.find(thread => (thread.id).toString() === searchParam)
    const saved = localStorage.getItem(myAssess.id);
    const initialValue = JSON.parse(saved);

    initialValue ? (setAssessment(initialValue)
    ) : (
      setAssessment(() => { return { ...newAssessment, ...myAssess } })
    )
    setThreatNumber(myAssess.id)
    setSection(1)

  }

  //save thread
  const handleSaveThread = async () => {

    setThreads(threads =>
      threads.map(thread => {
        if (thread.id === assessment.id) {
          return assessment.affected ? ({ ...threads, ...assessment, checked: true }
          ) : (
            { ...threads, ...assessment, affected: false, checked: true });
        }
        return thread;

      }))
    // post the new data

    // let postThread = await _Threat.post(assessment)
    // if (postThread.status == '201') {



    //remove the item from local storage
    localStorage.removeItem(assessment.id.toString())
    // readNext thread
    const myAssess = threadList.find(thread => thread.id === assessment.id + 1)
    if (myAssess) {
      setThreatNumber(threatNumber + 1)
      handleSetThread()
    }

    // } else {
    //   console.log('failed posting thread')
    // }
  }
  // dispatch progression
  function reducer(state, action) {
    let newState;
    const fields = Object.values(assessment)
    switch (action.type) {
      case 'progress':
        {
          let sum = 0
          if (assessment) {
            fields.forEach((field) => {
              if (field.length !== 0) {
                sum++
              }
            })
          }
          newState = (sum ? ((sum - 6) / 8 * 100).toFixed(0) : 0)
        }
        ;
        break;
      default:
        throw new Error();
    }
    return newState;
  }
  const setPregress = () => dispatch({ type: "progress" });

  return (
    // <CoverLayout image={bgImage}>
    //   <SideNav systemName={systemName} threats={threads} handleSetThread={handleSetThread} threadNumb={threadNumb} />
    <Box item mx="auto" width={section === 1 || section === 5 ? "50%" : "100%"}
      sx={{
        height: "300px",
        transition: 'all 0.5s'
      }}
    >
      <Card>
        {/* header */}
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-6}
          p={2}
          mb={1}
          textAlign="center"

        >
          <Stack spacing={2}>
            <MDTypography color="white" mt={'h4'} sx={{ textAlign: 'left'}}>Project: {currentProject.name}</MDTypography>

            <MDTypography variant="h5" color="white" mt={1} sx={{ textAlign: 'left'}}>System : {systemName}</MDTypography>
            <MDTypography display="block" variant="h6" color="white" my={1} fontWeight='bold'>
              Threat: {threat.name}
            </MDTypography>
          </Stack>


          <MDBox width='100%'>
            <MDBox display="flex" alignItems="center" justifyContent='center' width='100%'>
              <MDTypography variant="caption" color="light" fontWeight="bold">
                {state}%
              </MDTypography>
              <MDBox ml={0.5} width="50%" >
                <MDProgress variant="gradient" color='dark' value={state} />
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox display='flex'  >
          {/* sections */}
          <MDBox flexGrow={1} display={section > 4 ? "none" : "block"} >

            {section === 1 && <SectionOne assessment={assessment} setAssessment={setAssessment}
              setSection={setSection} handleChange={handleChange} newAssessment={newAssessment}
              handleSaveThread={handleSaveThread} thread={threads[threatNumber - 1]}
              setPregress={setPregress} />}

            {section === 2 && <SectionTwo assessment={assessment} setAssessment={setAssessment}
              setSection={setSection} handleChange={handleChange}
              setPregress={setPregress} />}

            {section === 3 && <SectionThree assessment={assessment} setAssessment={setAssessment}
              setSection={setSection} handleChange={handleChange}
              setPregress={setPregress} />}

            {section === 4 && <SectionFour assessment={assessment} setAssessment={setAssessment}
              setSection={setSection} handleChange={handleChange}
              setPregress={setPregress} />}
          </MDBox>
          {/* list */}
          <Box component='div' width={section === 1 ? 0 : "50%"}
            flexGrow={section === 5 ? 1 : 0}
            sx={{ borderLeft: '1px solid grey', minHeight: '56vh' }}>
            <MDBox  >
              <SectionList assessment={assessment} section={section} setSection={setSection}
                handleSaveThread={handleSaveThread} />
            </MDBox>
          </Box>



        </MDBox>

      </Card>
    </Box >
    // </CoverLayout>
  );
}

export default NewAssessment;
