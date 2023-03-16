import React from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
// import { Collapse, Fade, FormControlLabel, Switch } from '@mui/material';

const SectionOne = ({ setSection, handleChange, Treatment, setPregress }) => {
  function ThreatField({ field }) {
    return (
      <MDTypography
        sx={{
          backgroundColor: "#efefef",
          borderRadius: "0.75rem",
          paddingX: "10px",
          paddingY: "6px",
          marginTop: "5px",
        }}
      >
        <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
          {field} :
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" color="text">
          &nbsp;{Treatment[field]}
        </MDTypography>
      </MDTypography>
    );
  }

  return (
    <MDBox
      component="form"
      role="form"
      p={2}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      onSubmit={(e) => {
        e.preventDefault();
        setSection(2);
        setPregress();
      }}
    >
      <MDBox component="div">
        <MDBox mb={3}>
          <div
            style={{
              display: "flex",

              justifyContent: "center",
            }}
            variant="h1"
            component="h2"
          >
            System Security Requirements and Security levels
          </div>
          <ThreatField field={"System Requirement"} />
          <ThreatField field={"SL-C"} />
          <ThreatField field={"Title"} />
        </MDBox>

        <MDBox
          mb={2}
          sx={{
            backgroundColor: "#efefef",
            borderRadius: "0.75rem",
            paddingX: "2px",
            paddingY: "2px",
            marginTop: "2px",
          }}
        >
          <DefaultInfoCard
            title="Requirement Description:"
            description="The control system shall provide the capability to identify and authenticate all human users. This capability shall enforce such identification and authentication on all interfaces which provide human user access to the control system to support segregation of duties and least privilege in accordance with applicable security policies and procedures."
            value=""
          />
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between">
        <MDBox mb={2}>
          <MDButton variant="gradient" color="error" onClick={() => {}}>
            Not Applicable
          </MDButton>
        </MDBox>
        <MDBox mb={2}>
          <MDButton type="submit" variant="gradient" color="info" endIcon={<NavigateNextIcon />}>
            Next
          </MDButton>
        </MDBox>
      </MDBox>
    </MDBox>
  );
};

export default SectionOne;
