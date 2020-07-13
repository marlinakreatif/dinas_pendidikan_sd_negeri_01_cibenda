import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import "./home.css"

import Dashboard from './Dashboard';
import { UserList, UserCreateOrUpdate } from './../module-user';
import { StudentList, StudentCreateOrUpdate } from './../module-student';
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
                        <Route path='/dashboard/' exact component={Dashboard} />
                        {/* routes manajemen pengguna */}
                        <Route
                            path={`/dashboard/user`}
                            render={({ match: { url } }) => (
                                <>
                                    <Route path={`${url}/`} component={UserList} exact />
                                    <Route
                                        path={`${url}/create-or-update/:user_id`}
                                        component={UserCreateOrUpdate}
                                    />
                                </>
                            )}
                        />
                        {/* routes manajemen siswa */}
                        <Route
                            path={`/dashboard/student`}
                            render={({ match: { url } }) => (
                                <>
                                    <Route path={`${url}/`} component={StudentList} exact />
                                    <Route
                                        path={`${url}/create-or-update/:user_id`}
                                        component={StudentCreateOrUpdate}
                                    />
                                </>
                            )}
                        />
                    </div>
                </Col>
            </Row>


        </Container>
    )
}
