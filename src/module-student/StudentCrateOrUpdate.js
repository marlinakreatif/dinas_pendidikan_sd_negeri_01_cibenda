import React, { Component } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Student } from "../model";
import { OnChangeInput, YearListGenerator } from "../utilities/functional";
import { withFirebase } from "../firebase-config";
import { STUDENTS } from "../constants/routes";

class StudentCrateOrUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: new Student(912093012930, "Margono", "Banyumas", "Kaminem"),
      years: YearListGenerator(),
      validated: false,
    };
  }

  onChange = (event) => {
    this.setState({
      student: OnChangeInput(this.state.student, event),
    });
  };

  onSubmitForm = (event) => {
    let formData = event.target;
    let { history } = this.props;
    event.preventDefault();
    if (!formData.checkValidity() === false) {
      const { student } = this.state;
      this.props.firebase
        .students()
        .add({ ...student })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          history.push(STUDENTS);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    } else {
      this.setState({ validated: true });
    }
  };

  render() {
    const { student, years, validated } = this.state;
    return (
      <div className="content-layout">
        <Form noValidate validated={validated} onSubmit={this.onSubmitForm}>
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
              NISN*
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="text"
                name="nisn"
                required
                placeholder="Nomor Induk Siswa Nasional"
                onChange={this.onChange}
                defaultValue={student.nisn}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="nama_siswa">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Nama Siswa*
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="text"
                name="nama"
                required
                placeholder="Nama siswa/siswi"
                onChange={this.onChange}
                defaultValue={student.nama}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="nama_ibu">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Nama Ibu*
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="text"
                name="nama_ibu"
                required
                placeholder="Nama ibu kandung siswa"
                onChange={this.onChange}
                defaultValue={student.nama_ibu}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="tempat_lahir">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Tempat Lahir*
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="text"
                name="tempat_lahir"
                required
                placeholder="Tempat Kelahiran"
                onChange={this.onChange}
                defaultValue={student.tempat_lahir}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="tanggal_lahir">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Tanggal Lahir*
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="text"
                name="tanggal_lahir"
                required
                placeholder="Tempat Kelahiran"
                onChange={this.onChange}
                defaultValue={student.tanggal_lahir}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="alamat">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Alamat*
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                size="sm"
                type="text"
                name="alamat"
                required
                placeholder="Alamat tempat tinggal"
                onChange={this.onChange}
                defaultValue={student.alamat}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="tahun_masuk">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Tahun Masuk*
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                defaultValue={student.tahun_masuk}
                as="select"
                onChange={this.onChange}
                name="tahun_masuk"
              >
                <option value="" disabled>
                  pilih tahun masuk
                </option>
                {years.map((data, index) => {
                  return (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  );
                })}
              </Form.Control>
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
              <Button
                className="m-1"
                type="button"
                variant="secondary"
                onClick={() => this.props.history.push(STUDENTS)}
              >
                Kembali
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default withFirebase(StudentCrateOrUpdate);
