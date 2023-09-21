import React, { useState } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
// import axios from "axios";
import Grid from '@mui/material/Grid';
import Spinner from "../Spinner";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LinearBuff from "./LoadingBar"
import PersonalizedEmailCampaign from "./PersonalizedEmailCampaign";
import Header from "../Header/Header";
import axiosService from "../../Service/api";

const RegisterForm = () => {
  const [sme_name, setsme_name] = useState("");
  const [sme_business, setsme_business] = useState("");
  const [sme_location, setsme_location] = useState("");
  const [showdashboard, setshowdashboard] = React.useState(false);
  const [showblog, setshowblog] = React.useState(false);
  const [showcampaign, setshowcampaign] = React.useState(false);
  const [showcampaigngenerate, setshowcampaigngenerate] = React.useState(false);
  const [sme_USP, setPassword] = useState("");
  const [product_list, setproduct_list] = useState("");
  const [value, setValue] = React.useState(0);
  const [mode, setMode] = React.useState(0);
  const [loader, setLoader] = React.useState(false);

  const [isShown, setIsShown] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  


  const [backendresponse, setbackendresponse] = React.useState();
  const [backendblogresponse, setbackendblogresponse] = React.useState();

  const [backendgenerateresponse, setbackendgenerateresponse] = React.useState([]);
  const [backendgenerateresponseshow, setbackendgenerateresponseshow] = React.useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(sme_name, sme_business, sme_location, sme_USP);
  }

  const handleMode = (event) => {
    console.log(event);
    setMode(event.target.value);
  };

  function callApi(e) {
    setLoader(true)
    
    const formData = new FormData();
    formData.append("sme_name", sme_name);
    formData.append("sme_business", sme_business);
    formData.append("sme_location", sme_location);
    formData.append("sme_USP", sme_USP);
    formData.append("file", product_list);

    axiosService
      .post("generateFirstCampaign", formData)
      .then((res) =>
      {
        // console.log(res)
        setbackendresponse(res.data.data)
        setLoader(false)
        setshowdashboard(true);
      }
      )

      .catch((err) => {console.log(err)
      setLoader(true)}
      );
    
  }
  


  function callModeApi(e) {
    
    setLoader(true)
    const formData = new FormData();
    formData.append("sme_name", sme_name);
    formData.append("sme_business", sme_business);
    formData.append("sme_location", sme_location);
    formData.append("sme_USP", sme_USP);
    formData.append("file", product_list);
    formData.append("mode", mode);

    axiosService
      .post("runCampaign", formData)
      .then((res) =>
      {
        setshowcampaign(true);
        setLoader(false)
        setbackendgenerateresponse(res.data.data)
        setbackendgenerateresponseshow(false)
      }
        // console.log(res)

        
      )

      .catch((err) => {console.log(err) 
        setLoader(false)});
  }
  function callBlogApi(e) {
    
    const formData = new FormData();
    formData.append("sme_name", sme_name);
    formData.append("sme_business", sme_business);
    formData.append("sme_location", sme_location);
    formData.append("sme_USP", sme_USP);
    formData.append("file", product_list);
 
    setLoader(true)
    axiosService
      .post("createBlog", formData)
      .then((res) =>
      {
        setshowblog(true);
        console.log(res)
        setbackendblogresponse(res.data.data)
        setLoader(false)
      }

    

        
      )

      .catch((err) =>{console.log(err) 
        setLoader(false)});
  }
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 4 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function goBackToSurvey(e){
    window.location.href = "http://localhost:3001/";
    setshowdashboard(false);
  };

  function backGenerateAction(e){
    setbackendgenerateresponse("");
    setshowcampaign(false);
    // setbackendgenerateresponseshow(true)
  };



  return (
    <React.Fragment>
{loader && <Spinner></Spinner>}
<Header title="Nomu-San Support GPT" activeMenu="Game" />

<Grid item container lg={12} sm={12} md={12} style={{padding:'30px',display:'grid'}}>

      {!showdashboard && (
        <div>
          <h1>Survey</h1>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="What is your company name?"
                onChange={(e) => setsme_name(e.target.value)}
                value={sme_name}
                fullWidth
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="What is the nature of your business?"
                onChange={(e) => setsme_business(e.target.value)}
                value={sme_business}
                fullWidth
              />
            </Stack>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Where are you located?"
              onChange={(e) => setsme_location(e.target.value)}
              value={sme_location}
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="What is your USP?"
              onChange={(e) => setPassword(e.target.value)}
              value={sme_USP}
              fullWidth
              sx={{ mb: 4 }}
            />

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <Button variant="contained" color="primary" component="label" sx={{bgcolor:"red"}}>
                Tell us about the Products you sell!
                
                <input
                  type="file"
                  hidden
                  accept=".csv"
                  helperText="Please upload a csv"
                  onChange={(e) => setproduct_list(e.target.files[0])}
                />
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                onClick={(e) => callApi(e)}
              >
                submit
              </Button>
            </Stack>
          </form>
        </div>
      )}

      {showdashboard && (
        <div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                style={{backgroundColor:'lightblue'}}
              >
                <Tab label="Home" {...a11yProps(0)} />
                <Tab label="Generate Campaigns" {...a11yProps(1)} />
                <Tab label="Generate Blogs" {...a11yProps(2)} />
                <Tab label="Personalize" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} >
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{  display: 'flex',fontSize: 20, justifyContent: 'space-around', }}
                    color="text.secondary"
                    gutterBottom
                  >
    
                    <br></br>
                  </Typography>
                  <Typography variant="h3" component="div" sx={{  display: 'flex', justifyContent: 'space-around' }}>
                  {backendresponse && backendresponse["Campaign Title"]}
                  
                  </Typography>
                  <br></br>
                  <Typography variant="h6"  sx={{  display: 'flex', justifyContent: 'center', }} >
                  {backendresponse && backendresponse["Campaign Description"]}
                  </Typography>
                  <br></br>
                  <Typography variant="h5" component="div" sx={{  display: 'flex', justifyContent: 'space-around', color:'red' }}>
                  {backendresponse && backendresponse["Campaign Call to Action"]}
                    <br />
                   
                  </Typography>
                </CardContent>
                <CardActions>
                  
                </CardActions>
              </Card>
              
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
             {!showcampaign &&( 
                <Grid container spacing={2}>
         
                <div >
              <Box sx={{ minWidth: 210,maxWidth:210 }}>
                 <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Mode
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mode}
                    label="Mode"
                    onChange={handleMode}
                  >
                    <MenuItem value={0}>Brand Ambassador</MenuItem>
                    <MenuItem value={1}>New Product Launch</MenuItem>
                    <MenuItem value={2}>Weekend Sale</MenuItem>
                    <MenuItem value={3}>Special Event Campaign</MenuItem>
                    <MenuItem value={4}>Festive Offer Campaign</MenuItem>
                  </Select>
                </FormControl> 
               

                
              </Box>
                
              
              </div>
              
              <div style={{paddingLeft:'10px',paddingTop:'10px'}}>
              <Button variant="outlined" onClick={(e) => callModeApi(e)}>
                Generate
              </Button>
              </div>
              
              </Grid>
                
                 
              )}
              {showcampaign && (
                <div>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{  display: 'flex',fontSize: 20, justifyContent: 'space-around', }}
                    color="text.secondary"
                    gutterBottom
                  >
             
                    <br></br>
                  </Typography>
                  <Typography variant="h3" component="div" sx={{  display: 'flex', justifyContent: 'space-around' }}>
                  {backendgenerateresponse && backendgenerateresponse["Campaign Title"]}
                  
                  </Typography>
                  <br></br>
                  <Typography variant="h6"  sx={{  display: 'flex', justifyContent: 'center', }} >
                  {backendgenerateresponse && backendgenerateresponse["Campaign Description"]}
                  </Typography>
                  <br></br>
                  <Typography variant="h5" component="div" sx={{  display: 'flex', justifyContent: 'space-around', color:'red' }}>
                  {backendgenerateresponse && backendgenerateresponse["Campaign Call to Action"]}
                    <br />
                   
                  </Typography>
                </CardContent>
                <CardActions>
                  
                </CardActions>
              </Card>
              <div style={{marginTop:'10px',display:'table'}}>
              <Button
              variant="outlined"
              color="secondary"
              type="submit"
              onClick={(e) => backGenerateAction()}
            >
              Back
            </Button>
            </div>
            </div>
            
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            {!showblog &&( 
                <Grid container spacing={2}>
                    <div>
                  
                    <Button variant="outlined" onClick={(e) => callBlogApi(e)}>
                    Generate
                  </Button>

                    
             
                    
                  
                  </div>
                  </Grid>
                
                 
              )}
              {showblog && (
                <div>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    sx={{  display: 'flex',fontSize: 20, justifyContent: 'space-around', }}
                    color="text.secondary"
                    gutterBottom
                  >
                   
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ justifyContent: 'space-around' }}>
                  {backendblogresponse && backendblogresponse.split("</br>").map((row,index)=>
                  (
                    <p>{row}</p>
                  )
                  )}
                
                  
                  </Typography>
                  <br></br>
                 
                </CardContent>
                <CardActions>
                  
                </CardActions>
              </Card>
              <div style={{marginTop:'10px',display:'table'}}>
              <Button
              variant="outlined"
              color="secondary"
              type="submit"
              onClick={(e) => setshowblog(false)}
            >
              Back
            </Button>
            </div>
            </div>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <PersonalizedEmailCampaign
                sme_name={sme_name}
                sme_business={sme_business}
                sme_location={sme_location}
                sme_USP={sme_USP}
                />

            </CustomTabPanel>
          </Box>
          
            <div style={{display:'flex',paddingLeft:'18px'}}>
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            onClick={(e) => goBackToSurvey()}
          >
            Go Back to the Survey
          </Button>
          </div>
        </div>
      )}
      </Grid>
    </React.Fragment>
  );
};

export default RegisterForm;
