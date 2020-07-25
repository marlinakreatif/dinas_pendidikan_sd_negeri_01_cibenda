import React, { Component } from "react";
import { withFirebase } from "../firebase-config";

class StudentDocument extends Component {
  render() {
    return <div></div>;
  }
}

export default withFirebase(StudentDocument);
