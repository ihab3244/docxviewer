import React from 'react';
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Checkbox, Collapse, Fade, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Switch } from '@mui/material';

const threadActors = [
    "Actors1",
    "Actors2",
    "Actors3",
    "Actors4"
]
const affectedComponents = [
    "Component1",
    "Component2",
    "Component3",
    "Component4"
]
const entryPoints = [
    "entry1",
    "entry2",
    "entry3",
    "entry4"
]


const SectionThree = ({ assessment, setAssessment, setSection, handleChange, setPregress }) => {

    const handleChangeSelection = (event) => {
        localStorage.setItem(assessment.id, JSON.stringify(assessment))
        const {
            target: { value },
        } = event;

        setAssessment(prevAssessment => {
            return {
                ...prevAssessment,
                [event.target.name]: typeof value === 'string' ? value.split(',') : value,
            }
        }

        );
    };
    return (
        <MDBox component="form" role="form" p={2} display='flex' flexDirection='column'
            justifyContent='space-between' height='100%' onSubmit={(e) => {
                e.preventDefault()
                setSection(4)
                setPregress()
            }}>
            <MDBox>
                <MDBox mb={2}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="select-filled-label">Thread actors</InputLabel>
                        <Select
                            labelId="select-filled-label"
                            name='threadActors'
                            multiple
                            // required
                            value={assessment.threadActors}
                            onChange={handleChangeSelection}
                            input={<OutlinedInput label="Thread actors"
                                sx={{ padding: "12px" }} />}
                            renderValue={(selected) => selected.join(', ')}

                        >
                            {threadActors.map((actor) => (
                                <MenuItem key={actor} value={actor}>
                                    <Checkbox checked={assessment.threadActors.indexOf(actor) > -1} />
                                    <ListItemText primary={actor} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </MDBox>
                <MDBox mb={2}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="select-filled-label">Affected components</InputLabel>
                        <Select
                            labelId="select-filled-label"
                            multiple
                            // required
                            name='affectedComponents'
                            value={assessment.affectedComponents}
                            onChange={handleChangeSelection}
                            input={<OutlinedInput label="Affected components" sx={{ padding: "12px" }} />}
                            renderValue={(selected) => selected.join(', ')}

                        >
                            {affectedComponents.map((component) => (
                                <MenuItem key={component} value={component}>
                                    <Checkbox checked={assessment.affectedComponents.indexOf(component) > -1} />
                                    <ListItemText primary={component} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </MDBox>
                <MDBox mb={2}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="select-filled-label">Entry points</InputLabel>
                        <Select
                            labelId="select-filled-label"
                            multiple
                            // required
                            name='entryPoints'
                            value={assessment.entryPoints}
                            onChange={handleChangeSelection}
                            input={<OutlinedInput label="Entry points" sx={{ padding: "12px" }} />}
                            renderValue={(selected) => selected.join(', ')}

                        >
                            {entryPoints.map((actor) => (
                                <MenuItem key={actor} value={actor}>
                                    <Checkbox checked={assessment.entryPoints.indexOf(actor) > -1} />
                                    <ListItemText primary={actor} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </MDBox>
            </MDBox>
            <MDBox my={2} display='flex' justifyContent='space-between'>
                <MDButton variant="gradient" color="info"
                    startIcon={<NavigateBeforeIcon />}
                    onClick={() => {
                        setSection(2)
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

export default SectionThree;
