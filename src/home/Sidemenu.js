import React from 'react';
import { Accordion, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Sidemenu() {
    return (
        <div className="sidemenu-container">


            <Accordion>
                <Card bg="primary-custom" className="sidebar-menu">
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                        <span className="sidebar-title">Pengguna</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="sub-menu">
                            <ul>
                                <li>
                                    <NavLink exact replace={true} activeClassName="sub-menu-active" to={`/dashboard/user`}>
                                        <i className="fa fa-dot-circle-o" aria-hidden="true"></i> Daftar Pengguna
                                </NavLink>
                                </li>

                                <li>
                                    <NavLink exact replace={true} activeClassName="sub-menu-active" to={`/dashboard/user/create-or-update/-`}>
                                        <i className="fa fa-dot-circle-o" aria-hidden="true"></i> Pengguna Baru
                                </NavLink>
                                </li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card bg="primary-custom" className="sidebar-menu">
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        <i className="fa fa-users fa-lg" aria-hidden="true"></i>
                        <span className="sidebar-title">Manajemen Siswa</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body className="sub-menu">
                            <ul>
                                <li>
                                    <NavLink exact replace={true} activeClassName="sub-menu-active" to={`/dashboard/student`}>
                                        <i className="fa fa-dot-circle-o" aria-hidden="true"></i> Daftar Siswa
                                </NavLink>
                                </li>

                                <li>
                                    <NavLink exact replace={true} activeClassName="sub-menu-active" to={`/dashboard/student/create-or-update/-`}>
                                        <i className="fa fa-dot-circle-o" aria-hidden="true"></i> Siswa Baru
                                </NavLink>
                                </li>

                                <li>
                                    <NavLink exact replace={true} activeClassName="sub-menu-active" to={`/dashboard/student/nisn-card/`}>
                                        <i className="fa fa-dot-circle-o" aria-hidden="true"></i> Kartu NISN
                                </NavLink>
                                </li>

                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card bg="primary-custom" className="sidebar-menu">
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        <i className="fa fa-hdd-o fa-lg" aria-hidden="true"></i>
                        <span className="sidebar-title">Manajemen Sekolah</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body className="sub-menu">
                            <ul>
                                <li>
                                    <NavLink exact replace={true} activeClassName="sub-menu-active" to={`/users/super_admin`}>
                                        <i className="fa fa-dot-circle-o" aria-hidden="true"></i> Berita
                                </NavLink>
                                </li>
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}
