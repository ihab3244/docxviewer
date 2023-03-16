import React from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import SaveIcon from "@mui/icons-material/Save";
import { TransitionGroup } from "react-transition-group";
import { Collapse } from "@mui/material";
import MDButton from "components/MDButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const SectionList = ({ Treatment, section, setSection, handleSaveThread }) => {
  function ResumeField({ field }) {
    return (
      <MDTypography
        flexGrow={1}
        sx={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `right 12px  center`,
          backgroundSize: `16px 16px`,
          backgroundColor: "#efefef",
          borderRadius: "0.75rem",
          paddingX: "10px",
          paddingBottom: "3px",
          marginTop: "2px",
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
    <MDBox px={2} width="100%">
      <TransitionGroup>
        {section > 1 && (
          <Collapse key={Treatment.description} timeout={800}>
            <MDBox display="flex" gap={1} m={0}>
              <ResumeField field="System Requirement" />
              <ResumeField field="SL-C" />
            </MDBox>
            <ResumeField field="Title" />
          </Collapse>
        )}

        {section > 2 && (
          <Collapse key={Treatment.criticalImpact}>
            <MDBox>
              <ResumeField field="ApplicableSL-CperSL-T" />
            </MDBox>
          </Collapse>
        )}
        {section > 3 && (
          <Collapse key={Treatment.id}>
            <MDBox>
              <ResumeField field="threadActors" />
              <ResumeField field="affectedComponents" />
              <ResumeField field="entryPoints" />
            </MDBox>
          </Collapse>
        )}
        {section > 4 && (
          <Collapse key={Treatment.threatComment}>
            <MDBox>
              <ResumeField field="threatComment" />
            </MDBox>

            <MDBox my={1} display="flex" justifyContent="space-between" width="100%">
              <MDButton
                variant="gradient"
                color="info"
                startIcon={<NavigateBeforeIcon />}
                onClick={() => {
                  setSection(4);
                }}
              >
                Previous
              </MDButton>
              <MDButton type="submit" variant="gradient" color="success" endIcon={<SaveIcon />}>
                Save
              </MDButton>
            </MDBox>
          </Collapse>
        )}
      </TransitionGroup>
    </MDBox>
  );
};

export default SectionList;
