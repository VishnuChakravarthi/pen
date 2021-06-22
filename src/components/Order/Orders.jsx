import React, { useState, useEffect } from "react";
import { url } from "../api";
import axios from "axios";
import { CSVLink } from "react-csv";
import ViewOrder from "./ViewOrder";
import EditOrder from "./EditOrder";
import SortComp from "../Partials/SortComp";
import SearchComp from "../Partials/Search";

const Orders = () => {
  const [modal, setModal] = useState(false);
  const [view, setView] = useState(false);

  const toggle = () => setModal(!modal);

  const toggleView = () => setView(!view);

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  console.log({ order });

  const [searchKey, setSearchKey] = useState("");

  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchOrders = async () => {
      await axios({
        method: "get",
        url: `${url}/purchase`,
        headers: { Authorization: `Basic ${token}` },
      }).then((res) => {
        console.log(res.data.data);
        console.log({ searchKey });
        if (searchKey === "") {
          setOrders(res.data.data);
        } else {
          const filteredtResults = res.data.data.filter(
            (order) =>
              order.created_at
                .split(" ")[0]
                .toLowerCase()
                .indexOf(searchKey.toLowerCase()) > -1
          );
          setOrders(filteredtResults);
        }
      });
    };
    // if (!orders.length > 0) fetchOrders();
    fetchOrders();
  }, [searchKey, token]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Course Name", key: "course.course_title" },
    { label: "Course Type", key: "course.course_type" },
    { label: "Order Id", key: "order_id" },
    { label: "Payment Id", key: "payment_id" },
    { label: "Payment Status", key: "payment_status" },
    { label: "Points", key: "points" },
    { label: "Price", key: "price" },
  ];

  const sort = (column, sorttype) => {
    let userssort = orders;

    if (column === "status") {
      userssort = [...orders].sort((a, b) => {
        let check = a.status === "reviewed" ? -1 : 1;
        return check * sorttype;
      });
      setOrders(userssort);
    } else if (column === "date") {
      userssort = [...orders].sort((a, b) => {
        let check = a.created_at > b.created_at ? 1 : -1;
        return check * sorttype;
      });
      setOrders(userssort);
    }
  };

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="card-box">
              <div className="d-flex justify-content-between">
                <h3>Orders</h3>
                <div className="d-flex align-items-center">
                  <SearchComp
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                  />
                  {orders !== [] && (
                    <CSVLink
                      data={orders}
                      headers={headers}
                      className="btn btn-primary btn-rounded w-md waves-effect waves-light mr-2"
                      filename={"orders.csv"}
                    >
                      Export CSV
                    </CSVLink>
                  )}
                </div>
              </div>

              <div className="table-responsive">
                <table className="table  table-bordered table-hover">
                  <thead>
                    <th>ID</th>
                    <th>Course Name</th>
                    <th>
                      Date <SortComp sort={sort} field="date" />
                    </th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Transaction Id</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{order.course.course_title}</td>
                        <td>{order.created_at.split(" ")[0]}</td>
                        <td>Rs.{order.price}</td>
                        <td>{order.course.price_type}</td>
                        <td>{order.payment_id}</td>
                        <td>
                          {/* <button
                            className="btn btn-primary mr-3"
                            onClick={() => {
                              toggle();
                              setOrder(
                                orders.filter(
                                  (orders) => orders.id === order.id
                                )
                              );
                            }}
                          >
                            Edit status
                          </button> */}
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              toggleView();
                              setOrder(
                                orders.filter(
                                  (orders) => orders.id === order.id
                                )
                              );
                            }}
                          >
                            View Order
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      <EditOrder modal={modal} toggle={toggle} order={order} />
      <ViewOrder view={view} toggleView={toggleView} order={order} />
    </React.Fragment>
  );
};

export default Orders;
