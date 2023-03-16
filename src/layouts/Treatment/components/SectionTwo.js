import React from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import {
  Checkbox,
  Collapse,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from "@mui/material";

const CriticalImpacts = ["Operational  Zone SL-T", "Comfort Zone SL-T", "Wayside Zone SL-T"];

const SectionTwo = ({ Treatment, setTreatment, setSection, handleChange, setPregress }) => {
  const handleChangeImpacts2 = (event) => {
    localStorage.setItem(Treatment.id, JSON.stringify(Treatment));
    const {
      target: { value },
    } = event;
    setTreatment((prevTreatment) => {
      return {
        ...prevTreatment,
        criticalImpact: typeof value === "string" ? value.split(",") : value,
      };
    });
  };

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
        setSection(3);
        setPregress();
      }}
    >
      <MDBox>
        <MDBox mb={2}>
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
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-filled-label" bg="#ffffff">
              Applicable SL-C per SL-T {""}
            </InputLabel>
            <Select
              labelId="select-filled-label"
              multiple
              // required

              name="ApplicableSLCperSLT"
              value={Treatment.criticalImpact}
              onChange={handleChangeImpacts2}
              input={<OutlinedInput label="Critical impact" sx={{ padding: "12px" }} />}
              renderValue={(selected) => selected.join(", ")}
            >
              {CriticalImpacts.map((impact) => (
                <MenuItem key={impact} value={impact}>
                  <Checkbox checked={Treatment.criticalImpact.indexOf(impact) > -1} />
                  <ListItemText primary={impact} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBox>
      </MDBox>
      <MDBox mb={2} display="flex" justifyContent="space-between">
        <MDButton
          variant="gradient"
          color="info"
          startIcon={<NavigateBeforeIcon />}
          onClick={() => {
            setSection(1);
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

export default SectionTwo;
