import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const EditOrder = ({ modal, toggle, order }) => {
  const [status, setStatus] = useState(order.payment_status);

  return (
    <React.Fragment>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Modify status</ModalHeader>
        <ModalBody>
          <div className="table-responsive">
            <table className=" table table-bordered table-striped">
              {order.map((order, index) => (
                <tbody key={index}>
                  <tr>
                    <th>Order Id</th>
                    <td>{order.order_id}</td>
                  </tr>
                  <tr>
                    <th>Course Name</th>
                    <td>{order.course.course_title}</td>
                  </tr>
                  <tr>
                    <th>transaction ID</th>
                    <td>{order.payment_id}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{order.payment_status}</td>
                  </tr>
                  <tr>
                    <th>Edit Status</th>
                    <td>
                      <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default EditOrder;
