import Card from "@mui/material/Card";
import { Box, Collapse, Typography } from "@mui/material";
import { useEffect, useState, useCallback, useReducer } from "react";
import SectionOne from "../components/SectionOne";
import SectionTwo from "../components/SectionTwo";
import SectionThree from "../components/SectionThree";
import SectionFour from "../components/SectionFour";
import SectionList from "../components/SectionList";
import SideNav from "../components/sideNav";
import _Threat from "_Models/_Threat";
// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import MDProgress from "components/MDProgress";
import _System from "../../../_Models/_System";
import { useParams } from "react-router-dom";

//threats template

const threadList = [
  {
    id: 1,
    name: "Fire",
    type: "Physical damage",
    origines: "A, D, E",
  },
  {
    id: 2,
    name: "Polution",
    type: "Material damage",
    origines: "B, C, F",
  },
  {
    id: 3,
    name: "Electrical shock",
    type: "Human danger",
    origines: "A, B, C",
  },
];
// Treatment template
const newTreatment = {
  id: 0,
  SystemRequirement: "",
  SLC: "",
  Title: "",
  RequirementDescription: "",
  ApplicableSLCperSLT: "",
};

function NewTreatment({ ProjectName = "train", systemName = "Breaking System", threatName }) {
  const { systemId } = useParams();
  const [threads, setThreads] = useState("");
  const [system, setSystem] = useState({});
  const [threadNumb, setThreadNumb] = useState(0);
  const [section, setSection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [Treatment, setTreatment] = useState(() => {
    //get data from the local storage
    const Treat = localStorage.getItem(threadNumb);
    const initialValue = JSON.parse(Treat);
    return initialValue || newTreatment;
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
      let getThread = await _System.getOne(systemId);
      console.clear();
      if (getThread.status == "200") {
        let system = await getThread.json();
        // // setThreads(threats)
        // setThreads(threats)
        console.log(system);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    loadSystem().then();
  }, [systemName]);

  const handleChange = (e) => {
    localStorage.setItem(Treatment.id, JSON.stringify(Treatment));
    setTreatment((prevTreatment) => {
      return { ...prevTreatment, [e.target.name]: e.target.value };
    });
  };

  //set a thread
  const handleSetThread = (e) => {
    const searchParam = e ? e.target.parentElement.id : (Treatment.id + 1).toString();
    const myTreat = threadList.find((thread) => thread.id.toString() === searchParam);
    const Treat = localStorage.getItem(myTreat.id);
    const initialValue = JSON.parse(Treat);

    initialValue
      ? setTreatment(initialValue)
      : setTreatment(() => {
          return { ...newTreatment, ...myTreat };
        });
    setThreadNumb(myTreat.id);
    setSection(1);
  };

  //save thread
  const handleSaveThread = async () => {
    setThreads((threads) =>
      threads.map((thread) => {
        if (thread.id === Treatment.id) {
          return Treatment.affected
            ? { ...threads, ...Treatment, checked: true }
            : { ...threads, ...Treatment, affected: false, checked: true };
        }
        return thread;
      })
    );
    // post the new data

    // let postThread = await _Threat.post(Treatment)
    // if (postThread.status == '201') {

    //remove the item from local storage
    localStorage.removeItem(Treatment.id.toString());
    // readNext thread
    const myTreat = threadList.find((thread) => thread.id === Treatment.id + 1);
    if (myTreat) {
      setThreadNumb(threadNumb + 1);
      handleSetThread();
    }

    // } else {
    //   console.log('failed posting thread')
    // }
  };
  // dispatch progression
  function reducer(state, action) {
    let newState;
    const fields = Object.values(Treatment);
    switch (action.type) {
      case "progress":
        {
          let sum = 0;
          if (Treatment) {
            fields.forEach((field) => {
              if (field.length !== 0) {
                sum++;
              }
            });
          }
          newState = sum ? (((sum - 6) / 8) * 100).toFixed(0) : 0;
          console.log(sum);
        }
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
    <Box
      item
      mx="auto"
      width={section === 1 || section === 5 ? "50%" : "100%"}
      sx={{
        height: "300px",
        transition: "all 0.5s",
      }}
    >
      <Card>
        {/* header */}
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-6}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" color="white" mt={1}>
            Project: {ProjectName} , System : {systemName}
          </MDTypography>
          <MDTypography display="block" variant="h6" color="white" my={1} fontWeight="bold">
            Threat: {threatName}
          </MDTypography>

          <MDBox width="100%">
            <MDBox display="flex" alignItems="center" justifyContent="center" width="100%">
              <MDTypography variant="caption" color="light" fontWeight="bold">
                {state}%
              </MDTypography>
              {/* Progress Bar */}
              <MDBox ml={0.5} width="50%">
                <MDProgress variant="gradient" color="dark" value={state} />
              </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox display="flex">
          {/* sections */}
          <MDBox flexGrow={1} display={section > 4 ? "none" : "block"}>
            {section === 1 && (
              <SectionOne
                Treatment={Treatment}
                setTreatment={setTreatment}
                setSection={setSection}
                handleChange={handleChange}
                newTreatment={newTreatment}
                handleSaveThread={handleSaveThread}
                thread={threads[threadNumb - 1]}
                setPregress={setPregress}
              />
            )}

            {section === 2 && (
              <SectionTwo
                Treatment={Treatment}
                setTreatment={setTreatment}
                setSection={setSection}
                handleChange={handleChange}
                setPregress={setPregress}
              />
            )}

            {section === 3 && (
              <SectionThree
                Treatment={Treatment}
                setTreatment={setTreatment}
                setSection={setSection}
                handleChange={handleChange}
                setPregress={setPregress}
              />
            )}

            {section === 4 && (
              <SectionFour
                Treatment={Treatment}
                setTreatment={setTreatment}
                setSection={setSection}
                handleChange={handleChange}
                setPregress={setPregress}
              />
            )}
          </MDBox>
          {/* list */}
          <Typography
            component="div"
            width={section === 1 ? 0 : "50%"}
            flexGrow={section === 5 ? 1 : 0}
            sx={{ borderLeft: "1px solid grey", minHeight: "56vh" }}
          >
            <MDBox>
              <SectionList
                Treatment={Treatment}
                section={section}
                setSection={setSection}
                handleSaveThread={handleSaveThread}
              />
            </MDBox>
          </Typography>
        </MDBox>
      </Card>
    </Box>
    // </CoverLayout>
  );
}

export default NewTreatment;
