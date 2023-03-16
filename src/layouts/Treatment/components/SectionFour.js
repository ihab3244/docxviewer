import React from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const SectionFour = ({ Treatment, setSection, handleChange, handleSaveThread, setPregress }) => {
  return (
    <MDBox
      component="form"
      role="form"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      p={2}
      onSubmit={(e) => {
        e.preventDefault();
        setSection(5);
        setPregress();
      }}
    >
      <MDBox mb={2}>
        <MDInput
          type="text"
          label="Thread comment"
          name="threatComment"
          variant="outlined"
          value={Treatment.threatComment}
          multiline
          required
          rows={6}
          fullWidth
          onChange={handleChange}
        />
      </MDBox>
      {/* navigation buttons */}
      <MDBox mb={2} display="flex" justifyContent="space-between">
        <MDButton
          variant="gradient"
          color="info"
          startIcon={<NavigateBeforeIcon />}
          onClick={() => {
            setSection(3);
          }}
        >
          Previous
        </MDButton>
        <MDButton type="submit" variant="gradient" color="info" endIcon={<NavigateNextIcon />}>
          Next
        </MDButton>
      </MDBox>
    </MDBox>
  );
};

export default SectionFour;
