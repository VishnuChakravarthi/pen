import React from "react";

const SortComp = ({ sort, field }) => {
  return (
    <React.Fragment>
      <span>
        <span
          type="button"
          onClick={() => {
            sort(field, 1);
          }}
        >
          <i className="mdi mdi-arrow-up"></i>
        </span>
        <span
          type="button"
          onClick={() => {
            sort(field, -1);
          }}
        >
          <i className="mdi mdi-arrow-down"></i>
        </span>
      </span>
    </React.Fragment>
  );
};

export default SortComp;
