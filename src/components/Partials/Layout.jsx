import React from "react";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
