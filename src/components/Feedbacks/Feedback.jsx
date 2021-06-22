import React, { useState, useEffect } from "react";
import { url } from "../api";
import { CSVLink } from "react-csv";
import { Tab, Tabs } from "react-bootstrap";
import CustomerFeedback from "./CustomerFeedback";
import GeneralFeedback from "./GeneralFeedback";
import NCCFeedback from "./NCCFeedback";
import SolnFeedback from "./SolutionFeedback";
import SearchComp from "../Partials/Search";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [key, setKey] = useState("customer-feedback");
  const [searchKey, setSearchKey] = useState("");
  const [headers, setHeaders] = useState([
    { label: "Name", key: "user.name" },
    { label: "Description", key: "description" },
    { label: "About", key: "feedback_about" },
    { label: "What For", key: "what_for" },
    { label: "Created At", key: "created_at" },
    { label: "Status", key: "status" },
  ]);
  const [exportContent, setExportContent] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(url + "/view-feedbacks");
        const data = await response.json();
        setFeedback(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeed();
  }, []);

  const feeds = [
    {
      name: "Customer Feedback",
      id: "customer-feedback",
      fields: [
        "Feedback",
        "Satisfaction Course",
        "Application Experience",
        "Description",
        "Rating",
        "User's Name",
        "Created At",
        "Status",
      ],
      headers: [
        { label: "Name", key: "user.name" },
        { label: "Course Satisfaction", key: "satisfaction_course" },
        { label: "Application Experience", key: "application_experience" },
        { label: "Description", key: "description" },
        { label: "Rating", key: "rating" },
        { label: "Created At", key: "created_at" },
        { label: "Status", key: "status" },
      ],
    },
    {
      name: "General Feedback",
      id: "general_review",
      fields: [
        "What For",
        "Feedback About",
        "Description",
        "User's Name",
        "Created At",
        "Status",
      ],
      headers: [
        { label: "Name", key: "user.name" },
        { label: "Description", key: "description" },
        { label: "About", key: "feedback_about" },
        { label: "Status", key: "status" },
        { label: "What For", key: "what_for" },
        { label: "Created At", key: "created_at" },
      ],
    },
    {
      name: "Solution Feedback",
      id: "solution-feedback",
      fields: ["Rating", "User's Name", "Created At", "Status"],
      headers: [
        { label: "Name", key: "user.name" },
        { label: "Rating", key: "rating" },
        { label: "Status", key: "status" },
        { label: "Created At", key: "created_at" },
      ],
    },
    {
      name: "Non Recurring Customer Feedback",
      id: "non-recurring-customer-feedback",
      fields: [
        "Use Application",
        "User Friendly",
        "Description",
        "User's Name",
        "Created At",
        "Status",
      ],
      headers: [
        { label: "Name", key: "user.name" },
        { label: "Description", key: "description" },
        { label: "Use Application", key: "use_application" },
        { label: "User Friendly", key: "user_friendly" },
        { label: "Status", key: "status" },
        { label: "Created At", key: "created_at" },
      ],
    },
  ];

  useEffect(() => {
    const content = feedback.filter((feed) => (feed.type = key));
    console.log({ content, feedback });
    setExportContent(content);
  }, [feedback, key]);

  const setHeader = () => {
    const header = feeds.filter((feed) => feed.id === key);
    // console.log(header[0].headers, key);
    setHeaders(header[0].headers);
  };

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box m-3">
              <div className="d-flex justify-content-between">
                <h1>Feedback</h1>
                <div className="d-flex align-items-center">
                  <SearchComp
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                  />
                  {feedback !== [] && (
                    <CSVLink
                      data={exportContent}
                      headers={headers}
                      className="btn btn-primary btn-rounded w-md waves-effect waves-light mr-2"
                      filename={"feedback.csv"}
                    >
                      Export CSV
                    </CSVLink>
                  )}
                </div>
              </div>

              <div>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => {
                    setKey(k);
                    setHeader();
                  }}
                >
                  {feeds.map((feed, index) => (
                    <Tab eventKey={feed.id} title={feed.name} key={index}>
                      <div className="row">
                        <div className="col-sm-12">
                          {feed.id === "customer-feedback" && (
                            <CustomerFeedback
                              feed={feed}
                              searchKey={searchKey}
                            />
                          )}
                          {feed.id === "general_review" && (
                            <GeneralFeedback
                              feed={feed}
                              searchKey={searchKey}
                            />
                          )}
                          {feed.id === "non-recurring-customer-feedback" && (
                            <NCCFeedback feed={feed} searchKey={searchKey} />
                          )}
                          {feed.id === "solution-feedback" && (
                            <SolnFeedback feed={feed} searchKey={searchKey} />
                          )}
                        </div>
                      </div>
                    </Tab>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Feedback;
