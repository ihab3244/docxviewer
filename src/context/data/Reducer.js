import Box from "@mui/material/Box";
import { v4 as uuid } from 'uuid';
import { CURRENT_SYSTEM, CURRENT_THREAT_TYPE } from "../../assets/StorageItems";
function DataReducer(state, action) {

  switch (action.type) {

    case "SET_PROJECT_LIST": {

      return { ...state, projectList: action.value };
      break
    }

    case "SET_CURRENT_PROJECT": {
      localStorage.setItem('CURRENT_GLOBAL_PROJECT', JSON.stringify(action.value))
      return { ...state, currentProject: action.value };
      break
    }

    case "UPDATE_PROJECT_LIST": {

      let index = state.projectList.findIndex((project) => project.id === action.value.id);
      let projects = state.projectList
      projects[index] = { ...projects[index], name: action.value.name }

      return { ...state, projectList: projects }
        ;
      break
    }

    case "SET_CURRENT_SYSTEM": {
      localStorage.setItem(CURRENT_SYSTEM, JSON.stringify(action.value))
      return { ...state, currentGlobalSystem: action.value };
      break
    }

    case "SET_CURRENT_THREAT_TYPE": {
      localStorage.setItem(CURRENT_THREAT_TYPE, JSON.stringify(action.value))
      return { ...state, currentThreatType: action.value };
      break
    }


    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
    // case "PUSH_NOTIFICATION": {
    //   state.notifications.push(action.value)
    //   return { ...state, notifications:state.notifications };
    // }
    //
    // case "REMOVE_NOTIFICATION": {
    //   let newNotifications = state.notifications.filter((entry)=>entry.id !== action.value)
    //   return { ...state, notifications: newNotifications };
    // }
  }

}
export default DataReducer
