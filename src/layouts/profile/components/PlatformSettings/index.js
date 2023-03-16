import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <Card sx={{ boxShadow: "none" }}>

      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        {/*<MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">*/}
        {/*  account*/}
        {/*</MDTypography>*/}
        {/*<MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>*/}
        {/*  <MDBox mt={0.5}>*/}
        {/*    <Switch checked={followsMe} onChange={() => setFollowsMe(!followsMe)} />*/}
        {/*  </MDBox>*/}
        {/*  <MDBox width="80%" ml={0.5}>*/}
        {/*    <MDTypography variant="button" fontWeight="regular" color="text">*/}
        {/*      Email me when someone follows me*/}
        {/*    </MDTypography>*/}
        {/*  </MDBox>*/}
        {/*</MDBox>*/}
        {/*<MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>*/}
        {/*  <MDBox mt={0.5}>*/}
        {/*    <Switch checked={answersPost} onChange={() => setAnswersPost(!answersPost)} />*/}
        {/*  </MDBox>*/}
        {/*  <MDBox width="80%" ml={0.5}>*/}
        {/*    <MDTypography variant="button" fontWeight="regular" color="text">*/}
        {/*      Email me when someone answers on my post*/}
        {/*    </MDTypography>*/}
        {/*  </MDBox>*/}
        {/*</MDBox>*/}
        {/*<MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>*/}
        {/*  <MDBox mt={0.5}>*/}
        {/*    <Switch checked={mentionsMe} onChange={() => setMentionsMe(!mentionsMe)} />*/}
        {/*  </MDBox>*/}
        {/*  <MDBox width="80%" ml={0.5}>*/}
        {/*    <MDTypography variant="button" fontWeight="regular" color="text">*/}
        {/*      Email me when someone mentions me*/}
        {/*    </MDTypography>*/}
        {/*  </MDBox>*/}
        {/*</MDBox>*/}
        <MDBox mt={3}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            application
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={newLaunches} onChange={() => setNewLaunches(!newLaunches)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Allow global Treatment
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={productUpdate} onChange={() => setProductUpdate(!productUpdate)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Stand alone Projects apps
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Data entry confirmation
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
