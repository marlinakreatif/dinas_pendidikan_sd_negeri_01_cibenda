import React from "react";
import { Badge } from "react-bootstrap";

export default ({ isUploaded }) => {
  return (
    <>
      {isUploaded && (
        <Badge variant="success">
          <i className="fa fa-check" aria-hidden="true"></i>
        </Badge>
      )}
      {!isUploaded && (
        <Badge variant="danger">
          <i className="fa fa-times" aria-hidden="true"></i>
        </Badge>
      )}
    </>
  );
};
