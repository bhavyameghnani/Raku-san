import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;