import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import { Box } from "@mui/material";
import { addApplication, useMaterialUIController } from "../../context/theme/themeContext";
import ProjectDetails from "../../layouts/ProjectDetails/ProjectDetails";

const InfoEntry = ({title, content}) => {

  return  <MDBox display="flex" pr={2} alignItems={'center'} mt={1}>
    <MDTypography variant="button" fontWeight="bold" >
      {title}: &nbsp;
    </MDTypography>
    <MDTypography variant="button" fontWeight="regular" color="text">
      {content}
    </MDTypography>
  </MDBox>
}




function ProjectPrimaryInfo({project}) {
  let { image, label, name, description, action, authors } = project
  const [controller, dispatch] = useMaterialUIController()
  const renderAuthors = authors?.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar

        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
        p:1
      }}
    >
      <MDBox position="relative" width="100%" shadow="xl" borderRadius="xl">
        {
          image == undefined
           ?
            <Box sx={{width: 400, height: 250, display:'flex', alignItems: 'center', justifyContent: 'center'}}>
              No Image
            </Box>
            :
            <CardMedia
              crossOrigin={'anonymous'}
              src={image}
              component="img"
              title={name}
              sx={{
                width: '100%',
                margin: 0,
                height: 200,
                boxShadow: ({ boxShadows: { md } }) => md,
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
        }

      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {label}
        </MDTypography>
        <MDBox mb={1}>
          {action.type === "internal" ? (
            <MDTypography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {name}
            </MDTypography>
          ) : (
            <MDTypography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {name}
            </MDTypography>
          )}
        </MDBox>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox mb={2}>
          <InfoEntry title={'Zone and conduits'} content={'5'}></InfoEntry>
          <InfoEntry title={'Sub-systems'} content={project.systems.length}></InfoEntry>
          <InfoEntry title={'Last time updated'} content={'25/12/2022'}></InfoEntry>
        </MDBox>


        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDButton
            onClick={()=>{addApplication(dispatch, {App: <ProjectDetails project={project} />, title: 'Project Details'} )}}
            variant="outlined"
            size="small"
            color={action.color}
          >
            open in single view
          </MDButton>
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
ProjectPrimaryInfo.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
ProjectPrimaryInfo.propTypes = {
  action: PropTypes.shape({
    image: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.object),
  }),

};

export default ProjectPrimaryInfo;
