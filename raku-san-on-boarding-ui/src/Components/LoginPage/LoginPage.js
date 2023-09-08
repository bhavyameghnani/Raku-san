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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(event) {
    setEmail(event.target.value);
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
      <CssBaseline />
      <Grid item xs={12} sm={4} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
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
            onChange={handleEmail}
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
            onChange={handlePassword}
          />
         
      
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
            onChange={handleEmail}
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
            onChange={handlePassword}
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
            onChange={handleEmail}
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
            onChange={handlePassword}
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
            onChange={handlePassword}
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
            onChange={handleEmail}
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
            onChange={handlePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            <b>Log In</b>
          </Button>
        </div>
      </Grid>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Custome On-board with Raku-san
          </Typography>
          <br />
          <Steps />
        </div>
      </Grid>
    </Grid>
  );
}
