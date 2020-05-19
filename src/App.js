import React,{lazy} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

// import "../assets/styles/_fonts.scss";
import "./App.css";

const List = lazy(()=>import('./components/list/List'))
const User = lazy(()=>import('./components/user/User'))

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/:username" component={User} />
      </Switch>
    </Router>
  );
}

export default App;
