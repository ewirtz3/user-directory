import React from "react";

export default function EmployeeCard({
  name,
  image,
  phone,
  email,
  dateofbirth,
}) {
  return (
    <div className="card">
      <div className="img-container">
        <img alt={name} src={image} />
      </div>
      <div className="content">
        <ul>
          <li>
            <p>Name: {name}</p>
          </li>
          <li>
            <p>Phone: {phone}</p>
          </li>
          <li>
            <p>Email: {email}</p>
          </li>
          <li>
            <p>DOB: {dateofbirth}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
