import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import Workspace from "./Components/Workspace/Workspace";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Workspace} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
