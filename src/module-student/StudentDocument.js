import React, { Component } from "react";
import { withFirebase } from "../firebase-config";
import { Form, Row, Col } from "react-bootstrap";
import { TableCaption } from "../utilities/table";

class StudentDocument extends Component {
  render() {
    return (
      <div className="content-layout">
        <Form>
          <TableCaption
            icon="fa-users"
            title="Kelengkapan Dokumen Siswa"
          />
          <hr />
          <Form.Group as={Row} controlId="kartu_keluarga">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Kartu Keluarga
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="file"
                placeholder="unggah kartu keluarga"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="kartu_keluarga">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              KTP Orang Tua
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="file"
                placeholder="kartu_keluarga"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="akta">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Akta Kelahiran
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="file"
                placeholder="unggah akta kelahiran"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="akta">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Rapor Siswa
            </Form.Label>
            <Col sm={5}>
              <Form.Control size="sm" type="file" placeholder="unggah rapor" />
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default withFirebase(StudentDocument);
