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

// RAA base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// RAA helper functions
import pxToRem from "assets/theme/functions/pxToRem";
import rgba from "assets/theme/functions/rgba";

const { size, fontWeightRegular } = typography;
const { white } = colors;

const stepLabel = {
  styleOverrides: {
    label: {

      fontWeight: fontWeightRegular,
      fontSize: size.xs,
      color: "#white",
      textTransform: "uppercase",

      "&.Mui-active": {
        fontWeight: `${fontWeightRegular} !important`,
        color: `${rgba(white.main, 0.9)} !important`,
      },

      "&.Mui-completed": {
        fontWeight: `${fontWeightRegular} !important`,
        color: `${rgba(white.main, 0.8)} !important`,
      },
    },
  },
};

export default stepLabel;
