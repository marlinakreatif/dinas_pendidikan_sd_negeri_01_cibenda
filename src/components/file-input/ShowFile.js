import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default ({ value, onDelete, onDownload, onOpenViewer }) => {
  return (
    <Row>
      <Col sm={9}>
        <Form.Control
          size="sm"
          type="text"
          readOnly={true}
          defaultValue={value.fileName}
        />
      </Col>
      <Col sm={3}>
        <Button variant="warning" type="button" onClick={onDelete} size="sm">
          <i className="fa fa-trash"></i>
        </Button>
        <Button variant="info" type="button" size="sm" className="m-1" onClick={onOpenViewer}>
          <i className="fa fa-eye"></i>
        </Button>
        <Button type="button" size="sm" onClick={onDownload}>
          <i className="fa fa-download"></i>
        </Button>
      </Col>
    </Row>
  );
};
