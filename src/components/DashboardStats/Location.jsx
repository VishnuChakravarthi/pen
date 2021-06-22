import React from "react";

const Location = ({ states, data }) => {
  return (
    <table className="table table-hover mb-0">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Course Name</th>
          {states.map((state, index) => (
            <th key={index}>{state}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.user_per_course_location.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.course_name}</td>
            {states.map((state, index) => (
              <td key={index}>{item[`${state}`]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Location;
