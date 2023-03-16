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

const threadActors = [
  "Technical",
  "Administrative",
  "Physical",
  "Technical and Administrative and Physical",
  "Technical and Administrative",
  "Technical and Physical",
  "Administrative and Physical",
];
const ImplementationStatus = [
  "Fully Implemented",
  "Implemented",
  "Partially Implemented",
  "Not implemented",
];
const entryPoints = [
  "The security Control/ safeguard is fully implemented, installed and configured its configuration is optimized to expected effeciency, the risk is fully mitigated ",
  "The security Control/ safeguard is almost fully implemented, installed and configured it could even be optimized to the almost expected effeciency, the risk is almost fully mitigated ",
  "The security Control/ safeguard is partially implemented, the security control is installed and configured but not optimized to the expected effeciency, the risk is partially mitigated ",
  "The security Control/ safeguard is poorly implemented, it could be installed but not configured or barely configured, the risk is not mitigated ",
  "NA",
];

const SectionThree = ({ Treatment, setTreatment, setSection, handleChange, setPregress }) => {
  const handleChangeSelection = (event) => {
    localStorage.setItem(Treatment.id, JSON.stringify(Treatment));
    const {
      target: { value },
    } = event;

    setTreatment((prevTreatment) => {
      return {
        ...prevTreatment,
        [event.target.name]: typeof value === "string" ? value.split(",") : value,
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
        setSection(4);
        setPregress();
      }}
    >
      <MDBox>
        <MDBox mb={2}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-filled-label">IEC 62443-3-3 Compliance Percentage</InputLabel>
            <Select
              labelId="select-filled-label"
              name="Type of Control/Countermeasure"
              multiple
              // required
              value={Treatment.threadActors}
              onChange={handleChangeSelection}
              input={<OutlinedInput label="Thread actors" sx={{ padding: "12px" }} />}
              renderValue={(selected) => selected.join(", ")}
            >
              {threadActors.map((actor) => (
                <MenuItem key={actor} value={actor}>
                  <Checkbox checked={Treatment.threadActors.indexOf(actor) > -1} />
                  <ListItemText primary={actor} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="Sub-type of Control/Countermeasure"
            variant="outlined"
            value={Treatment.stcc}
            name="description"
            fullWidth
            required
            rows={2}
            multiline
            onChange={handleChange}
          />
        </MDBox>
        <MDBox mb={2}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-filled-label">Implementation Status</InputLabel>
            <Select
              labelId="select-filled-label"
              multiple
              // required
              name="ImplementationStatus"
              value={Treatment.affectedComponents}
              onChange={handleChangeSelection}
              input={<OutlinedInput label="Affected components" sx={{ padding: "12px" }} />}
              renderValue={(selected) => selected.join(", ")}
            >
              {ImplementationStatus.map((component) => (
                <MenuItem key={component} value={component}>
                  <Checkbox checked={Treatment.ImplementationStatus.indexOf(component) > -1} />
                  <ListItemText primary={component} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBox>
        <MDBox mb={2}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-filled-label">Implementation Comments</InputLabel>
            <Select
              labelId="select-filled-label"
              multiple
              contentEditable
              // required
              name="entryPoints"
              value={Treatment.entryPoints}
              onChange={handleChangeSelection}
              input={<OutlinedInput label="Entry points" sx={{ padding: "12px" }} />}
              renderValue={(selected) => selected.join(", ")}
            >
              {entryPoints.map((actor) => (
                <MenuItem key={actor} value={actor}>
                  <Checkbox checked={Treatment.entryPoints.indexOf(actor) > -1} />
                  <ListItemText primary={actor} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBox>
      </MDBox>
      <MDBox my={2} display="flex" justifyContent="space-between">
        <MDButton
          variant="gradient"
          color="info"
          startIcon={<NavigateBeforeIcon />}
          onClick={() => {
            setSection(2);
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

export default SectionThree;
