import React from 'react';
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Checkbox, Collapse, Fade, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Switch } from '@mui/material';

const CriticalImpacts = [
    "impact1",
    "impact2",
    "impact3",
    "impact4"
]


const SectionTwo = ({ assessment, setAssessment, setSection, handleChange, setPregress }) => {


    const handleChangeImpacts = (event) => {
        localStorage.setItem(assessment.id, JSON.stringify(assessment))
        const {
            target: { value },
        } = event;
        setAssessment(prevAssessment => {
            return {
                ...prevAssessment,
                criticalImpact: typeof value === 'string' ? value.split(',') : value,
            }
        }

        );
    };

    return (
        <MDBox component="form" role="form" p={2} display='flex' flexDirection='column'
            justifyContent='space-between' height='100%' onSubmit={(e) => {
                e.preventDefault()
                setSection(3)
                setPregress()
            }}>
            <MDBox>
                <MDBox mb={2}>
                    <FormControl sx={{ width: '100%' }} >
                        <InputLabel id="select-filled-label" bg="#ffffff">Critical impact </InputLabel>
                        <Select
                            labelId="select-filled-label"
                            multiple
                            // required

                            name='criticalImpact'
                            value={assessment.criticalImpact}
                            onChange={handleChangeImpacts}
                            input={<OutlinedInput label="Critical impact"
                                sx={{ padding: "12px" }} />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {CriticalImpacts.map((impact) => (
                                <MenuItem key={impact} value={impact}   >
                                    <Checkbox checked={assessment.criticalImpact.indexOf(impact) > -1} />
                                    <ListItemText primary={impact} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </MDBox>
                <MDBox mb={2}>
                    <MDInput type="text" label="TTP1" name="ttp1" variant="outlined" value={assessment.ttp1}
                        multiline required rows={3} fullWidth onChange={handleChange} />
                </MDBox>
                <MDBox mb={2}>
                    <MDInput type="text" label="TTP2" name="ttp2" variant="outlined" value={assessment.ttp2}
                        multiline required rows={3} fullWidth onChange={handleChange} />
                </MDBox>
            </MDBox>
            <MDBox mb={2} display='flex' justifyContent='space-between'>
                <MDButton variant="gradient" color="info"
                    startIcon={<NavigateBeforeIcon />}
                    onClick={() => {
                        setSection(1)
                    }}>
                    Previous
                </MDButton>
                <MDButton type="submit" variant="gradient" color="info"
                    endIcon={<NavigateNextIcon />}>
                    Next
                </MDButton>

            </MDBox>

        </MDBox >
    );
}

export default SectionTwo;
