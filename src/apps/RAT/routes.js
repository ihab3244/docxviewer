// RAA layouts

// @mui icons
import Icon from "@mui/material/Icon";
import SystemDetails from "../../layouts/SystemDetails/SystemDetails";
import ProjectsPage from "../../layouts/RAT/ProjectsPage";
import { Box } from "@mui/material";

const routes = [
  {
    type: "collapse",
    name: "RA & T",
    key: "rat",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/rat",
    component: <ProjectsPage />,
  },
  {
    type: "parametrized",
    name: "Projects",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/rat/1",
    component:<Box>2111111111111111111111111111</Box>,
  },
];

export default routes;
