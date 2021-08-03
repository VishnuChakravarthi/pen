import NavMain from "./Nav";
import Footer from "../components/Footer";

function SelectPlan() {
    const shadow = {
        boxShadow: "0px 1px 13px 1px rgba(0,0,0,0.03)",
    };
    const shadow1 = {
        boxShadow: `  inset 0 0 30px rgba(55, 84, 170,0),
    inset 0 0 20px rgba(255, 255, 255,0),
    7px 7px 15px rgba(55, 84, 170,.15),
    -7px -7px 20px rgba(255, 255, 255,1),
    inset 0px 0px 4px rgba(255, 255, 255,.2)`,
        marginRight: "1rem",
        paddingBottom: "1rem",
        borderRadius: "15px",
        border: "1px solid rgba(0,0,0,0.125)",
    };
    return (
        <React.Fragment>
            <NavMain />
            <React.Fragment>
                {/* <section class="inner_page_breadcrumb">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 offset-xl-3 text-center">
                <div class="breadcrumb_content">
                  <h4 class="breadcrumb_title">Select Plan</h4>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      Course-1
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section> */}

                <section class="our-pricing bgc-fa mt-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 text-center">
                                <div class="main-title mb50">
                                    <h3 class="mt0">Choose Competency Level</h3>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12" style={shadow}>
                                <div class="row membership_container">
                                    <ul class="mc_parent_list w-100 d-flex justify-content-around align-items-center">
                                        <li class="list-inline-item">
                                            <ul
                                                class="mc_child_list two text-center  "
                                                style={shadow1}
                                            >
                                                <li>
                                                    <div class="membership_header">
                                                        <div class="price">
                                                            Rs.100
                                                        </div>
                                                        <h4>PROFICIENT</h4>
                                                        {/* <p>Start learning</p> */}
                                                    </div>
                                                </li>
                                                <li>Quality</li>
                                                <li>Content</li>
                                                <li>Assesment</li>
                                                <li>Mini Project</li>
                                                <li>
                                                    <img
                                                        src="images/resource/check1.png"
                                                        alt="check1.png"
                                                    />
                                                </li>
                                                <li>
                                                    <img
                                                        src="images/resource/check1.png"
                                                        alt="check1.png"
                                                    />
                                                </li>
                                                <li>
                                                    <a
                                                        class="btn pricing_btn"
                                                        href="/course"
                                                    >
                                                        Get Started
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="list-inline-item">
                                            <ul
                                                class="mc_child_list three text-center"
                                                style={shadow1}
                                            >
                                                <li>
                                                    <div class="membership_header">
                                                        <div class="price">
                                                            Rs.400
                                                        </div>
                                                        <h4>COMPETENT</h4>
                                                        {/* <p>Should do it</p> */}
                                                    </div>
                                                </li>
                                                <li>Quality</li>
                                                <li>Content</li>
                                                <li>Assesment</li>
                                                <li>Mini Project</li>
                                                <li>
                                                    Internship (Offline/Online)
                                                </li>
                                                <li>
                                                    <img
                                                        src="images/resource/check1.png"
                                                        alt="check1.png"
                                                    />
                                                </li>
                                                <li>
                                                    <a
                                                        class="btn pricing_btn"
                                                        href="/course"
                                                    >
                                                        Get Started
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="list-inline-item">
                                            <ul
                                                class="mc_child_list four text-center"
                                                style={shadow1}
                                            >
                                                <li>
                                                    <div class="membership_header">
                                                        <div class="price">
                                                            Rs.550
                                                        </div>
                                                        <h4>EXPERT</h4>
                                                        {/* <p>Instructor</p> */}
                                                    </div>
                                                </li>
                                                <li>Quality</li>
                                                <li>Content</li>
                                                <li>Assesment</li>
                                                <li>Mini Project</li>
                                                <li>
                                                    Internship (Offline/Online)
                                                </li>
                                                <li>Live Project Mentor</li>
                                                <li>
                                                    <a
                                                        class="btn pricing_btn"
                                                        href="/course"
                                                    >
                                                        Get Started
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
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

export default SelectPlan;
