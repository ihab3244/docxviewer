import Card from "@mui/material/Card";

// RAA components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Box, FormControl, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

import { useEffect, useRef, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { PushNotification, useMaterialUIController } from "../../context/theme/themeContext";
import _Project from "../../_Models/_Project";
import ImageUploader from "../ImageUploader/ImageUploader";



const Step1 = ({projectInfo, onChangeHandler, uploaderRef, galleryImageList})=>{
  return <>
    <MDBox mb={2}>
      <TextField value={projectInfo.name} type="text" label="Name" variant="outlined" name={'name'} fullWidth required  onChange={onChangeHandler} onInvalid={(event)=>{
        // event.preventDefault()
        // event.target.style.backgroundColor = 'red'
        event.target.error = true
        // setTimeout(()=>{
        //   event.target.style.backgroundColor = 'transparent'
        // }, 2000)
        // console.log(event)
      }}/>
    </MDBox>
    <MDBox mb={2}>
      <MDInput
        multiline rows={3} type="text"
        name={'description'} label="Description"
        variant="outlined" fullWidth success
        onChange={onChangeHandler}
      />
    </MDBox>
    <fieldset  style={{border: '1px solid #d2d6da', borderRadius: '20px', padding: 20, marginBottom: '20px', boxShadow: '10px 10px 20px grey'}}>
      <legend style={{marginLeft: '5px', paddingRight: '10px', paddingLeft: '10px'}}>
        <MDTypography  variant="caption" sx={{fontSize: '18px', color: '#344767'}}>System image:</MDTypography>
      </legend>
      <ImageUploader ref={uploaderRef} cardName="Input Image" imageGallery={galleryImageList} defaultImage={projectInfo.image}></ImageUploader>
    </fieldset>

  </>
}


const Step2 = ({projectInfo, uploaderRef, galleryImageList})=>{
  return <>

    <fieldset  style={{border: '3px dashed grey', borderRadius: '20px', padding: 5, marginBottom: '20px'}}>
      <legend style={{marginLeft: '5px', paddingRight: '5px', paddingLeft: '10px'}}>
        <MDTypography  variant="caption" sx={{fontSize: '18px'}} fontWeight={"bold"}>System schema:</MDTypography>
      </legend>
      <ImageUploadCard ref={uploaderRef} cardName="Input Image" imageGallery={galleryImageList} defaultImage={projectInfo.image}></ImageUploadCard>
    </fieldset>
  </>
}



function NewZone({zone}) {
  const [activeStep, setActiveStep] = useState(0  );
  const [render, setRender] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const [projectInfo, setProjectInfo] = useState({
    name: '',
    // workSpaceId: localStorage.getItem('workSpaceId'),
    workSpaceId: 'fc9b1557-6237-43d8-ad2a-b22c24ade556',
    description: '',
    image: null,
    });
  const uploaderRef = useRef(null);


  let galleryImageList = [
    "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
    "https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg",
    "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg",
    "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg"
  ];

  let steps = [
    {label:'Primary info', component:  <Step1  projectInfo={projectInfo} onChangeHandler={onChangeHandler} uploaderRef={uploaderRef} galleryImageList={galleryImageList}/>},
    {label:'Gallery', component:  <Step2  projectInfo={projectInfo} uploaderRef={uploaderRef} galleryImageList={galleryImageList} />},
  ];


  function onChangeHandler(e) {
    let name = e.target.name, value = e.target.value;
    projectInfo[name] = value;
    setRender(!render);
  }

  function uploadImage(projectId, image) {
    const formData = new FormData();
    formData.append("image", image);
    _Project.addImage(projectId, formData)
      .then(async createResul => {
        if (createResul.status == "200") {
          setActiveStep(1);
          PushNotification(dispatch, "Project has been created successfully", "success");
          return;
        } else {
          PushNotification(dispatch, "Project created but could not upload the image", "warning", 3000);
        }
      });

  }

  function handleCreate(){
    if(activeStep == 0) {
      _Project.create(projectInfo).then(async createResul => {
        if (createResul.status == '201') {
          let project = await createResul.json()
          uploadImage(project.id, uploaderRef.current.getRawImage())
          return
        } else {
          PushNotification(dispatch, 'Could not create the project ', 'error', 3000)
        }
      })
    }
  }

  function handleUpdate(){
    _Project.update(project.id, projectInfo).then(async createResul => {
      if (createResul.status == '200') {
        let project = await createResul.json()
        if(uploaderRef.current.getImage() === project.image){
          setBackDrop(dispatch, false)
          PushNotification(dispatch, "Project has been updated successfully", 'success')
        }
        else {
          uploadImage(project.id, uploaderRef.current.getRawImage())
        }

      }
      else {
        PushNotification(dispatch, 'Could not create the project ', 'error', 3000)
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (zone == undefined) {
      handleCreate();
    } else {
      handleUpdate();
    }
  }

  function handleCancel() {
    setBackDrop(dispatch, false);
    return;
  }

  useEffect(()=>{
    if(zone !== undefined){
      setProjectInfo({
        name: zone.name,
        // workSpaceId: localStorage.getItem('workSpaceId'),
        workSpaceId: 'fc9b1557-6237-43d8-ad2a-b22c24ade556',
        description: zone.description,
        image: zone.image
      })
    }
  },  [])


  return (
      <Box sx={{ width: "60%", backgroundColor: '', p:0, m:0}}>
        <Card>
          <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="success" mx={2} mt={-3} p={3} mb={1} textAlign="center" >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              New Zone
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={step.label} {...stepProps} sx={{color: 'secondary'}}>
                      <StepLabel {...labelProps} sx={{color: 'secondary'}}>{step.label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3} component="form" role="form" onSubmit={handleSubmit}>
            {steps[activeStep]['component']}
            <MDBox mt={4} mb={1}>
              <Grid container={true}  spacing={2}>
                <Grid item xs={4}>
                  <MDButton variant="gradient" color="error" fullWidth onClick={handleCancel}>
                    {
                      activeStep == 0
                        ? 'Cancel'
                        : 'Later'
                    }

                  </MDButton>
                </Grid>
                <Grid item xs={8}>
                  <MDButton variant="gradient" color="info" fullWidth type={'submit'}>
                    {
                      activeStep == 0
                        ? zone == undefined ? 'Create' : 'Update'
                        : 'Later'
                    }
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </Box>

  );
}

export default NewZone;
