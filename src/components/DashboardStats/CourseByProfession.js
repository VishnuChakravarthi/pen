import React from "react";

const CourseByProfession = ({ data }) => {
  return (
    <table className="table table-hover mb-0">
      <thead>
        <tr>
          <th>Sno</th>
          <th>School Student</th>
          <th>College Student</th>
          <th>Employed</th>
          <th>Unemployed</th>
          <th>Self-Employed</th>
          <th>Business Owner</th>
          <th>Not Specified</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.school_students}</td>
            <td>{item.college_students}</td>
            <td>{item.employed}</td>
            <td>{item.unemployed}</td>
            <td>{item.self_employed}</td>
            <td>{item.business_owners}</td>
            <td>{item.unspecified}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseByProfession;
