import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import ThemeReducer from "./Reducer";
import { v4 as uuid } from "uuid";
import { getWithSideNav } from "../../assets/StorageItems";

// RAA main context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// RAA reducer


// RAA context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    renderer: {},
    miniSidenav: false,
    withSideBar: getWithSideNav(),
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
    backDrop: false,
    applications: [],
    notifications: []
  };

  const [controller, dispatch] = useReducer(ThemeReducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// RAA custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
};

// Context module functions
const setRenderer = (dispatch, value) => dispatch({ type: "RENDERER", value });
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setWithSideBar = (dispatch, value) => dispatch({ type: "WITH_SIDE_BAR", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });
const setBackDrop = (dispatch, value) => dispatch({ type: "BACKDROP", value });
const pushNotification = (dispatch, value) => dispatch({ type: "PUSH_NOTIFICATION", value });
const removeNotification = (dispatch, value) => dispatch({ type: "REMOVE_NOTIFICATION", value });
const addApplication = (dispatch, value) => dispatch({ type: "ADD_APPLICATION", value });
const removeApplication = (dispatch, value) => dispatch({ type: "REMOVE_APPLICATION", value });

const PushNotification = (dispatch, msg, severity, duration, title)=>{
  let newUuid = uuid()
  let value = {id: newUuid, newUuid, msg, severity, duration, title}
  pushNotification(dispatch, value)
  if(duration !== undefined){
    setTimeout(()=>{
      removeNotification(dispatch, newUuid)
    }, duration)
  }
}


export {
  setRenderer,
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setWithSideBar,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
  setBackDrop,
  PushNotification,
  removeNotification,
  addApplication,
  removeApplication,
};
