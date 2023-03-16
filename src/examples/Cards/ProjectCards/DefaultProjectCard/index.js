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
import { useDataController } from "../../../../context/data/dataContext";
import { addApplication, PushNotification, useMaterialUIController } from "../../../../context/theme/themeContext";
import ProjectDetails from "../../../../layouts/ProjectDetails/ProjectDetails";


function DefaultProjectCard({project}) {
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
              crossorigin={'anonymous'}
              src={image}
              component="img"
              title={name}
              sx={{
                width: '100%',
                margin: 0,
                height: 250,
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
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          {/*{action.type === "internal" ? (*/}
          {/*  <MDButton*/}
          {/*    component={Link}*/}
          {/*    to={action.route}*/}
          {/*    variant="outlined"*/}
          {/*    size="small"*/}
          {/*    color={action.color}*/}
          {/*  >*/}
          {/*    {action.label}*/}
          {/*  </MDButton>*/}
          {/*) : (*/}
          {/*  <MDButton*/}
          {/*    component="a"*/}
          {/*    href={action.route}*/}
          {/*    target="_blank"*/}
          {/*    rel="noreferrer"*/}
          {/*    variant="outlined"*/}
          {/*    size="small"*/}
          {/*    color={action.color}*/}
          {/*  >*/}
          {/*    {action.label}*/}
          {/*  </MDButton>*/}

          {/*)}*/}
          <MDButton
            onClick={()=>{
              addApplication(dispatch, {App: <ProjectDetails project={project} />, title: 'Project Details'} )

            }}
            variant="outlined"
            size="small"
            color={action.color}
          >
            {action.label}
          </MDButton>
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  action: PropTypes.shape({
    image: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,

};

export default DefaultProjectCard;
