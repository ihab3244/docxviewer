// yitdz.
import PropTypes from "prop-types";

// @mui material components
import Menu from "@mui/material/Menu";

// RAA components
import MDBox from "components/MDBox";

// RAA example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import { Box, Divider, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../DashboardNavbar/styles";
import MDAvatar from "../../../components/MDAvatar";
import Icon from "@mui/material/Icon";
import MDTypography from "../../../components/MDTypography";
import PlatformSettings from "../../../layouts/profile/components/PlatformSettings";
import MDButton from "../../../components/MDButton";

function DefaultNavbarMobile({ open, close, user }) {
  const { width } = open && open.getBoundingClientRect();
  const sx = {
    position: 'relative',
    '.profileContainer' : {
      display: 'none',
      width: '15vw', p:1,
      position: 'absolute', top: '100%', right: '10%',  backgroundColor: ''
    },
    '&:hover':{
      '.profileContainer' : {
        display: 'block',
      },

    }
  }
  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <MDBox px={0.5}>
        <DefaultNavbarLink icon="donut_large" name="dashboard" route="/dashboard" />
        <DefaultNavbarLink icon="person" name="RA &T" route="/rat" />
        <Box sx={sx}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconButton
              size="small"
              disableRipple
              color="inherit"
              sx={navbarIconButton}
            >
              <MDAvatar src={user.image} alt="profile-image" size="xs" shadow="sm"/>
            </IconButton>
            <Icon>expand_more</Icon>
          </Box>

          <Paper sx={{}} className={'profileContainer'}>
            {/*<MDBox variant={"gradient"} bgColor={'dark'}>Signed in as:</MDBox>*/}
            <Box sx={{display: 'flex', mt: 2}}>
              <MDAvatar src={user.image} alt="profile-image" size={"lg"} shadow="sm"></MDAvatar>
              <MDBox height="100%" mt={0.5} lineHeight={1} ml={4}>
                <MDTypography variant="h5" fontWeight="medium">
                  Oualid KHIAL
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Company admin
                </MDTypography>
              </MDBox>
            </Box>

            <PlatformSettings />
            <Divider></Divider>
            <MDButton
              fullWidth
              variant={"contained"}
              onClick={{}}
              name={'Logout'}
              icon={<Icon fontSize="small">login</Icon>}
              noCollapse={true}
            >
              {/*<Icon>help</Icon>*/}
              PS Profile
            </MDButton>
            <MDButton
              fullWidth
              variant={"contained"}
              onClick={{}}
              name={'Logout'}
              icon={<Icon fontSize="small">login</Icon>}
              noCollapse={true}
            >
              {/*<Icon>help</Icon>*/}
              Help & support
            </MDButton>
            <MDButton
              fullWidth
              variant={"contained"}

              name={'Logout'}
              icon={<Icon fontSize="small">login</Icon>}
              noCollapse={true}
            >
              Settings
            </MDButton>
            <Divider></Divider>
            <MDButton
              fullWidth
              variant={"contained"}
              color={'error'}
              onClick={()=>{
                localStorage.removeItem('userToken')
                window.location = '/'
              }}
              name={'Logout'}
              icon={<Icon fontSize="small">login</Icon>}
              noCollapse={true}
            >
              Logout
            </MDButton>


          </Paper>
        </Box>
      </MDBox>
    </Menu>
  );
}

// Typechecking props for the DefaultNavbarMenu
DefaultNavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
};

export default DefaultNavbarMobile;
