import React, { Component } from "react";
import { CertificateItem } from "../components";
import { CERTIFICATE_TEMPLATE } from "../constants";
import { Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import { MCertificate } from "../model";
import ReactDatePicker from "react-datepicker";

const GeneralConfig = ({
  show,
  onClose,
  generalConfig,
  onChange,
  onSubmit,
}) => {
  const dataChange = (date) => {
    onChange({
      target: {
        name: "tanggal",
        value: date,
      },
    });
  };
  const { page, certificate } = generalConfig;
  return (
    <Modal
      show={show}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fa fa-cogs"></i>
          {" Pengaturan Umum"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="input-">
                <Form.Label>Jumlah Halaman</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  name="page"
                  placeholder="Jumlah Halaman"
                  onChange={onChange}
                  defaultValue={page}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="input-tanggal">
                <Form.Label> Tanggal dibuat </Form.Label>
                <ReactDatePicker
                  selected={certificate.tanggal}
                  onChange={dataChange}
                  isClearable
                  placeholderText="MM/DD/YYYY"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="input-">
                <Form.Label>Nama Pemberi</Form.Label>
                <Form.Control
                  type="text"
                  name="pemberi"
                  placeholder="Nama pemberi piagam"
                  onChange={onChange}
                  defaultValue={certificate.pemberi}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="input-">
                <Form.Label>Jabatan Pemberi</Form.Label>
                <Form.Control
                  type="text"
                  name="jabatan_pemberi"
                  placeholder="jabatan pemberi piagam"
                  onChange={onChange}
                  defaultValue={certificate.jabatan_pemberi}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="input-">
                <Form.Label>NIP Pemberi</Form.Label>
                <Form.Control
                  type="text"
                  name="nip"
                  placeholder="nip pemberi piagam"
                  onChange={onChange}
                  defaultValue={certificate.nip_pemberi}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="input-tempat">
                <Form.Label>Tempat dibuat</Form.Label>
                <Form.Control
                  type="text"
                  name="tempat"
                  placeholder="nama tempat"
                  onChange={onChange}
                  defaultValue={certificate.tempat}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="input-penghargaan">
                <Form.Label>Deskripsi Penghargaan</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  name="deskripsi"
                  rows={5}
                  placeholder="Nama penghargaan piagam"
                  onChange={onChange}
                  defaultValue={certificate.deskripsi}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "flex-start" }}>
        <Button onClick={onSubmit} type="button">
          Simpan
        </Button>
        <sub>{" *Tekan simpan untuk melihat perubahan"}</sub>
      </Modal.Footer>
    </Modal>
  );
};

const NameConfig = ({ show, onClose, penerima, onChange }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fa fa-cog"></i>
          {" Ubah Nama Penerima"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Control
              type="text"
              name="penerima"
              placeholder="Nama penerima piagam"
              onChange={onChange}
              defaultValue={penerima}
            />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default class StudentCertificate extends Component {
  state = {
    theme: CERTIFICATE_TEMPLATE[0],
    certificates: [],
    generalConfig: {
      page: 1,
      certificate: new MCertificate(
        null,
        "Fulan ...",
        null,
        "0123456789",
        "Kepala ...",
        `Pada Kelas ... (...) Semester ... Tahun Pelajaran .../... Semoga Prestasi yang diraih menjadi motivasi untuk meraih kesuksesan dimasa yang akan datang`,
        new Date(),
        "Bandung Barat"
      ),
    },
    generalConfigShow: false,
    updateNameShow: false,
    updateName: "",
    updateNameIndex: 0,
  };

  componentDidMount() {
    this.generateCertificate();
  }

  generateCertificate = () => {
    let certificates = [];
    const { page, certificate } = this.state.generalConfig;
    for (let i = 1; i <= page; i++) {
      certificates.push({
        ...certificate,
        penerima: `Penerima-${i}`,
        penghargaan: `Juara Ke-${i}`,
      });
    }
    this.setState({ certificates });
  };

  onNameChange = (event) => {
    const { name, value } = event.target;
    const { updateNameIndex } = this.state;
    let certificates = [...this.state.certificates];
    let certificate = { ...certificates[updateNameIndex], [name]: value };
    certificates[updateNameIndex] = certificate;
    this.setState({
      certificates,
    });
  };

  onGeneralConfigChange = (event) => {
    const { name, value } = event.target;
    const { generalConfig } = this.state;
    if (name === "page") {
      this.setState({
        generalConfig: { ...generalConfig, [name]: value },
      });
    } else {
      this.setState({
        generalConfig: {
          ...generalConfig,
          certificate: {
            ...generalConfig.certificate,
            [name]: value,
          },
        },
      });
    }
  };

  render() {
    const {
      theme,
      certificates,
      generalConfig,
      generalConfigShow,
      updateName,
      updateNameShow,
    } = this.state;
    return (
      <div className="content-layout">
        <h2>
          <b>
            <i className="fa fa-cogs"></i> {" Piagam Penghargaan"}
          </b>
          <hr />
        </h2>
        <Row>
          <Col sm={3}>
            <Card style={{ padding: "10px" }}>
              <Card.Title>
                <u>Pengaturan</u>
              </Card.Title>
              <Card.Body style={{ padding: "10px" }}>
                <Button
                  variant="light"
                  title="Pengaturan Umum"
                  onClick={() => this.setState({ generalConfigShow: true })}
                >
                  <i className="fa fa-cog fa-3x"></i>
                </Button>
                <Button className="m-1" variant="light" title="Cetak Piagam">
                  <i className="fa fa-print fa-3x"></i>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={7}>
            <Card style={{ padding: "10px" }}>
              <Card.Title>
                <u>Template</u>
              </Card.Title>
              <Card.Body style={{ padding: "0px" }}>
                {CERTIFICATE_TEMPLATE.map((data, index) => {
                  return (
                    <div
                      className="mini-template"
                      key={"index-" + index}
                      onClick={() =>
                        this.setState({ theme: CERTIFICATE_TEMPLATE[index] })
                      }
                    >
                      <img src={data.mini_path} alt="mini template" />
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="certificate-container">
          {certificates.map((data, index) => {
            return (
              <CertificateItem
                theme={theme}
                key={"index-" + index}
                certificate={data}
                onClick={() =>
                  this.setState({
                    updateNameShow: true,
                    updateName: data.penerima,
                    updateNameIndex: index,
                  })
                }
              />
            );
          })}
        </div>
        <GeneralConfig
          show={generalConfigShow}
          generalConfig={generalConfig}
          onClose={() => this.setState({ generalConfigShow: false })}
          onChange={this.onGeneralConfigChange}
          onSubmit={() => {
            this.generateCertificate();
            this.setState({ generalConfigShow: false });
          }}
        />
        <NameConfig
          show={updateNameShow}
          onClose={() => this.setState({ updateNameShow: false })}
          penerima={updateName}
          onChange={this.onNameChange}
        />
      </div>
    );
  }
}
