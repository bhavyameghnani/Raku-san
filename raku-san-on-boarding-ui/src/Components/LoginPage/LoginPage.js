import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ServiceCall from "../../Service/ServiceCall";
import Steps from "../Steps/Steps";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Link from "@material-ui/core/Link";
import Spinner from "../../Components/Spinner";
import axiosService from "../../Service/api";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    maxHeight:'90%',
  },
  image: {
    backgroundImage:
      "url(https://miro.medium.com/max/1110/1*F2-ZQDltDoXDI6MhMlH5aQ.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginTop: -10,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log("active se",activeStep)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const steps = [
    {
      label: "Account Information",
      description: "Upload your vital documents",
      url: "#/vault",
    },
    {
      label: "Personal Information",
      description: `Generate your face id if not done already.`,
      url: "#/vault",
    },
  
    {
      label: "Billing Information",
      description: `View all instructions for your travel`,
      url: "#/vault",
    },
  ];
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  const [ideaPrompt, setIdeaPrompt] = React.useState("");

    const [chatgpthistory,setchatgpthistory]=React.useState([])

    const [loader, setLoader] = React.useState(false);
    const [userquery,setuserquery]=React.useState('')

    function callapi(event)
  {
    setLoader(true)
    let old_data=[...chatgpthistory]
    old_data.push({'response':ideaPrompt})
    console.log(" old Data",old_data)
    setchatgpthistory(old_data)

    axiosService.get("generateIdeaDetailsOnboard?prompt="+ideaPrompt).then(
          response => 
          {

           
                    setLoader(false)
                    
                    old_data.push({'response':response.data.answer})
                    setchatgpthistory(old_data)
            
              setIdeaPrompt('')
                      }
          
          )
          .catch(error => 
              
              {
                console.log(error)
                  setLoader(false)
                  let old_data_new=[...chatgpthistory]
                  console.log("APi old Data",old_data_new)
                  old_data_new.push({'response':"Something Went Wrong. Please try again after sometime"})
                  setchatgpthistory(old_data_new)
              }
          )


  }



  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit() {
    const userLoginDetails = {
      Email: email,
      Password: password,
    };

    

    //temporary login
    window.open("#/home", "_self");

    ServiceCall.userSignIn(userLoginDetails).then((response) => {
      if (response.data === "False") {
        alert("User is not regitered, Please signup before");
        window.open("#/home", "_self");
      } else {
        // console.log(response.data)
        localStorage.setItem("user_key", response.name);
        window.open("#/home", "_self");
      }
    });
  }

  return (
    <Grid container component="main" className={classes.root}>
            {loader && <Spinner></Spinner>}

      <CssBaseline />
      <Grid item xs={12} sm={4} md={7} component={Paper} elevation={6} square style={{paddingTop:'7%'}}>
      <img  style={{width:'30%'}}src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Rakuten_Global_Brand_Logo.svg/2560px-Rakuten_Global_Brand_Logo.svg.png"></img>

        <div className={classes.paper}>
          
         {activeStep==0 && <Grid item container lg={12} sm={12} md={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address/UserID/Password"
            name="email"
            autoComplete="email"
            autoFocus
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Passowrd"
            type="password"
            id="password"
            autoComplete="current-password"
            
          />
         

         <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Secret Key"
            name="seckret key"
            autoFocus
          />
      
      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mobile ID"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          
          </Grid>} 
          {activeStep==1 && <Grid item container lg={12} sm={12} md={12}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Full Name"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Date of Birth"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Gender"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Postal Code"
            type="password"
            id="password"
            autoComplete="current-password"
          />
         
           
           
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Mobile Number"
            name="email"
            autoComplete="email"
            autoFocus
          />
</Grid>}
          {activeStep==2 && <Grid item container lg={12} sm={12} md={12}>


          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Credit Card Name"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Credit Card Information"
            type="password"
            id="password"
            autoComplete="current-password"
          />

            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Billing Address"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          
          </Grid>}
          
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            <b>Log In</b>
          </Button> */}
        </div>
      </Grid>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
        <div className={classes.paper} style={{marginTop:'5px'}}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Customer Onboarding with Raku-san
          </Typography>

          <Typography component="h6" variant="h6" style={{padding:'10px',fontSize:'14px',color:'red'}}>
          🪙 Collect points after completion of each steps
          </Typography>
          <br />
          <Box sx={{ maxWidth: 600 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 9 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {/* <Typography>{step.description}</Typography>
              <br />

              <Link color="inherit" noWrap variant="body2" href={step.url}>
                Click here
              </Link> */}
              <Box sx={{ mb: 2 }}>
                <div>
                  <br />
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>


      
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
    <Typography component="h1" variant="h5" style={{padding:'10px',fontSize:'14px',color:'grey',fontWeight:'bold'}}>
    👨‍💻 Raku-san as your Privacy Guardian
          </Typography>

    <Grid item container lg={12} sm={12} md={12} className="shadow" style={{paddingTop:'10px',marginBottom:'20px',minHeight:'300px',maxHeight:'300px',border:'2px solid lightgrey',overflow:'auto'}}>


                    {chatgpthistory && chatgpthistory.map((row,index)=>
                    
                    (
                      <Grid item container lg={12} sm={12} md={12}>

                        {index%2==0 && <Grid lg={12} md={12} sm={12} style={{textAlign:'right',marginLeft:'20%',padding:'10px 10px 0px 10px'}}>

                          
                          
                       <p style={{fontSize:'20px'}}> 👤</p>  <p style={{border:'1px solid lightgrey',padding:'5px',borderRadius:'10px',backgroundColor:'lightgrey'}}>{row.response}</p></Grid>}
                        {index%2!=0 && <Grid lg={12} md={12} sm={12} style={{textAlign:'left',marginRight:'20%',padding:'0px 10px 10px 10px',marginRight:'100px'}}>
                          
                        <p style={{fontSize:'20px'}}>   👨‍💻 </p> <p style={{border:'1px solid lightgrey',padding:'5px',borderRadius:'10px',backgroundColor:'lightblue',
                      display: 'grid' ,whiteSpace: 'pre-wrap',wordWrap:'break-word'
                      }}>{row.response}</p>
                          </Grid>}



                        </Grid>
                    )
                    )}

                    
    
    </Grid>

    <Grid item xs={12} sm={4} md={7} component={Paper} elevation={6} square style={{paddingTop:'1%'}}></Grid>
    <TextField s
              id="outlined-multiline-static"
              label="Enter your Query"
              multiline
              rows={2}
              fullWidth
              onChange={(e)=>setIdeaPrompt(e.target.value)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                    callapi(event)
                }
              }}
              value={ideaPrompt}
              variant="outlined"
            />
        </div>
      </Grid>
    </Grid>
  );
}
