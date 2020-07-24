import React, { Component } from "react";
import EmployeeCard from "./EmployeeCard";
import api from "../utils/api";

class Directory extends Component {
  state = {
    employees,
  };

  componentDidMount() {
    let employees;
    return (employees = api());
  }

  //   handleFilterChange = (filter) => {
  //     this.setState({ currentFilter: filter });
  //   };

  render() {
    return (
      <div className="container">
        <div className="row" id="filterRow">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            id="filterButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Filter Results
          </button>
          <div className="dropdown-menu" aria-labelledby="filterButton">
            <button className="dropdown-item" type="button">
              View by Department
            </button>
          </div>
        </div>
        <div className="row" id="employeeRow">
          {this.state.employees.map((employee) => {
            <EmployeeCard
              name={employee.name}
              image={employee.image}
              phone={employee.phone}
              email={employee.email}
              DateofBirth={employee.dateofbirth}
            />;
          })}
        </div>
      </div>
    );
  }
}

export default Directory;
