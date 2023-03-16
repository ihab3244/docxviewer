import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import { useMaterialUIController } from "../../context/theme/themeContext";
import { Grow, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";


const ApplicationsTry = ({}) => {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, withSideBar, direction, layout, openConfigurator, sidenavColor, transparentSidenav, whiteSidenav, darkMode, backDrop, applications, notifications } = controller;


  const sx = {
    display: applications.length > 0 ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-end',

    position: 'absolute', bottom: '4%', right: '1%', zIndex: (theme) => theme.zIndex.drawer + 2,
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000',
      p: 3,
      borderRadius: '50%',
      height: '2.5rem',
      width: '2.5rem'
    },
    '.list': {
      display: 'none'
    },
    '&:hover':{
      '.list': {
        display: 'block'
      },

    }
  }


  return(
    <Grow in={ applications.length > 0} >
    <Box sx={sx}>
        <List className={'list'}>
          {
            applications.map((app)=>{
              return(

                <ListItem disablePadding sx={{backgroundColor: 'lightgrey'}} key={app.id}>

                  <ListItemButton>
                    <ListItemText primary={app.title} />
                  </ListItemButton>
                </ListItem>

              )
            })
          }
        </List>
      <Box sx={sx.icon}>
        <Icon fontSize="small" sx={{color: '#FFFFFF'}}>
          apps
        </Icon>
      </Box>
    </Box>
    </Grow>

  )
}
export default ApplicationsTry
