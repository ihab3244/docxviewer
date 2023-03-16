import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import { FormControlLabel, Switch } from "@mui/material";

function LatestAssessments() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Latest activities&apos;s
        </MDTypography>
        <MDBox display="flex" alignItems="center">
          {/*<MDBox color="text" mr={0.5} lineHeight={0}>*/}
          {/*  <Icon color="inherit" fontSize="small">*/}
          {/*    date_range*/}
          {/*  </Icon>*/}
          {/*</MDBox>*/}
          <FormControlLabel control={<Switch defaultChecked />} label="show submitted" />

        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="dark"
            icon="expand_more"
            name="Water Damage"
            description="On Breaking system"
            value="Waiting Submission"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Dust, corrosion, freezing"
            description="Passenger counting system"
            value="Submitted"
          />
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {/*<Transaction*/}
          {/*  color="success"*/}
          {/*  icon="add"*/}
          {/*  name="Name Updated"*/}
          {/*  description="Breaking System -> Breaking"*/}
          {/*  value="+ $ 750"*/}
          {/*/>*/}

          <Transaction
            color="dark"
            icon="priority_high"
            name="Webflow"
            description="26 March 2020, at 05:00 AM"
            value="Pending"
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default LatestAssessments;
