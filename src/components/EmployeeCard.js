import React from "react";
import "../assets/css/employeeCard.css";

// styles = {
//   card: {
//     width: "4rem",
//   },
// };

export default function EmployeeCard({
  firstName,
  lastName,
  image,
  phone,
  email,
  DOB,
}) {
  return (
    <div className="card">
      <div>
        <img className="card-img-top" alt={firstName} src={image} />
      </div>
      <div className="card-body">
        <p className="card-title">
          <strong>
            {firstName} {lastName}
          </strong>
        </p>

        <p className="card-text">
          <span className="identifier">Phone:</span> {phone}
        </p>

        <p className="card-text">
          <span className="identifier">Email:</span> {email}
        </p>

        <p className="card-text identifier">Birthday:</p>
        <p className="card-text">{DOB}</p>
      </div>
    </div>
  );
}
