import React from "react";
import "../assets/css/employeeTableRow.css";

export default function EmployeeTableRow({
  firstName,
  lastName,
  image,
  phone,
  email,
  DOB,
}) {
  return (
    <>
      <tr>
        <td>
          <img alt={firstName} src={image} />
        </td>
        <td>
          <strong>{firstName}</strong>
        </td>
        <td>
          <strong>{lastName}</strong>
        </td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>{DOB}</td>
      </tr>
    </>
  );
}
