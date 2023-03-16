import { useState, useEffect, useMemo } from "react";
import './app.css'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
// import ClickAwayListener from '@mui/base/ClickAwayListener';
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
  setBackDrop,
  pushNotification, removeNotification, PushNotification,
} from "context/theme/themeContext";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import SignIn from "./layouts/authentication/sign-in";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import * as React from "react";
import { Alert, AlertTitle, CircularProgress, Fab, Grow, Typography, Zoom } from "@mui/material";
import { setCurrentGlobalProject, useDataController } from "./context/data/dataContext";
import useFetch from "./Apis/useFetch";
import { FETCH_STATUS } from "./assets/HttpResponses";
import { _SystemData } from "./_Models/_SystemData";
import { setActors, setCIFs, setEntryPoints, setFRs, setStandardLS, setThreatTypesLS } from "./assets/StorageItems";
import NewTreatment from "./components/NewTreatment/NewTreatment";
import LoadingProvider from "./components/LodingProvider/LoadingProvider";
import Application, { AppSx } from "./components/Application/Application";
import ApplicationsTry from "./components/ApplicationsTry/ApplicationsTry";
import DefaultNavbar from "./examples/Navbars/DefaultNavbar/DefaultNavbar";
import ProfileDrawer from "./components/ProfileDrawe/ProfileDrawe";
import MDAlert from "./components/MDAlert";
import MDSnackbar from "./components/MDSnackbar";


export default function App() {
  setTimeout(()=>{

  }, 3000)
    const [controller, dispatch] = useMaterialUIController();
  const [dataController, dataDispatch] = useDataController();
  const {data: systemData, status} = useFetch({loader: _SystemData.getAll, params: [], successCode: FETCH_STATUS.OK, errorMsg: 'Could not load the system data correctly'})

  const { miniSidenav, withSideBar, direction, layout, openConfigurator, sidenavColor, transparentSidenav, whiteSidenav, darkMode, backDrop, applications, notifications } = controller;
  const {currentProject} = dataController

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const userToken = localStorage.getItem('userToken')

  useEffect(()=>{
    if(systemData !== null) setStandardLS(systemData['standard'])
    if(systemData !== null) setThreatTypesLS(systemData['threatTypes'])
    if(systemData !== null) setCIFs(systemData['CIFs'])
    if(systemData !== null) setEntryPoints(systemData['entryPoints'])
    if(systemData !== null) setFRs(systemData['foundationalRequirements'])
    if(systemData !== null) setActors(systemData['actors'])
  }, [systemData])

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {document.body.setAttribute("dir", direction);}, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (userToken == undefined) {
      // window.location.assign("/Login")
    }

  }, [pathname]);


  const getRoutes = (allRoutes) => allRoutes.map((route) => {
      // if(route.type == 'parametrized'){
      //   return <Route  path={route.route}
      //                 render={(props) => {
      //     return <route.component id={props.match.params.id}/>        }}>
      //   </Route>
      // }
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );


  const BackDropContent = () => {
    try {
      // return   <ClickAwayListener onClickAway={()=>{setBackDrop(dispatch, false)}}>{backDrop.Component}</ClickAwayListener>
      return backDrop.Component


    }catch (error){
      return <div >error</div>
    }
  };

  function drawNotifications(notificationsList){
    let list = []
    notificationsList.forEach((not, key)=>{
      if(not.title !== undefined){
        list.push(<Alert severity={not.severity} variant="filled" onClose={() => {removeNotification(dispatch, not.id)}}  key={not.id} >
          <AlertTitle>{not.title}</AlertTitle>
          {not.msg}
        </Alert>)
      }
      else {
        list.push(<Alert severity={not.severity} variant="filled" onClose={() => {removeNotification(dispatch, not.id)}} sx={{mt: 1}} key={not.id} >
          {not.msg}
        </Alert>)
      }

    })
    return (list)
  }

  function drawApplications(applications){
    let list = []
    applications.forEach((app, key)=>{
      if(app.sx !== undefined){
        let sx=AppSx
        for (const key in app.sx) {
          sx[key] = app.sx[key]
        }
        list.push(
          <Application title={app.title} id={app.id} key={app.id} sx={sx}>{app.App}</Application>
        )
      }
      else {
        list.push(
          <Application title={app.title} id={app.id} key={app.id} >{app.App}</Application>
        )
      }

    })
    return (list)
  }

  useEffect(()=>{
    // try {
    //   document.getElementById('backdropContent').addEventListener('click', (event)=>{
    //     event.stopPropagation();
    //   })
    // }catch (e){
    //
    // }

  }, [backDrop])

  useEffect(()=>{
    // PushNotification(dispatch,  "Test msg", 'error', 3000)
    // setTimeout(()=>{
    //   removeNotification(dispatch, 5)
    // }, 3000)



  }, [])

    return (
        // <ThemeProvider theme={darkMode ? themeDark : theme}>
        //   <NewTreatment sr={{id: '9999',name: 'Test'}}></NewTreatment>
        // </ThemeProvider>
      <ThemeProvider theme={darkMode ? themeDark : theme}>

        <ApplicationsTry/>
        {drawApplications(applications)}
        <CssBaseline></CssBaseline>
        <Grow in={backDrop == undefined? false: backDrop.isOpen} timeout="auto" unmountOnExit id={'backdrop'}>
          <Box sx={{backgroundColor: 'rgba(0, 0, 0, 0.7)', position: 'absolute', height: '100vh', width: '100vw', zIndex: (theme) => theme.zIndex.drawer + 2}}>
            <Box id={'backdropContent'} sx={{backgroundColor: '', p:0, zIndex: (theme) => theme.zIndex.drawer + 9999}}>
              <BackDropContent ></BackDropContent>
            </Box>
          </Box>
        </Grow>

        <LoadingProvider status={status} error={'Error while loading system Data'}>

          <Box sx={{ position: 'absolute', right: '2%', bottom: '2%', zIndex: 9999999, }}>
            {drawNotifications(notifications)}
          </Box>
          {/*<NewTreatment threat={{id: '9999',name: 'Test'}}></NewTreatment>*/}
          { userToken == null ? <SignIn></SignIn> :
            <>

              {layout === "dashboard" && (
                <>
                  {
                    withSideBar &&
                    <Sidenav
                      color={sidenavColor}
                      brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                      brandName="RAA"
                      routes={routes}
                      onMouseEnter={handleOnMouseEnter}
                      onMouseLeave={handleOnMouseLeave}
                    />
                  }
                  {/*<ProfileDrawer></ProfileDrawer>*/}
                  <DefaultNavbar />
                  <Configurator />
                  {configsButton}
                </>
              )}
              <Box sx={{height: '100vh', overflow: 'auto'}} id={'AppContent'}>
                <Routes>
                  {getRoutes(routes)}
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Box>
            </>
          }
      </LoadingProvider>
      </ThemeProvider>
    );


}
