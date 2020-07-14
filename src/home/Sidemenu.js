import React from "react";
import { Accordion, Card } from "react-bootstrap";
import * as ROUTES from "./../constants/routes";
import { SubMenuItem } from "./SidemenuComponent";

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
                  <SubMenuItem
                    icon="fa-dot-circle-o"
                    size="fa-lg"
                    to={ROUTES.USERS}
                    text="Daftar Pengguna"
                  />
                </li>

                <li>
                  <SubMenuItem
                    icon="fa-dot-circle-o"
                    size="fa-lg"
                    to={ROUTES.USER_COU}
                    text="Pengguna Baru"
                  />
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
                  <SubMenuItem
                    icon="fa-dot-circle-o"
                    size="fa-lg"
                    to={ROUTES.STUDENTS}
                    text="Daftar Siswa"
                  />
                </li>

                <li>
                  <SubMenuItem
                    icon="fa-dot-circle-o"
                    size="fa-lg"
                    to={ROUTES.STUDENT_COU}
                    text="Siswa Baru"
                  />
                </li>

                <li>
                  <SubMenuItem
                    icon="fa-dot-circle-o"
                    size="fa-lg"
                    to={ROUTES.STUDENT_NISN}
                    text="Kartu NISN"
                  />
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
                  <SubMenuItem
                    icon="fa-dot-circle-o"
                    size="fa-lg"
                    to={ROUTES.NEWS}
                    text="Berita"
                  />
                </li>
                <li>
                  <SubMenuItem
                    icon="fa-dot-circle-o"
                    size="fa-lg"
                    to={ROUTES.NEWS_COU}
                    text="Berita Baru"
                  />
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
