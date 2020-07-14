import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import EventPage from "./module-school-management/EventPage";
import * as ROUTES from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      {/* Main Routes */}
      <Route path={ROUTES.SIGNIN} exact component={Login} />
      <Route path={ROUTES.BASE_ADMIN} component={Home} />
      <Route path={"/"} component={EventPage} />
    </BrowserRouter>
  );
}

export default App;
