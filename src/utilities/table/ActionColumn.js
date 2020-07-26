import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default ({ uuid, editTo, addDocTo }) => {
  return (
    <div style={{ width: "150px" }}>
      <Link to={editTo}>
        <Button size="sm" variant="info">
          <i className="fa fa-pencil"></i>
        </Button>
      </Link>
      <Button className="m-1" size="sm" variant="danger">
        <i className="fa fa-trash"></i>
      </Button>
      {addDocTo && (
        <Link to={addDocTo}>
          <Button size="sm" variant="success" className="m-1">
            <i className="fa fa-files-o"></i>
          </Button>
        </Link>
      )}
    </div>
  );
};
