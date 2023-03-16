import { Box } from "@mui/material";
import SignIn from "../../layouts/authentication/sign-in";
import Sidenav from "../../examples/Sidenav";
import brandDark from "../../assets/images/logo-ct-dark.png";
import brandWhite from "../../assets/images/logo-ct.png";
import routes from './routes'
import Configurator from "../../examples/Configurator";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingProvider from "../../components/LodingProvider/LoadingProvider";
import { useMaterialUIController } from "../../context/theme/themeContext";
import { useDataController } from "../../context/data/dataContext";
import useFetch from "../../Apis/useFetch";
import { _SystemData } from "../../_Models/_SystemData";
import { FETCH_STATUS } from "../../assets/HttpResponses";

const getRoutes = (allRoutes) => allRoutes.map((route) => {
  // if(route.type == 'parametrized'){
  //   return <Route  path={route.route}
  //                 render={(props) => {
  //     return <route.component id={props.match.params.id}/>        }}>
  //   </Route>
  // }
  if (route.collapse) {
    return getRoutes(route.collapse);
  }
  if (route.route) {
    return <Route exact path={route.route} element={route.component} key={route.key} />;
  }
  return null;
});


const RAT = ({}) => {
  const [controller, dispatch] = useMaterialUIController();
  const [dataController, dataDispatch] = useDataController();
  const {data: systemData, status} = useFetch({loader: _SystemData.getAll, params: [], successCode: FETCH_STATUS.OK, errorMsg: 'Could not load the system data correctly'})
  return(
    <Box>
      <LoadingProvider status={status}>
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/rat" />} />
        </Routes>
      </LoadingProvider>
    </Box>
  )
}

export default RAT
