// yitdz
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import pattern from "assets/images/illustrations/pattern-tree.svg";
import masterCardLogo from "assets/images/logos/mastercard.png";
import { Progress } from "../../../layouts/ProjectsPage/data/projectsTableData";

function ProjectInfoCard({ name, color, number, holder, expires }) {
  const numbers = [...`${number}`];

  if (numbers.length < 16 || numbers.length > 16) {
    throw new Error(
      "Invalid value for the prop number, the value for the number prop shouldn't be greater than or less than 16 digits"
    );
  }

  const num1 = numbers.slice(0, 4).join("");
  const num2 = numbers.slice(4, 8).join("");
  const num3 = numbers.slice(8, 12).join("");
  const num4 = numbers.slice(12, 16).join("");

  return (
    <Card
      sx={({ palette: { gradients }, functions: { linearGradient }, boxShadows: { xl } }) => ({
        background: gradients[color]
          ? linearGradient(gradients[color].main, gradients[color].state)
          : linearGradient(gradients.dark.main, gradients.dark.state),
        boxShadow: xl,
        position: "relative",
      })}
    >
      <MDBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        opacity={0.2}
        sx={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
        }}
      />
      <MDBox position="relative" zIndex={2} p={2} justifyContent="space-between" display="flex" flexDirection={'column'}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">


        </MDBox>
        <MDTypography variant="h5" color="white" fontWeight="medium" sx={{ mt: 3, mb: 1, pb: 1 }}>
          Assessment <Progress color={'red'} value={80}></Progress>
        </MDTypography>
        <MDTypography variant="h5" color="white" fontWeight="medium" sx={{ mt: 3, mb: 1, pb: 1 }}>
          Treatment <Progress color={'red'} value={45}></Progress>
        </MDTypography>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox display="flex" alignItems="center">
            <MDBox mr={3} lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Card Holder
              </MDTypography>
              <MDTypography
                variant="h6"
                color="white"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {holder}
              </MDTypography>
            </MDBox>
            <MDBox lineHeight={1}>
              <MDTypography variant="button" color="white" fontWeight="regular" opacity={0.8}>
                Expires
              </MDTypography>
              <MDTypography variant="h6" color="white" fontWeight="medium">
                {expires}
              </MDTypography>
            </MDBox>
          </MDBox>

        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of MasterCard
ProjectInfoCard.defaultProps = {
  color: "dark",
};

// Typechecking props for the MasterCard
ProjectInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  number: PropTypes.number.isRequired,
  holder: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired,
};

export default ProjectInfoCard;
