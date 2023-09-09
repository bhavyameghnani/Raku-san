import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import Affirmations from "./Components/Affirmations/Affirmations";
import Analytics from "./Components/LoginPage/Analytics";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/affirmations" component={Affirmations} />
          <Route exact path="/analytics" component={Analytics} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;