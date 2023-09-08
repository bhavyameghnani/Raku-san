import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useSpeechSynthesis } from "react-speech-kit";
import toast, { Toaster } from "react-hot-toast";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import AffirmationsTable from "./AffirmationsTable";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://i.pinimg.com/originals/2b/91/91/2b9191c0750915300106a457fddec474.gif)",

    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    //margin: theme.spacing(8, 4),
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
    //margin: theme.spacing(3, 0, 2),
  },
  card: {
    backgroundColor: "#e2e1fc",
  },
}));

const Affirmations = () => {
  const classes = useStyles();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [notes, setNotes] = React.useState([]);
  const [points, setPoints] = React.useState(0);

  const [value, setValue] = useState("");
  const { speak } = useSpeechSynthesis();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {});

  useEffect(() => {
    notifyWelcome();
  }, []);

  function stopCapture() {
    SpeechRecognition.stopListening();
    console.log(transcript);
    var matchedCategories = positiveAffirmations.filter(
      (i) => transcript.indexOf(i.name) >= 0
    );
    console.log(matchedCategories);
    if (matchedCategories.length > 0)
      setPoints(points + parseInt(matchedCategories[0].points));
    speak({
      text: "Positive Affirmation Note has been made for " + transcript,
      rate: 0.9,
    });
    setNotes((prevArray) => [...prevArray, transcript]);

    notifyAddNote();
  }

  const notifyWelcome = () => {
    console.log("here");
    toast.success("Skribble welcomes you !");
  };

  const notifyAddNote = () => {
    toast.success("Great! Your Note is submitted.", {
      icon: "🔥",
    });
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={4}
            component={Paper}
            elevation={5}
            className={classes.image}
          />
          <Grid item xs={12} sm={4} md={8} component={Paper} elevation={5}>
            <div className={classes.paper}>
              <img
                alt="mind_note"
                width="60%"
                height="40%"
                src="https://www.pocketprep.com/wp-content/uploads/2021/03/Brain-dumps-and-other-test-day-hacks_post-image-full.jpg"
              />
              <div>
                <Button
                  // type="submit"
                  // fullWidth
                  variant="outlined"
                  color="secondary"
                  className={classes.submit}
                  onClick={SpeechRecognition.startListening}
                >
                  Capture
                </Button>
                &nbsp;
                <Button
                  // type="submit"
                  // fullWidth
                  variant="outlined"
                  color="secondary"
                  className={classes.submit}
                  onClick={stopCapture}
                >
                  Stop
                </Button>
                &nbsp;
                <Button
                  // type="submit"
                  // fullWidth
                  variant="outlined"
                  color="secondary"
                  className={classes.submit}
                  onClick={resetTranscript}
                >
                  Reset
                </Button>
                <p>Total Points for the day: {points}</p>
                <h5>{transcript}</h5>
              </div>
              <Container maxWidth="lg">
                <Grid container spacing={4}>
                  {notes.map((note) => (
                    <Grid item xs={12} sm={6} md={6}>
                      <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                          <Typography
                            gutterBottom
                            variant="body1"
                            component="h2"
                          >
                            {note}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </div>
          </Grid>
          <Grid item xs={12}>
            <AffirmationsTable />
          </Grid>
        </Grid>
      </Container>
      <br />
    </React.Fragment>
  );
};
export default Affirmations;

const positiveAffirmations = [
  { name: "I am motivated", points: 150 },
  { name: "I have clarity about my goals", points: 150 },
  { name: "I have faith in my abilities", points: 150 },
  { name: "I prioritise my goals", points: 150 },
  { name: "I achieve my goals easily", points: 150 },
  { name: "I stay focused on my vision", points: 150 },
];
