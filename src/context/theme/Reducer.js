import Box from "@mui/material/Box";
import {v4 as uuid} from 'uuid';
import { setWithSideNav } from "../../assets/StorageItems";
function ThemeReducer(state, action) {
  switch (action.type) {
    case "RENDERER": {
      console.log('setting renderer')
      state.renderer[action.value] = !state.renderer[action.value]
      return { ...state, renderer: state.renderer };
      break
    }

    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "WITH_SIDE_BAR": {
      setWithSideNav(action.value)
      return { ...state, withSideBar: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "WHITE_SIDENAV": {
      return { ...state, whiteSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "DARKMODE": {
      return { ...state, darkMode: action.value };
    }
    case "BACKDROP": {
      if(action.value == false){
        document.body.style.overflow = 'auto'
        return { ...state, backDrop: {isOpen : false, Component: <Box></Box>} };
      }
      document.body.style.overflow = 'hidden'
      return { ...state, backDrop: {isOpen : true, Component: action.value} };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }

    case "PUSH_NOTIFICATION": {
      state.notifications.push(action.value)
      return { ...state, notifications:state.notifications };
    }


    case "REMOVE_NOTIFICATION": {
      let newNotifications = state.notifications.filter((entry)=>entry.id !== action.value)
      return { ...state, notifications: newNotifications };
    }

    case "ADD_APPLICATION": {
      action.value.id = uuid()
      state.applications.push(action.value)
      return { ...state, applications: state.applications };
    }

    case "REMOVE_APPLICATION": {
      let applications = state.applications.filter((entry)=>entry.id !== action.value)
      return { ...state, applications: applications };
    }
  }
}

export default ThemeReducer
