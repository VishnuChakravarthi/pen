import React from "react";

const CatGender = ({ data }) => {
  return (
    <table className="table table-hover mb-0">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Category</th>
          <th>Courses Count</th>
          <th>Female</th>
          <th>Male</th>
          <th>Others</th>
        </tr>
      </thead>
      <tbody>
        {data.user_per_category_gender.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.category}</td>
            <td>{item.courses_count}</td>
            <td>{item.female}</td>
            <td>{item.male}</td>
            <td>{item.others}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CatGender;
