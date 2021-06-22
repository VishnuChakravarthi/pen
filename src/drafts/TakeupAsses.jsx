import React, { useEffect, useState } from "react";
import NavMain from "../components/Nav";
import Footer from "../components/Footer";
import "./takeupasses.css";
import { url } from "../components/api";
import queryString from "query-string";

function TakeupAsses({ location }) {
    const [data, setData] = useState([]);
    const [que, setQue] = useState(1);
    const [ans, setAns] = useState("");
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const { id } = queryString.parse(location.search);
        const FetchData = async () => {
            const response = await fetch(url + `/view-questions/${id}`);
            const data = await response.json();

            console.log(data);
            setData(data);
        };

        FetchData();
    }, []);

    function incrementfn() {
        let answer = data[que - 1].answer;
        console.log(answer);
        if (answer == "C") {
            console.log(ans);
            if (ans === data[que - 1].optionC) {
                setPoints(points + parseFloat(data[que - 1].point));
            } else {
                alert("answer is wrong");
            }
        }
        if (answer == "B") {
            if (ans === data[que - 1].optionB) {
                setPoints(points + parseFloat(data[que - 1].point));
            } else {
                alert("answer is wrong");
            }
        }
        if (answer == "A") {
            if (ans === data[que - 1].optionA) {
                setPoints(points + parseFloat(data[que - 1].point));
            } else {
                alert("answer is wrong");
            }
        }
        if (que >= data.length) {
            return;
        } else {
            setQue(que + 1);
            setAns("");
        }
    }

    console.log(ans);

    return (
        <React.Fragment>
            <NavMain></NavMain>
            <React.Fragment>
                {/* <section className="inner_page_breadcrumb">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 offset-xl-3 text-center">
                <div className="breadcrumb_content">
                  <h4 className="breadcrumb_title">Assestment 1</h4>
                  <ol className="breadcrumb">
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                    ></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section> */}
                <section className="mt-5" style={{paddingTop: "81px"}}>
                    <h2 class="right">Correct ✔</h2>
                    <h2 class="wrong">Wrong ❌</h2>

                    <div class="container-quiz m-auto">
                        <div class="result"></div>
                        <div className="que-no">
                            {que}/{data.length}
                        </div>
                        <button class="restart">Restart</button>

                        <div class="quiz">
                            <div class="score">Points : {points}</div>

                            <div class="question">
                                {data[que - 1] ? data[que - 1].question : ""}{" "}
                            </div>
                            <div class="options-container">
                                <div class="radio">
                                    <input
                                        id="radio_one"
                                        name="radio"
                                        type="radio"
                                        value={
                                            data[que - 1]
                                                ? data[que - 1].optionA
                                                : ""
                                        }
                                        onChange={(e) => {
                                            setAns(e.target.value);
                                        }}
                                    />
                                    <label for="radio_one" className="ml-3">
                                        <span class="radio-label"></span>{" "}
                                        {data[que - 1]
                                            ? data[que - 1].optionA
                                            : ""}
                                    </label>
                                </div>
                                <div class="radio">
                                    <input
                                        id="radio_two"
                                        name="radio"
                                        type="radio"
                                        value={
                                            data[que - 1]
                                                ? data[que - 1].optionB
                                                : ""
                                        }
                                        onChange={(e) => {
                                            setAns(e.target.value);
                                        }}
                                    />
                                    <label for="radio_two" className="ml-3">
                                        <span class="radio-label"></span>{" "}
                                        {data[que - 1]
                                            ? data[que - 1].optionB
                                            : ""}
                                    </label>
                                </div>
                                <div class="radio">
                                    <input
                                        id="radio_three"
                                        name="radio"
                                        type="radio"
                                        value={
                                            data[que - 1]
                                                ? data[que - 1].optionC
                                                : ""
                                        }
                                        onChange={(e) => {
                                            setAns(e.target.value);
                                        }}
                                    />
                                    <label for="radio_three" className="ml-3">
                                        <span class="radio-label"></span>{" "}
                                        {data[que - 1]
                                            ? data[que - 1].optionC
                                            : ""}
                                    </label>
                                </div>
                            </div>

                            <div class="choices">
                                <button class="true" onClick={incrementfn}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
            <Footer></Footer>
        </React.Fragment>
    );
}

export default TakeupAsses;
