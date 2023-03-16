import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import * as React from "react";
import UI_STATUS from "./UiStatus";

const LoadingProvider = ({status, Loading, error, children}) => {
  switch (status) {
    case UI_STATUS.LOADING:
      if(Loading !== undefined){
        return Loading
      }else {
        return (
          <Box sx={{backgroundColor: '  ', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
          </Box>
        )
      }
      break
    case UI_STATUS.READY:
      return children
    break
    case UI_STATUS.ERROR:
      return error
    break

  }

}

export default LoadingProvider
