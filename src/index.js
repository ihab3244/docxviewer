import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import App from './App'
const SystemLoading = () => {

  return (
    <Box sx={{ backgroundColor: '  ', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  )
}


const container = document.getElementById('root');
const root = createRoot(container)

// RAA Context Provider
import { MaterialUIControllerProvider } from "context/theme/themeContext";
import { DataProvider } from "./context/data/dataContext";
import { Box, CircularProgress } from "@mui/material";
import MDBox from "./components/MDBox";
// const App = React.lazy(() => import('App'));
root.render(
  <BrowserRouter>
    <DataProvider>
      <MaterialUIControllerProvider>
        {/*<React.Suspense fallback={<SystemLoading/>}>*/}
        <App />
        {/*</React.Suspense>*/}
      </MaterialUIControllerProvider>
    </DataProvider>

  </BrowserRouter>,

);
