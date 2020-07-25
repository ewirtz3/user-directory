import React from "react";

export default function EmployeeCard({
  firstName,
  lastName,
  image,
  phone,
  email,
  age,
}) {
  return (
    <div className="card">
      <div className="img-container">
        <img alt={firstName} src={image} />
      </div>
      <div className="content">
        <ul>
          <li>
            <p>
              Name: {firstName} {lastName}
            </p>
          </li>
          <li>
            <p>Phone: {phone}</p>
          </li>
          <li>
            <p>Email: {email}</p>
          </li>
          <li>
            <p>Age: {age}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
