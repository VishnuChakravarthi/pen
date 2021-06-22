import React from "react";
import NavMain from "./NavMain";
import Footer from "./Footer";
import ProgressBar from "react-animated-progress-bar";
import "./performance.css";

function Performance() {
  return (
    <React.Fragment>
      <NavMain />
      <React.Fragment>
        <section class="inner_page_breadcrumb">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 offset-xl-3 text-center">
                <div class="breadcrumb_content">
                  <h4 class="breadcrumb_title">Welcome</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
      <Footer />
    </React.Fragment>
  );
}

export default Performance;
