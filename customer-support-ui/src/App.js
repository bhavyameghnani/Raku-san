import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import Workspace from "./Components/Workspace/Workspace";
import Affirmations from "./Components/Workspace/Affirmations";
import RegisterForm from './Components/Workspace/Form'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Workspace} />
          <Route exact path="/affirmations" component={Affirmations} />
          <Route exact path="/game" component={RegisterForm} />

        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
