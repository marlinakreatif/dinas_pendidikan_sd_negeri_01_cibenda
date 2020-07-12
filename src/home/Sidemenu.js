import React from 'react';
import { Accordion, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Sidemenu() {
    return (
        <Accordion>
            <Card bg="primary-custom" className="sidebar-menu">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    <img src="/apple-icon.png" alt="icon" className="sidebar-icon" />
                    <span className="sidebar-title">Pengguna</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="card-body-padd">
                        <ul>
                            <li>
                                <NavLink replace={true} to={`/users/super_admin`}>Super Admin</NavLink>
                            </li>

                            <li>
                                <NavLink replace={true} to={`/users/student`}>Student</NavLink>
                            </li>
                        </ul>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card bg="primary-custom" className="sidebar-menu">
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    <img src="/apple-icon.png" alt="icon" className="sidebar-icon" />
                    <span className="sidebar-title">Pengguna</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body className="card-body-padd">
                        <ul>
                            <li>
                                <NavLink replace={true} to={`/users/super_admin`}>Super Admin</NavLink>
                            </li>

                            <li>
                                <NavLink replace={true} to={`/users/student`}>Student</NavLink>
                            </li>
                        </ul>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}
