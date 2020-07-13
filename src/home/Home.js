import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import "./home.css"

import Dashboard from './Dashboard';
import { UserList, UserCreateOrUpdate } from './../module-user';
import { StudentList, StudentCreateOrUpdate } from './../module-student';
import { EventPage } from './../module-school-management';
import * as ROUTES from './../constants/routes';
import Sidemenu from './Sidemenu';

export default function Home(props) {
    return (
        <Container className="dashboard">
            <Navbar id="navbar" bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="#dashboard">
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
            <Row id="content" >
                <Col md={12} >
                    <div className="content-body">
                        <Route path={ROUTES.DASHBOARD} exact component={Dashboard} />
                        <Route path={ROUTES.USERS} component={UserList} exact />
                        <Route
                            path={ROUTES.USER_COU}
                            render={({ match: { url } }) => (
                                <>
                                    <Route path={`${url}/`} component={UserCreateOrUpdate} exact />
                                    <Route path={`${url}/:id`} component={UserCreateOrUpdate} />
                                </>
                            )}
                        />
                        <Route path={ROUTES.STUDENTS} component={StudentList} exact />
                        <Route
                            path={ROUTES.STUDENT_COU}
                            render={({ match: { url } }) => (
                                <>
                                    <Route path={`${url}/`} component={StudentCreateOrUpdate} exact />
                                    <Route path={`${url}/:id`} component={StudentCreateOrUpdate} />
                                </>
                            )}
                        />
                        {/* routes manajemen sekolaj */}
                        <Route
                            path={`/dashboard/manajemen-sekolah`}
                            render={({ match: { url } }) => (
                                <>
                                    <Route path={`${url}/berita/`} component={EventPage} />

                                </>
                            )}
                        />
                    </div>
                </Col>
            </Row>


        </Container>
    )
}
