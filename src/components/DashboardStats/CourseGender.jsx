import React from "react";

const CourseGender = ({ data }) => {
  return (
    <table className="table table-hover mb-0">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Course Name</th>
          <th>Female</th>
          <th>Male</th>
          <th>Others</th>
        </tr>
      </thead>
      <tbody>
        {data.user_per_course_gender.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.course_name}</td>
            <td>{item.female}</td>
            <td>{item.male}</td>
            <td>{item.others}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseGender;
