import React from 'react';
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDTypography from 'components/MDTypography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { setBackDrop, useMaterialUIController } from "../../../context/theme/themeContext";
// import { Collapse, Fade, FormControlLabel, Switch } from '@mui/material';

const SectionOne = ({ setSection, handleChange, assessment, setPregress }) => {
    const [controller, dispatch] = useMaterialUIController()
    function ThreatField({ field }) {
        return (
            <MDTypography sx={{
                backgroundColor: '#efefef',
                borderRadius: '0.75rem',
                paddingX: '10px',
                paddingY: '6px',
                marginTop: '5px',
            }}>
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize" >
                    {field} :
                </MDTypography >
                <MDTypography variant="button" fontWeight="regular" color="text">
                    &nbsp;{assessment[field]}
                </MDTypography>
            </MDTypography >
        )
    }

    return (
        <MDBox component="form" role="form" p={2} display='flex' flexDirection='column'
            justifyContent='space-between' height='100%' onSubmit={(e) => {
                e.preventDefault()
                setSection(2)
                setPregress()
            }}>
            <MDBox component='div' >
                <MDBox mb={3}>
                    <ThreatField field={'name'} />
                    <ThreatField field={'type'} />
                    <ThreatField field={'origines'} />

                </MDBox>

                <MDBox mb={2}>
                    <MDInput type="text" label="Description" variant="outlined" value={assessment.description} name='description'
                        fullWidth required rows={2} multiline onChange={handleChange} />
                </MDBox>
            </MDBox>
            <MDBox display='flex' justifyContent='space-between'>
                <MDBox mb={2}>
                    <MDButton variant="gradient" color="error" onClick={() => { setBackDrop(dispatch, false)}}>
                        Not Applicable
                    </MDButton>
                </MDBox>
                <MDBox mb={2}>
                    <MDButton type="submit" variant="gradient" color="info"
                        endIcon={<NavigateNextIcon />}>
                        Next
                    </MDButton>
                </MDBox>
            </MDBox>
        </MDBox>
    );
}

export default SectionOne;
