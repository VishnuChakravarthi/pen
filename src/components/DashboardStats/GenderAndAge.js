import React from "react";

const GenderAndAge = ({ data }) => {
  console.log("jsdhsjadhsajdhsajhd", data);
  return (
    <table className="table table-hover mb-0">
      <thead>
        <tr>
          <th colspan="1">S.No</th>
          <th colspan="2" style={{ textAlign: "center" }}>
            Gender
          </th>
          <th colspan="5" style={{ textAlign: "center" }}>
            Age
          </th>
        </tr>
        <tr>
          <th></th>
          <th>Male</th>
          <th>Female</th>
          <th>Category 1</th>
          <th>Category 2</th>
          <th>Category 3</th>
          <th>Category 4</th>
          <th>Not Specified</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.male}</td>
            <td>{item.female}</td>
            <td>{item.agegroupA}</td>
            <td>{item.agegroupB}</td>
            <td>{item.agegroupC}</td>
            <td>{item.agegroupD}</td>
            <td>{item.notmentioned}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenderAndAge;
