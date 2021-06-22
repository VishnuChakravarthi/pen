import React, { useEffect, useState } from "react";
import { url } from "../api";
import axios from "axios";
import swal from "sweetalert";
import SortComp from "../Partials/SortComp";

const NCCFeedback = ({ feed, searchKey }) => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(url + "/view-feedbacks");
        const data = await response.json();
        const feeds = await data.data.filter(
          (feed) => (feed.type = "non_returning_customer")
        );
        if (searchKey !== "") {
          const filteredtResults = feeds.filter(
            (feed) =>
              feed.user.name.toLowerCase().indexOf(searchKey.toLowerCase()) ===
              0
          );
          setFeedback(filteredtResults);
        } else {
          setFeedback(feeds);
        }
        console.log("non_returning_customer", data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeed();
  }, [searchKey]);

  const reviewFeedback = (event, id) => {
    event.preventDefault();
    const token = localStorage.getItem("Token");

    const headers = {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const body = { status: "reviewed" };
    axios
      .put(`${url}/edit-feedback/${id}`, body, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        swal("Success!", "Feedback Reviewed!", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("OOPS!", "Feedback Review Failed", "error");
      });
  };

  const sort = (column, sorttype) => {
    let userssort = feedback;

    if (column === "status") {
      userssort = [...feedback].sort((a, b) => {
        let check = a.status === "reviewed" ? -1 : 1;
        return check * sorttype;
      });
      setFeedback(userssort);
    } else if (column === "date") {
      userssort = [...feedback].sort((a, b) => {
        let check = a.created_at > b.created_at ? 1 : -1;
        return check * sorttype;
      });
      setFeedback(userssort);
    }
  };

  return (
    <React.Fragment>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {feed.fields.map((field) =>
              field === "Created At" ? (
                <th key={field}>
                  {field}
                  <SortComp field="date" sort={sort} />
                </th>
              ) : field === "Status" ? (
                <th key={field}>
                  {field}
                  <SortComp field="status" sort={sort} />
                </th>
              ) : (
                <th key={field}>{field}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {feedback.map((field, index) => (
            <tr key={index + 1}>
              <td>{field.use_application}</td>
              <td>{field.user_friendly}</td>
              <td>{field.description}</td>
              <td>{field.user.name}</td>
              <td>{field.created_at}</td>
              <td>
                {`${field.status}` === "null" ? (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => reviewFeedback(e, field.feedback_id)}
                  >
                    Review
                  </button>
                ) : (
                  <button className="btn btn-success" disabled>
                    Reviewed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default NCCFeedback;
