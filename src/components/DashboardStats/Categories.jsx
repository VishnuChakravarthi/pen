import React from "react";

const Categories = ({ states, data }) => {
  return (
    <table className="table table-hover mb-0">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Category</th>
          {states.map((state, index) => (
            <th key={index}>{state}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.user_per_category_location.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.category}</td>
            {states.map((state, index) => (
              <td key={index}>{item[`${state}`]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Categories;
