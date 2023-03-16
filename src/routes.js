// RAA layouts
import Dashboard from "layouts/dashboard";
import ProjectsPage from "layouts/ProjectsPage";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import NewProject from "layouts/RAT/components/NewProject/NewProject";
import NewAssessment from "layouts/assessment/new assessment"

// @mui icons
import Icon from "@mui/material/Icon";
import SystemDetails from "./layouts/SystemDetails/SystemDetails";
import RAT from "./layouts/RAT/ProjectsPage";

const routes = [
  {
    type: "collapse",
    name: "Dash Board",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <RAT />,
  },
  {
    type: "collapse",
    name: "RA & T",
    key: "rat",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/rat",
    component: <RAT />,
  },
  {
    type: "parametrized",
    name: "Projects",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/:project/Systems/:systemId/:tab",
    component: <SystemDetails />,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing></Billing>
  // }
  /*
    {
      type: "collapse",
      name: "Notifications",
      key: "notifications",
      icon: <Icon fontSize="small">notifications</Icon>,
      route: "/notifications",
      component: <Notifications />,
    }*/,
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  /*
   {
     type: "collapse",
     name: "Sign Up",
     key: "sign-up",
     icon: <Icon fontSize="small">assignment</Icon>,
     route: "/authentication/sign-up",
     component: <SignUp />,
   },*/,
];

export default routes;
