// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import MDProgress from "../../../components/MDProgress";
import Link from "@mui/material/Link";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import _Project from "../../../_Models/_Project";
import MDInput from "components/MDInput";

const Project = ({ image, name, email: description }) => (
  <MDBox display={'flex'}>
    <MDAvatar
      src={image}
      alt={name}
      sx={({ borders: { borderWidth }, palette: { white } }) => ({
        border: `${borderWidth[2]} solid ${white.main}`,
        cursor: "pointer",
        position: "relative",
        ml: 0,
        "&:hover, &:focus": {
          zIndex: "10",
        },
      })}
    ></MDAvatar>
  <MDBox ml={2} lineHeight={0} bgColor={''}>

    <MDTypography display="block" variant="button" fontWeight="medium">
      {name}
    </MDTypography>
    <MDTypography variant="caption">{description}</MDTypography>
  </MDBox>
  </MDBox>
);

const EditProject = ({ name, email: description }) => {
  const [projectName, setProjectName] = useState(name);

  return (
    <MDBox ml={2} lineHeight={0} bgColor={''}>
      <MDInput display="block" fontWeight="medium" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
    </MDBox>)
}
  ;

const Progress = ({ color, value }) => (
  <MDBox display="flex" alignItems="center">
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {value}%
    </MDTypography>
    <MDBox ml={0.5} width="9rem">
      <MDProgress variant="gradient" color={color} value={value} />
    </MDBox>
  </MDBox>
);

export { Project, EditProject, Progress };
