import React from "react";
import { Route } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./home.css";

import Dashboard from "./Dashboard";
import { UserList, UserCreateOrUpdate } from "./../module-user";
import {
  StudentList,
  StudentCOU,
  StudentNISN,
  StudentImport,
  StudentDocument,
  StudentCertificate,
} from "./../module-student";
import { EventPage } from "../module-school";
import { ROUTES } from "./../constants";
import Sidemenu from "./Sidemenu";

export default function Home(props) {
  return (
    <div>
      <Navbar id="navbar" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href={ROUTES.DASHBOARD}>
          <img
            src="/kbb.png"
            width="auto"
            height="40"
            className="d-inline-block align-top"
            alt="kbb logo"
          />
          <div id="brand">
            <div id="brand-dinas">Dinas Pendidikan</div>
            <div id="brand-sekolah">SD NEGERI 01 CIBENDA</div>
          </div>
        </Navbar.Brand>
      </Navbar>
      <Sidemenu />
      <div id="content">
        <Route path={ROUTES.DASHBOARD} exact component={Dashboard} />
        <Route path={ROUTES.USERS} component={UserList} exact />
        <Route path={ROUTES.USER_CREATE} component={UserCreateOrUpdate} />
        <Route
          path={`${ROUTES.USER_UPDATE}/:id`}
          component={UserCreateOrUpdate}
        />
        <Route path={ROUTES.STUDENTS} component={StudentList} exact />
        <Route path={ROUTES.STUDENT_CREATE} component={StudentCOU} />
        <Route path={`${ROUTES.STUDENT_UPDATE}/:id`} component={StudentCOU} />
        <Route
          path={`${ROUTES.STUDENT_DOCUMENT}/:id`}
          component={StudentDocument}
        />
        <Route path={ROUTES.STUDENT_NISN} component={StudentNISN} exact />
        <Route path={ROUTES.STUDENT_IMPORT} component={StudentImport} exact />
        <Route
          path={ROUTES.STUDENT_DOCUMENT}
          component={StudentDocument}
          exact
        />
        <Route
          path={ROUTES.STUDENT_CERTIFICATE}
          component={StudentCertificate}
          exact
        />

        <Route path={ROUTES.NEWS} component={EventPage} exact />
        <Route path={ROUTES.NEWS_COU} component={EventPage} exact />
      </div>
    </div>
  );
}
