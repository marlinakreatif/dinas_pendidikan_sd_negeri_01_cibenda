import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import EventPage from "./module-school/EventPage";
import { ROUTES } from "./constants";

function App() {
  return (
    <HashRouter>
      <Route path={ROUTES.SIGNIN} exact component={Login} />
      <Route path={ROUTES.BASE_ADMIN} component={Home} />
      <Route path={"/"} component={EventPage} />
    </HashRouter>
  );
}

export default App;
