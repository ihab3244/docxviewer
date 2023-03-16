import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

//Tabs

import {
  Box,
  Card,
  CardContent,
  Divider,
  Fab,
  Grid,
  Icon,
  IconButton,
  InputBase,
  Paper, Typography,
  withStyles,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import MDBox from "../MDBox";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import uploadPlaceHolder from "../../assets/images/uploadPlaceHolder.png";
import MDTypography from "../MDTypography";




const sx = {
  root: {
    backgroundColor: 'red',
    width: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  icon: {
    margin: 1
  },
  iconHover: {
    margin: 1,
    "&:hover": {
      color:'red'
    }
  },
  cardHeader: {
    textalign: "center",
    align: "center",
    backgroundColor: "white"
  },
  input: {
    display: "none"
  },
  title: {
    color: blue[800],
    fontWeight: "bold",
    fontFamily: "Montserrat",
    align: "center"
  },
  button: {
    color: blue[900],
    margin: 10
  },
  secondaryButton: {
    color: "gray",
    margin: 10
  },
  typography: {
    margin: 1,
    backgroundColor: "default"
  },

  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  searchInput: {
    marginLeft: 8,
    flex: 1
  },
  searchIconButton: {
    padding: 10
  },
  searchDivider: {
    width: 1,
    height: 28,
    margin: 4
  }
}

function Entry({icon}) {
  return <Box component="span" sx={{ fontSize: 30, backgroundColor: grey[200] , cursor: 'pointer', mx: 1}} display={"flex"} alignItems={"center"} width={60} height={60} justifyContent={"center"} borderRadius={"50%"} >

    <Icon>{icon}</Icon>
  </Box>;
}

const ImageUploader = forwardRef(({defaultImage, test}, ref) => {

  const [image, setImage] = useState(defaultImage)
  const [rawImage, setRawImage] = useState(null)

  useEffect(()=>{
    if(defaultImage !== null){
      setImage(defaultImage)
    }
  }, [defaultImage])
  const getImage = () => {
    return image
  };

  const getRawImage = () => {
    return rawImage
  };

  useImperativeHandle(ref, () => ({
    getImage, getRawImage
  }));

  return (

    <Box id={'imageUploaderContainer'} sx={{position: 'relative'}}>
      <Box sx={{position: image == null ? 'static': 'absolute', bottom: 20,  width: '100%', opacity: image == null ? 1: 0.8}}>
        <Box  sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '', width: '100%'}}>
            <Box sx={{position: 'relative', backgroundColor: ''}}>
              <input id={'fileInput'} name={'image'} type="file" style={{opacity: '0', position: 'absolute', height: '90%', width: '100%'}} accept="image/*" onChange={(e)=>{
                const uploadFileEle = document.getElementById("fileInput")
                console.log(uploadFileEle.files[0]);
                console.log(e)
                setImage(URL.createObjectURL(uploadFileEle.files[0]))
                setRawImage(e.target.files[0])
              }}/>
              <Entry icon={'add_photo_alternate'}/>
            </Box>
            <Entry icon={'auto_awesome_motion'}/>
        </Box>
      </Box>
      { image == null &&
      <MDBox display={'flex'} alignItems={'center'}  justifyContent={'center'}>
        <MDTypography textGradient={true} fontWeight={"light"} color={"text" }>Upload an image or chose from templates</MDTypography>
      </MDBox>
      }

        <img crossOrigin={"anonymous"} src={image} width={'100%'} style={{width: '100%', borderRadius: '20px', height: 250, display: image == null ? 'none': 'block'}}/>


    </Box>

  );

})

export default ImageUploader
