import React, { Component } from "react";
import { CertificateItem } from "../components";
import { CERTIFICATE_TEMPLATE } from "../constants";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Accordion,
  ButtonGroup,
} from "react-bootstrap";
import { MCertificate } from "../model";
import ReactDatePicker from "react-datepicker";
import ReactToPrint from "react-to-print";

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

const NameConfig = ({ show, onClose, certificate, onChange }) => {
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
          {"Ubah Piagam"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group controlId="input-">
              <Form.Label>Nama Penerima</Form.Label>
              <Form.Control
                type="text"
                name="penerima"
                placeholder="Nama penerima piagam"
                onChange={onChange}
                defaultValue={certificate.penerima}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="input-tanggal">
              <Form.Label> Nama Penghargaan</Form.Label>
              <Form.Control
                type="text"
                name="penghargaan"
                placeholder="Nama penghargaan piagam"
                onChange={onChange}
                defaultValue={certificate.penghargaan}
              />
            </Form.Group>
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
    certificateShow: false,
    certificateToUpdate: { penerima: null, penghargaan: null },
    certificateToUpdateIndex: 0,
  };

  componentToPrintRef = React.createRef();

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

  onCertificateValueChange = (event) => {
    const { name, value } = event.target;
    const { certificateToUpdateIndex } = this.state;
    let certificates = [...this.state.certificates];
    let certificate = {
      ...certificates[certificateToUpdateIndex],
      [name]: value,
    };
    certificates[certificateToUpdateIndex] = certificate;
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
      certificateToUpdate,
      certificateShow,
    } = this.state;
    return (
      <div className="content-layout">
        <Accordion>
          <Card>
            <Card.Header>
              <h4>
                <b>
                  <i className="fa fa-cogs fa-lg" aria-hidden="true"></i>{" "}
                  {" Piagam Penghargaan"}
                </b>
                <div className="pull-right">
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => this.setState({ generalConfigShow: true })}
                    >
                      <i className="fa fa-cog"></i>
                      {" Pengaturan Umum"}
                    </Button>
                    <ReactToPrint
                      trigger={() => {
                        return (
                          <Button variant="secondary" size="sm">
                            <i className="fa fa-print"></i> {" Cetak Piagam"}
                          </Button>
                        );
                      }}
                      content={() => this.componentToPrintRef}
                      pageStyle="@page { size: auto; margin: 5mm; }"
                    />
                    <Accordion.Toggle
                      eventKey="0"
                      as={Button}
                      variant="secondary"
                      size="sm"
                    >
                      <i className="fa fa-image"></i> {" Template"}
                    </Accordion.Toggle>
                  </ButtonGroup>
                </div>
              </h4>
            </Card.Header>

            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Row>
                  <Col sm={3}></Col>
                  <Col sm={7}>
                    {CERTIFICATE_TEMPLATE.map((data, index) => {
                      return (
                        <div
                          className="mini-template"
                          key={"index-" + index}
                          onClick={() =>
                            this.setState({
                              theme: CERTIFICATE_TEMPLATE[index],
                            })
                          }
                        >
                          <img src={data.mini_path} alt="mini template" />
                        </div>
                      );
                    })}
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <div
          className="certificate-container"
          ref={(el) => (this.componentToPrintRef = el)}
        >
          {certificates.map((data, index) => {
            return (
              <CertificateItem
                theme={theme}
                key={"index-" + index}
                certificate={data}
                onClick={() =>
                  this.setState({
                    certificateShow: true,
                    certificateToUpdate: {
                      penerima: data.penerima,
                      penghargaan: data.penghargaan,
                    },
                    certificateToUpdateIndex: index,
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
          show={certificateShow}
          onClose={() => this.setState({ certificateShow: false })}
          certificate={certificateToUpdate}
          onChange={this.onCertificateValueChange}
        />
      </div>
    );
  }
}
