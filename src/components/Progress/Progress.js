import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDProgress from "../MDProgress";

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

export default Progress
