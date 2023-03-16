import React from 'react';
import { useMaterialUIController } from "context/theme/themeContext";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import SidenavAssessment from 'examples/Sidenav/SidenavAssessment';



const SideNav = ({ threats, systemName, threadNumb, handleSetThread }) => {

    const [controller, dispatch] = useMaterialUIController();
    const {
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;


    return (
        <div>
            <SidenavAssessment
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName={systemName}
                threats={threats}
                handleSetThread={handleSetThread}
                threadNumb={threadNumb}
            //   routes={routes}
            //   onMouseEnter={handleOnMouseEnter}
            //   onMouseLeave={handleOnMouseLeave}
            />
        </div>
    );
}

export default SideNav;
