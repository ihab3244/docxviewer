// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Progress } from "../../../ProjectsPage/data/projectsTableData";

function Invoice({ date, id, price, noGutter }) {
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <MDBox lineHeight={1.125}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {date}
        </MDTypography>
        <MDTypography variant="caption" fontWeight="regular" color="text">
          <Progress color={'dark'} value={+id}></Progress>
        </MDTypography>
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <MDTypography   color="text"  lineHeight={1} ml={3} sx={{ cursor: "pointer" }}>
          <Icon fontSize="small">edit </Icon>
        </MDTypography>
        <MDBox display="flex" alignItems="center" lineHeight={1} ml={3} sx={{ cursor: "pointer" }}>

          <Icon fontSize="small">delete  </Icon>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Invoice
Invoice.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Invoice
Invoice.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Invoice;
