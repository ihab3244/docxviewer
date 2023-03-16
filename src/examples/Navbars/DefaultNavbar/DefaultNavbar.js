import { useState, useEffect } from "react";
import logo from '../../../assets/images/logos/logo-with-padding.png'

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// RAA example components
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// RAA base styles
import breakpoints from "assets/theme/base/breakpoints";

// RAA context
import { setOpenConfigurator, useMaterialUIController } from "context/theme/themeContext";
import IconButton from "@mui/material/IconButton";
import { navbarIconButton } from "../DashboardNavbar/styles";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import MDAvatar from "../../../components/MDAvatar";
import burceMars from "../../../assets/images/bruce-mars.jpg";
import PlatformSettings from "../../../layouts/profile/components/PlatformSettings";
import SidenavCollapse from "../../Sidenav/SidenavCollapse";
import MDInput from "../../../components/MDInput";




function DefaultNavbar({ transparent, light, action }) {
  const [controller, dispatch] = useMaterialUIController();
  const user = JSON.parse((localStorage.getItem('user')))
  const [open, setOpen] = useState(false)
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode , withSideBar} = controller;

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.md) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
    /**
     The event listener that's calling the displayMobileNavbar function when
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();
    setTimeout(()=>{
      // setUser(JSON.parse(localStorage.getItem('user')))
    }, 2000)
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);

  }, []);


  const sx = {
    position: 'relative',
    zIndex: (theme) => theme.zIndex.drawer + 10,
    '.profileContainer' : {
      zIndex: (theme) => theme.zIndex.drawer + 10,
      display: open ? 'block':'none',
      width: {sm: '35vw', md: '40wv', lg: '15vw'}, p:1,
      position: 'absolute', top: '100%', right: 0,  backgroundColor: '#FFFFFF'
    },
    // '&:hover':{
    //   '.profileContainer' : {
    //     display: 'block',
    //   },
    //
    // }
  }

  return (
    <>
      <MDBox
        py={1}
        px={{ xs: 0, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        mt={2}
        mr={5}
        ml={withSideBar ? 37:3}
        variant={"gradient"}
        width={withSideBar ? '82%':'97%'}
        minWidth={withSideBar ? '82%':'1548px'}
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={'#FFFFFF'}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        bgColor={'dark'}
        sx={({
          palette: { transparent: transparentColor, white, background },
          functions: { rgba },
        }) => ({

          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <MDBox
          component={Link}
          to="/"
          py={transparent ? 1.5 : 0.75}
          lineHeight={1}
          pl={{ xs: 0, lg: 1 }}
        >
          <MDTypography variant="button" fontWeight="bold" color={light ? "white" : "white"}>
            Progression systems
            {/*<img src={logo} style={{height: '60px'}}></img>*/}
          </MDTypography>

        </MDBox>
        <MDBox color="inherit" display={'flex'} m={0} p={0}>

          {/*<DefaultNavbarLink icon="donut_large" name="dashboard" route="/dashboard" light={true} />*/}
          {/*<DefaultNavbarLink icon="donut_large" name="RA & T" route="/rat" light={true} />*/}
          {/*<DefaultNavbarLink icon="person" name="profile" route="/profile" light={true} />*/}
          {/*<ClickAwayListener onClickAway={()=>{setOpen(false)}}>*/}
            <Box sx={sx} onClick={()=>{setOpen(!open)}}>
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
              <Paper sx={{borderRadius: 1}} className={'profileContainer'}>
                {/*<MDBox variant={"gradient"} bgColor={'dark'}>Signed in as:</MDBox>*/}
                <Box sx={{display: 'flex', mt: 2, mb:2}}>
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
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-chip-label" fullWidth>{'Workspace'}</InputLabel>
                  <Select label={'Workspace'} fullWidth value={0}>
                    <MenuItem value={0}>SIRAM</MenuItem>
                    {/*<MenuItem value={1}>SIRAM</MenuItem>*/}
                  </Select>
                </FormControl>

                <PlatformSettings />
                <Divider></Divider>
                <MDButton
                  fullWidth
                  variant={"contained"}
                  name={'Logout'}
                  icon={<Icon fontSize="small">login</Icon>}
                >
                  {/*<Icon>help</Icon>*/}
                  PS Profile
                </MDButton>
                <MDButton
                  fullWidth
                  variant={"contained"}
                  name={'Logout'}
                  icon={<Icon fontSize="small">login</Icon>}
                >
                  {/*<Icon>help</Icon>*/}
                  Help & support
                </MDButton>
                <MDButton
                  fullWidth
                  variant={"contained"}
                  onClick={handleConfiguratorOpen}
                  name={'Logout'}
                  icon={<Icon fontSize="small">login</Icon>}
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
                      localStorage.removeItem('user')
                      window.location = '/'
                    }}
                    name={'Logout'}
                    icon={<Icon fontSize="small">login</Icon>}
                  >
                    Logout
                  </MDButton>
              </Paper>
            </Box>
          {/*</ClickAwayListener>*/}
        </MDBox>
      </MDBox>
      {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} user={user}/>}
    </>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
