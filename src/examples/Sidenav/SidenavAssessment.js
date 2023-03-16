/**
=========================================================
* RAA - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRootAssess";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// RAA context
import {
  useMaterialUIController, setMiniSidenav
} from "context/theme/themeContext";

import { ListItem, ListItemButton, Typography } from "@mui/material";


function SidenavAssessment({ color, brand, brandName, threats, handleSetThread, threadNumb, ...rest }) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } = controller;


  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => {
    setMiniSidenav(dispatch, true)
  };
  const OpenSidenav = () => setMiniSidenav(dispatch, false);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, true);
    }

    /**
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch]);
  useEffect(() => {
    handleSetThread()
  }, [])


  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={miniSidenav ? OpenSidenav : closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            {miniSidenav ?
              <Icon sx={{ fontWeight: "bold", color: "#ffffff" }}>open_in_new</Icon>
              :
              <Icon sx={{ fontWeight: "bold", color: "#ffffff" }}>close</Icon>}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="flex-end">
          {/* {brand && <MDBox component="img" src={brand} alt="Brand" width="2rem" />} */}
          <MDBox
            width={!brandName}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h5" variant="button" fontWeight="medium" color={textColor}>
              {miniSidenav ? `Threats` : `${brandName} - Threats`}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>
        {threats
          ? threats.map((threat) =>
            <ListItem key={threat.id}
              selected={threadNumb === threat.id}
            >
              <ListItemButton
                sx={{
                  py: 0, minHeight: 32,
                  color: ((threat.checked && "#4CAF50") || 'rgba(255,255,255,.8)'),

                }}
                pr={5}
                onClick={(e) => {
                  handleSetThread(e)
                  closeSidenav()
                }}
                id={threat.id}>
                <Typography
                  display="block"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="uppercase"
                  px={1}
                  pr={5}
                  ml={1}

                >
                  {!miniSidenav ? (`${threat.id}. ${threat.name}`) : (` T. ${threat.id}`)}
                </Typography>
              </ListItemButton>
            </ListItem>

          )
          : 'heloo'}
      </List>

    </SidenavRoot >
  );
}

// Setting default values for the props of Sidenav
SidenavAssessment.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
SidenavAssessment.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
};

export default SidenavAssessment;
