import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ViewOrder = ({ view, toggleView, order }) => {
  return (
    <React.Fragment>
      <Modal isOpen={view} toggle={toggleView} centered={true}>
        <ModalHeader toggle={toggleView}>View Order</ModalHeader>
        <ModalBody>
          <div className="table-responsive">
            <table className=" table table-bordered table-striped">
              {order.map((order, index) => (
                <tbody key={index + 1}>
                  <tr>
                    <th>Course Id</th>
                    <td>{order.id}</td>
                  </tr>
                  <tr>
                    <th>Course Title</th>
                    <td>{order.course.course_title}</td>
                  </tr>
                  <tr>
                    <th>Created At</th>
                    <td>{order.created_at.split(" ")[0]}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td>Rs.{order.price}</td>
                  </tr>
                  <tr>
                    <th>Type</th>
                    <td>{order.course.price_type}</td>
                  </tr>
                  <tr>
                    <th>Transaction</th>
                    <td>{order.payment_id}</td>
                  </tr>
                  <tr>
                    <th>Order Id</th>
                    <td>{order.order_id}</td>
                  </tr>
                  <tr>
                    <th>Payment Status</th>
                    <td>{order.payment_status}</td>
                  </tr>
                  <tr>
                    <th>Points</th>
                    <td>{order.points}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleView}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default ViewOrder;
