import React, { Component } from "react";
import { withFirebase } from "../firebase-config";
import { Form, Row, Col, Button } from "react-bootstrap";
import { TableCaption } from "../utilities/table";
import { STUDENTS } from "../constants/routes";
import { Student } from "../model";
import { FileInput, Loading } from "../components";

class StudentDocument extends Component {
  constructor(props) {
    super(props);
    this.state = { student: new Student(), isLoading: true, uuid: null };
  }
  componentDidMount() {
    const { firebase } = this.props;
    const { id } = this.props.match.params;
    firebase
      .student(id)
      .get()
      .then((doc) => {
        let student = doc.data();
        student.tanggal_lahir = student.tanggal_lahir.toDate();
        this.setState({
          student,
          isLoading: false,
          uuid: doc.id,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }
  render() {
    const { student, isLoading, uuid } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className="content-layout">
        <Form>
          <TableCaption icon="fa-users" title="Kelengkapan Dokumen Siswa" />
          <hr />
          <Row>
            <Col sm={{ span: 2, offset: 1 }}>Nama siswa</Col>
            <Col sm={4}>{": " + student.nama}</Col>
            <Col sm={2}>No. NISN</Col>
            <Col sm={3}>{": " + student.nisn}</Col>
          </Row>
          <Row>
            <Col sm={{ span: 2, offset: 1 }}>Nama Ibu</Col>
            <Col sm={4}>{": " + student.nama_ibu}</Col>
            <Col sm={2}>Alamat</Col>
            <Col sm={3}>{": " + student.alamat}</Col>
          </Row>
          <Row>
            <Col sm={{ span: 2, offset: 1 }}>Tempat Lahi</Col>
            <Col sm={4}>{": " + student.tempat_lahir}</Col>
            <Col sm={2}>Tanggal Lahir</Col>
            <Col sm={3}>
              {": " + student.tanggal_lahir.toLocaleDateString()}
            </Col>
          </Row>
          <Row>
            <Col sm={{ span: 2, offset: 1 }}>Tahun Masuk</Col>
            <Col sm={4}>{": " + student.tahun_masuk}</Col>
          </Row>
          <hr />
          <Form.Group as={Row} controlId="kartu_keluarga">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Kartu Keluarga
            </Form.Label>
            <Col sm={8}>
              <FileInput
                fileType="url_kk"
                defaultValue={student.url_kk}
                uuid={uuid}
                setBack={(value) =>
                  this.setState({ student: { ...student, url_kk: value } })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="kartu_keluarga">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              KTP Orang Tua
            </Form.Label>
            <Col sm={8}>
              <FileInput
                fileType="url_ktp"
                defaultValue={student.url_ktp}
                uuid={uuid}
                setBack={(value) =>
                  this.setState({ student: { ...student, url_ktp: value } })
                }
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="akta">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Akta Kelahiran
            </Form.Label>
            <Col sm={8}>
              <FileInput
                fileType="url_akte"
                defaultValue={student.url_akte}
                uuid={uuid}
                setBack={(value) =>
                  this.setState({ student: { ...student, url_akte: value } })
                }
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="akta">
            <Form.Label column="sm" sm={{ span: 2, offset: 1 }}>
              Rapor Siswa
            </Form.Label>
            <Col sm={8}>
              <FileInput
                fileType="url_rapor"
                defaultValue={student.url_rapor}
                uuid={uuid}
                setBack={(value) => {
                  this.setState({ student: { ...student, url_rapor: value } });
                }}
              />
            </Col>
          </Form.Group>
        </Form>
        <hr />
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 1 }}>
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
      </div>
    );
  }
}

export default withFirebase(StudentDocument);
