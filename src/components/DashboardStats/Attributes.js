import React from "react";

const Attributes = ({ data }) => {
  return (
    <table className="table table-hover mb-0">
      <thead>
        <tr>
          {/* <th>Sno</th> */}
          <th>Referal</th>
          <th>New Register</th>
          <th>Profile Completion</th>
          <th>Given Course</th>
          <th>Consistency Points</th>
          <th>Assessment Points</th>
        </tr>
      </thead>
      <tbody>
        {/* {data.map((item, index) => ( */}
        <tr>
          {/* <td>{index + 1}</td> */}
          <td>{data[0].value}</td>
          <td>{data[1].value}</td>
          <td>{data[2].value}</td>
          <td>{data[3].value}</td>
          <td>{data[4].value}</td>
          <td>{data[5].value}</td>
        </tr>
        {/* ))} */}
      </tbody>
    </table>
  );
};

export default Attributes;
