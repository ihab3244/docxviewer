import MDBox from "../MDBox";
import Grid from "@mui/material/Grid";
import DefaultProjectCard from "../../examples/Cards/ProjectCards/DefaultProjectCard";
import homeDecor1 from "../../assets/images/home-decor-1.jpg";
import team1 from "../../assets/images/team-1.jpg";
import team2 from "../../assets/images/team-2.jpg";
import team3 from "../../assets/images/team-3.jpg";
import team4 from "../../assets/images/team-4.jpg";
import useFetch from "../../Apis/useFetch";
import { _SystemData } from "../../_Models/_SystemData";
import { FETCH_STATUS } from "../../assets/HttpResponses";
import _Project from "../../_Models/_Project";
import LoadingProvider from "../LodingProvider/LoadingProvider";
import MDButton from "../MDButton";
import { Box, Card, Icon } from "@mui/material";
import { setBackDrop, useMaterialUIController } from "../../context/theme/themeContext";
import NewProject from "../../layouts/RAT/components/NewProject/NewProject";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
const ProjectsCards = () => {
  const [controller, dispatch] = useMaterialUIController();

  const {data: projects, status} = useFetch({loader: _Project.getAll, params: [0, 20], successCode: FETCH_STATUS.OK, errorMsg: 'Could not load the system data correctly'})

  return (
    <LoadingProvider status={status}>
      <MDBox>
        <Grid container spacing={2}>
          {
            projects?.map(project=>{
              project.authors = [
                  { image: team1, name: "Elena Morison" },
              { image: team2, name: "Ryan Milly" },
              { image: team3, name: "Nick Daniel" },
              { image: team4, name: "Peterson" },
            ]
              project.action = {
                type: "event",
                route: "/pages/profile/profile-overview",
                color: "info",
                label: "view project",
              }
              project.label = 'label'
              project.description = ''
              return(
                <Grid item xs={3}>
                  <DefaultProjectCard project={project}/>
                </Grid>
              )
            })
          }
          <Grid item xs={3}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "transparent",
                boxShadow: "none",
                overflow: "visible",
                p:1
              }}
            >
              <MDBox sx={{cursor: 'pointer', display: 'flex', alignItems: 'center',  justifyContent: 'center',  width: '100  %', height: '250px', fontSize: '48px', backgroundColor: 'lightgrey', borderRadius: '20px'}} color={"light"} onClick={()=>{setBackDrop(dispatch,   <Box sx={{ pl: '30vw', mt: '20vh' }}><NewProject></NewProject></Box>)}}>

                <AddToPhotosIcon sx={{fontSize: '48px'}}></AddToPhotosIcon>
                New
              </MDBox>
            </Card>


          </Grid>
        </Grid>
      </MDBox>
    </LoadingProvider>

  )
};

export default ProjectsCards
