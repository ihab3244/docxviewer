import Card from "@mui/material/Card";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";

function Invoices() {
  return (
    <Card sx={{ height: "100%", overflow: 'auto' }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Project Zones
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          New zone
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Invoice date="Operational Zone" id="60" price="$180" />
          <Invoice date="Operational Zone" id="60" price="$180" />
          <Invoice date="Comfort zone" id="5" price="$180" />
          <Invoice date="March, 01, 2019" id="45" price="$300" noGutter />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
