import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { v4 as uuid } from "uuid";
import DataReducer from "./Reducer";
import { CURRENT_SYSTEM, getThreatTypeLS } from "../../assets/StorageItems";


// Data main context
const Data = createContext();

// Setting custom name for the context which is visible on react dev tools
Data.displayName = "DataContext";

// RAA reducer


// RAA context provider
function DataProvider({ children }) {
  let t = JSON.parse(localStorage.getItem('CURRENT_GLOBAL_PROJECT'))
  const initialState = {
    currentProject: t !== null ? t : {},
    currentGlobalSystem: {},
    currentThreatType: getThreatTypeLS() == null ? {}:  getThreatTypeLS(),

  };

  const [controller, dispatch] = useReducer(DataReducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <Data.Provider value={value}>{children}</Data.Provider>;
}

// RAA custom hook for using context
function useDataController() {
  const context = useContext(Data);

  if (!context) {
    throw new Error(
      "useDataController should be used inside the DataProvider."
    );
  }

  return context;
}

// Typechecking props for the useDataControllerProvider
useDataController.propTypes = {

};

// Context module functions
const setCurrentGlobalProject = (dispatch, value) => dispatch({ type: "SET_CURRENT_PROJECT", value });
const setCurrentGlobalSystem = (dispatch, value) => dispatch({ type: "SET_CURRENT_SYSTEM", value });
const setCurrentThreatType = (dispatch, value) => dispatch({ type: "SET_CURRENT_THREAT_TYPE", value });

const setProjectList = (dispatch, value) => dispatch({ type: "SET_PROJECT_LIST", value });
const updateProjectList = (dispatch, value) => dispatch({ type: "UPDATE_PROJECT_LIST", value });


export {
  DataProvider,
  useDataController,
  setCurrentGlobalProject,
  setCurrentGlobalSystem,
  setCurrentThreatType,
  setProjectList,
  updateProjectList
};
