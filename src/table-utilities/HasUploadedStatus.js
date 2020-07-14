import React from "react";
import { Badge } from "react-bootstrap";

export default ({ isUploaded }) => {
  return (
    <>
      {isUploaded && (
        <Badge variant="success">
          <i className="fa fa-check" aria-hidden="true"></i>
          <small className="m-1">Sudah Ada</small>
        </Badge>
      )}
      {!isUploaded && (
        <Badge variant="danger">
          <i className="fa fa-times" aria-hidden="true"></i>
          <small className="m-1">Belum Ada</small>
        </Badge>
      )}
    </>
  );
};
