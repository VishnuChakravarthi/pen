import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function Testimonials() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <React.Fragment>
      <section class="our-testimonials bgc-fa">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3">
              <div class="main-title text-center">
                <h3 class="mt0">What People Say</h3>
                <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                  <div class="">
                    <div class="testimonial_grid">
                      <div class="t_icon home3">
                        <span class="flaticon-quotation-mark"></span>
                      </div>
                      <div class="testimonial_content">
                        <div class="thumb">
                          <img
                            class="img-fluid"
                            src="images/testimonial/1.jpg"
                            alt="1.jpg"
                          />
                          <h4>Alex Gibson</h4>
                          <p>Telemarketer</p>
                        </div>
                        <div class="details">
                          <p>
                            This is the best job-board theme that our company
                            has come across! Without JobHunt i’d be homeless,
                            they found me a job and got me sorted out quickly
                            with everything! Can’t quite…
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div class="">
                    <div class="testimonial_grid">
                      <div class="t_icon home3">
                        <span class="flaticon-quotation-mark"></span>
                      </div>
                      <div class="testimonial_content">
                        <div class="thumb">
                          <img
                            class="img-fluid"
                            src="images/testimonial/1.jpg"
                            alt="1.jpg"
                          />
                          <h4>Alex </h4>
                          <p>Telemarketer</p>
                        </div>
                        <div class="details">
                          <p>
                            This is the best job-board theme that our company
                            has come across! Without JobHunt i’d be homeless,
                            they found me a job and got me sorted out quickly
                            with everything! Can’t quite…
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div class="">
                    <div class="testimonial_grid">
                      <div class="t_icon home3">
                        <span class="flaticon-quotation-mark"></span>
                      </div>
                      <div class="testimonial_content">
                        <div class="thumb">
                          <img
                            class="img-fluid"
                            src="images/testimonial/1.jpg"
                            alt="1.jpg"
                          />
                          <h4>Gibson</h4>
                          <p>Telemarketer</p>
                        </div>
                        <div class="details">
                          <p>
                            This is the best job-board theme that our company
                            has come across! Without JobHunt i’d be homeless,
                            they found me a job and got me sorted out quickly
                            with everything! Can’t quite…
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Testimonials;
