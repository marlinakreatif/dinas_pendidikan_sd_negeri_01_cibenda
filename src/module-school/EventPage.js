import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../constants/routes";
export default class EventPage extends Component {
  render() {
    return (
      <div>
        This is Event Page
        <Link to={ROUTES.DASHBOARD}>GO To Dashboard</Link>
      </div>
    );
  }
}
