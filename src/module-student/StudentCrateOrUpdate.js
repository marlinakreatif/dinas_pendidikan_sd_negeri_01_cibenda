import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default class StudentCrateOrUpdate extends Component {
  render() {
    return (
      <div className="content-layout">
        <Form>
          <Row>
            <Col sm={{ span: 10, offset: 1 }}>
              <h4>
                <i className="fa fa-users"></i> <b>Data Siswa</b>
              </h4>
            </Col>
          </Row>
          <hr />
          <Form.Group as={Row} controlId="nisn">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              NISN
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Nomor Induk Siswa Nasional"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="nama_siswa">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Nama Siswa
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Nama siswa/siswi"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="nama_ibu">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Nama Ibu
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Nama ibu kandung siswa"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="alamat">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Alamat
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Alamat tempat tinggal"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="tahun_masuk">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Tahun Masuk
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                maxLength="4"
                minLength="4"
                type="text"
                placeholder="Tahun Masuk"
              />
            </Col>
          </Form.Group>
          <hr />

          <Form.Group as={Row} controlId="kartu_keluarga">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Kartu Keluarga
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                size="sm"
                maxLength="4"
                minLength="4"
                type="file"
                placeholder="unggah kartu keluarga"
              />
            </Col>
            <Form.Label column="sm" sm={{ span: 2 }}>
              KTP Orang Tua
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                size="sm"
                maxLength="4"
                minLength="4"
                type="file"
                placeholder="unggah KTP orang tua"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="akta">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Akta Kelahiran
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                size="sm"
                maxLength="4"
                minLength="4"
                type="file"
                placeholder="unggah akta kelahiran"
              />
            </Col>

            <Form.Label column="sm" sm={{ span: 2 }}>
              Rapor Siswa
            </Form.Label>
            <Col sm={3}>
              <Form.Control
                size="sm"
                maxLength="4"
                minLength="4"
                type="file"
                placeholder="unggah rapor"
              />
            </Col>
          </Form.Group>
          <hr />

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 1 }}>
              <Button type="submit">Simpan</Button>
              <Button className="m-1" type="button" variant="secondary">
                Kembali
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
