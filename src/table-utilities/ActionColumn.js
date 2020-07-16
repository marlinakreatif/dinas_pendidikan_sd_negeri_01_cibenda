import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default ({ uuid, editTo }) => {
  return (
    <div>
      <Link to={editTo}>
        <Button size="sm" variant="info">
          <i className="fa fa-pencil"></i>
        </Button>
      </Link>
      <Button style={{ marginLeft: "5px" }} size="sm" variant="danger">
        <i className="fa fa-trash"></i>
      </Button>
    </div>
  );
};

