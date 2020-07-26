import React, { Component } from "react";
import EmployeeCard from "./EmployeeCard";
import api from "../utils/api";
import moment from "moment";
import "../assets/css/directoryContainer.css";

class Directory extends Component {
  state = {
    employees: [],
    filter: "none",
    // birthMonth: "none"
  };

  componentDidMount() {
    api.getUsers().then(({ data }) => {
      console.log(`data.results:>>`, data.results);
      this.setState({ employees: data.results });
      console.log(`this.state.employees:>>`, this.state.employees);
    });
  }

  // handleFilterChange = (filter) => {
  //   this.setState({ currentFilter: filter });
  // };
  //   sortAZ = () => {
  //     const newArray = this.state.employees.sort((a, b) => {
  //       return a.name.lastName - b.name.lastName;
  //     });
  //     console.log(newArray);
  //     // this.setState({ employees: newArray });
  //   };

  //function to sort employees array by last name
  //   sortAZ = () => {
  //     let a = this.state.employees[i];
  //     let b = this.state.employees[i + 1];

  //     if (a[this.state.employees.name].last < b[this.state.employees.name].last) {
  //       return -1;
  //     }
  //     if (a[this.state.employees.name].last > b[this.state.employees.name].last) {
  //       return 1;
  //     }
  //     return 0;
  //   };

  //onClick function to call sortAZ() and set state
  sortOnClick = () => {
    const sorted = this.sortAZ(this.state.employees);
    this.setState({ employees: sorted });
  };

  //function to compare birth month of employee with selected birth month
  filterBdayMonth = (month) => (employee) => {
    const birthMonth = moment(employee.dob.date, "YYYY MM DD").format(
      "M D YYYY"
    );
    console.log(`birthMonth:>>`, birthMonth);
  };

  render() {
    return (
      <div className="container">
        <div className="row" id="filterRow">
          <button
            className="btn btn-info"
            type="button"
            onClick={this.sortOnClick}
          >
            Sort A-Z
          </button>
          <button className="btn btn-info" type="button">
            Filter by Birthday Month
          </button>
        </div>
        <div className="row" id="employeeRow">
          {this.state.employees.map((employee, i) => (
            <EmployeeCard
              key={i}
              firstName={employee.name.first}
              lastName={employee.name.last}
              image={employee.picture.large}
              phone={employee.phone}
              email={employee.email}
              DOB={moment(employee.dob.date, "YYYY MM DD").format(
                "MMMM D YYYY"
              )}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Directory;
