import React from "react";
import { Link } from "react-router-dom";

export default function ({ title, icon, to }) {
  return (
    <h4 style={{ color: "#343a40" }}>
      {icon && <i className={`fa ${icon}`}></i>}
      <span className="m-2">{title}</span>
      {to && (
        <div className="pull-right ">
          <Link to={to}>
            <div className="btn btn-secondary btn-sm">
              <i className="fa fa-plus"></i>
            </div>
          </Link>
        </div>
      )}
    </h4>
  );
}
