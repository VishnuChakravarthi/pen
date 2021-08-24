import React from "react";

const CourseRequest = ({ data }) => {
  return (
    <table className="table table-hover mb-0">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Course Name</th>
          <th>User Name</th>
          <th>User Email</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.keyword}</td>
            <td>{item.user.name}</td>
            <td>{item.user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseRequest;
