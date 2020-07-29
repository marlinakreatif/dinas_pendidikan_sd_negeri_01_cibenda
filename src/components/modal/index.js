import React from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";

const withModal = (Title, Component) => ({
  show,
  handleClose,
  size,
  scrollable,
  message,
  feedback,
  download,
}) => (
  <Modal
    show={show}
    onHide={handleClose}
    aria-labelledby="contained-modal-title-vcenter"
    centered
    size={size ? size : "md"}
    scrollable={scrollable}
  >
    <Modal.Header closeButton>
      <Modal.Title>{Title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Component
        message={message}
        feedback={feedback}
        close={handleClose}
        download={download}
      />
    </Modal.Body>
  </Modal>
);

const Notification = ({ close, message }) => {
  return (
    <center>
      <p>{message}</p>
      <hr />
      <Button type="button" variant="light" onClick={close} size="sm" block>
        OK
      </Button>
    </center>
  );
};

const Confirmation = ({ close, message, feedback }) => {
  return (
    <center>
      <p>{message}</p>
      <hr />
      <Row className="justify-content-md-center">
        <Col sm={4}>
          <Button
            type="button"
            variant="danger"
            onClick={feedback}
            size="sm"
            block
          >
            Ya
          </Button>
        </Col>
        <Col sm={4}>
          <Button
            type="button"
            variant="primary"
            onClick={close}
            size="sm"
            block
          >
            Tidak
          </Button>
        </Col>
      </Row>
    </center>
  );
};

const FileViewer = ({ close, message, download }) => {
  let renderComponent;
  if (message && message.fileName) {
    let strs = message.fileName.split(".");
    let ext = strs[strs.length - 1];
    if (ext && ext === "pdf") {
      renderComponent = (

        <object
          data={message.url}
          type="application/pdf"
          width="100%"
          height="842px"
        >
          <p>
            <b>Example fallback content</b>: This browser does not support PDFs.
            Please download the PDF to view it:
            <a href={message.url}>Download PDF</a>.
          </p>
        </object>
      );
    } else {
      renderComponent = (
        <div style={{ width: "100" }}>
          <img
            src={message.url}
            alt="document"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
            }}
          />
        </div>
      );
    }
  }
  return (
    <div style={{ padding: "25px" }}>
      {renderComponent}
      <hr />
      <Button type="button" size="sm" onClick={download}>
        <i className="fa fa-download"></i> {" Unduh berkas"}
      </Button>
    </div>
  );
};

export default {
  Notification: withModal("Pemberitahuan", Notification),
  Confirmation: withModal("Konfirmasi", Confirmation),
  FileViewer: withModal("Pembuka Berkas", FileViewer),
};
