import React from "react";
import "./loading.css";

export default () => {
  return (
    <div className="load-container">
      <div className="load-center">
        <div className="lds-heart">
          <div></div>
        </div>
      </div>
    </div>
  );
};
