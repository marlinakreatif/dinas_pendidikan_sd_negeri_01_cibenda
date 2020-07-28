import React from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";

const WithModal = ({ title, show, handleClose, size, children }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size={size ? size : "md"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

const Notification = ({ show, handleClose, message, size }) => {
  return (
    <WithModal
      show={show}
      handleClose={handleClose}
      title="Pemberitahuan"
      size={size}
    >
      <center>
        <p>{message}</p>
        <hr />
        <Button
          type="button"
          variant="light"
          onClick={handleClose}
          size="sm"
          block
        >
          OK
        </Button>
      </center>
    </WithModal>
  );
};

const Confirmation = ({ show, handleClose, message, size, doTask }) => {
  return (
    <WithModal
      show={show}
      handleClose={handleClose}
      title="Konfirmasi"
      size={size}
    >
      <center>
        <p>{message}</p>
        <hr />
        <Row className="justify-content-md-center">
          <Col sm={4}>
            <Button
              type="button"
              variant="danger"
              onClick={doTask}
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
              onClick={handleClose}
              size="sm"
              block
            >
              Tidak
            </Button>
          </Col>
        </Row>
      </center>
    </WithModal>
  );
};

export default {
  Notification,
  Confirmation,
};
