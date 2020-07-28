import React from "react";
import { Form, Row, Col, ProgressBar } from "react-bootstrap";

export default ({ onChange, progress }) => {
  return (
    <Row>
      <Col sm={12}>
        <Form.File
          size="sm"
          data-browse="Pilih Dokument"
          onChange={onChange}
          accept="application/pdf,image/*"
        />
      </Col>
      {progress > 0 && (
        <Col sm={9}>
          <ProgressBar
            now={progress}
            style={{ height: "5px", marginTop: "5px" }}
          />
        </Col>
      )}
    </Row>
  );
};
