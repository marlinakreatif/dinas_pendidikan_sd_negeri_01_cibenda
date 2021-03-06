import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./fonts/font-type-1.ttf"
import "./fonts/font-type-2.ttf"
import "./fonts/font-type-3.TTF"
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./firebase-config";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
