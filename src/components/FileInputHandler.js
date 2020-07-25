import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default ({ defaultValue, onFileChange, onFileDelete }) => {
  return (
    <div>
      {defaultValue && (
        <Row>
          <Col sm={8}>
            <Form.Control size="sm" type="text" readOnly={true} />
          </Col>
          <Col sm={4}>
            <Button type="button" onClick={onFileDelete}>
              <i className="fa fa-trash"></i>
            </Button>
          </Col>
        </Row>
      )}
      {!defaultValue && (
        <Form.File
          size="sm"
          data-browse="Pilih Dokument"
          onChange={onFileChange}
        />
      )}
    </div>
  );
};
