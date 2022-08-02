import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { Home } from "./components/Home";
import  VideoGameCreate  from "./components/VideoCreate";
import Details from "./components/Details";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home}/>
          <Route exact path="/createdvideogame" component={VideoGameCreate}/>
          <Route exact path={"/detail/:id"} component= {Details}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
