import React, { useEffect, useState } from "react";
import NavMain from "../components/Navbar/navbar";
import Footer from "../components/Footer";
import { url } from "../components/api";
import { Link } from "react-router-dom";
import 'react-bootstrap';

function Asses() {
    function quizfn() {
        window.location.href = "/quiz";
    }

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url + "/view-assessment/1");
            const data = await response.json();

            setData(data.data);
        };
        fetchData();
    }, []);
    return (
        <React.Fragment>
            {/* <NavMain /> */}
            <React.Fragment>

                <section className="blog_post_container mt-5">
                    <h1 className="text-center pb-4">Assesments</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                            <div class="accordion" id="accordionExample">
                              <div class="card">
                                <div class="card-header" id="headingOne">
                                  <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                      Introduction
                                    </button>
                                  </h2>
                                </div>
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                  <div class="card-body">
                                    <div className="main_blog_post_content">
                                      {data.map((item, index) => (
                                          <div className="row event_lists p0">
                                              <div className="col-xl-5 pr15-xl pr0">
                                                  <div className="blog_grid_post event_lists">
                                                      <div className="thumb">
                                                          <img
                                                              className="img-fluid w100"
                                                              src="images/blog/el1.jpg"
                                                              alt="el1.jpg"
                                                          />
                                                          <div className="post_date">
                                                              <h2>28</h2>{" "}
                                                              <span>
                                                                  DECEMBER
                                                              </span>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-xl-7 pl15-xl pl0">
                                                  <div className="blog_grid_post style2 event_lists h-100">
                                                      <div className="details h-100">
                                                          <h3>{item.title}</h3>
                                                          {/* <p>
                                                              {item.description}
                                                          </p> */}
                                                          <ul className="mb0">
                                                              {/* <li>
                                                                  <a href="#">
                                                                      <span className="flaticon-appointment"></span>{" "}
                                                                      Date:{" "}
                                                                      {
                                                                          item.start_date
                                                                      }{" "}
                                                                      -{" "}
                                                                      {
                                                                          item.end_date
                                                                      }
                                                                  </a>
                                                              </li>
                                                              <li>
                                                                  <a href="#">
                                                                      <span className="flaticon-clock"></span>
                                                                      Time:
                                                                      {
                                                                          item.start_time
                                                                      }{" "}
                                                                      -{" "}
                                                                      {
                                                                          item.end_time
                                                                      }
                                                                  </a>
                                                              </li> */}
                                                              <li>
                                                                  <a href="#">
                                                                      <span className="flaticon-clock"></span>
                                                                      No of Questions :
                                                                      {" "}
                                                                    
                                                                      {
                                                                          "3"
                                                                      }
                                                                  </a>
                                                              </li>
                                                              <li>
                                                                  <a href="#">
                                                                      <span className="flaticon-placeholder"></span>
                                                                      Total points
                                                                      : {item.id}
                                                                  </a>
                                                              </li>
                                                          </ul>
                                                          <div className="d-flex  justify-content-end">
                                                              <Link
                                                                  onClick={(e) =>
                                                                      !item ||
                                                                      !item.id
                                                                          ? e.preventDefault()
                                                                          : ""
                                                                  }
                                                                  to={`/quiz?id=${item.id}`}
                                                              ><br></br>
                                                                  <button className="btn btn-primary">
                                                                      Take up
                                                                  </button>
                                                              </Link>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="card">   
                                <div class="card-header" id="headingTwo">
                                  <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                      MileStone 1
                                    </button>
                                  </h2>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                  <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div class="card">
                                <div class="card-header" id="headingThree">
                                  <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    MileStone 1
                                    </button>
                                  </h2>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                  <div class="card-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            {/* <Footer /> */}
        </React.Fragment>
    );
}

export default Asses;
