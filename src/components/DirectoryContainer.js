import React, { Component } from "react";
import EmployeeCard from "./EmployeeCard";
import api from "../utils/api";
import moment from "moment";

class Directory extends Component {
  state = {
    employees: [],
  };

  componentDidMount() {
    api.getUsers().then(({ data }) => {
      console.log(`data.results:>>`, data.results);
      this.setState({ employees: data.results });
    });
  }

  //   handleFilterChange = (filter) => {
  //     this.setState({ currentFilter: filter });
  //   };
  //   sortAZ = () => {
  //     const newArray = this.state.employees.sort((a, b) => {
  //       return a.name.lastName - b.name.lastName;
  //     });
  //     console.log(newArray);
  //     // this.setState({ employees: newArray });
  //   };

  //function to sort employees array by last name
  sortAZ = function (a, b) {
    if (a.data.results.lastName < b.data.results.lastName) {
      return -1;
    }
    if (a.data.results.lastName > b.data.results.lastName) {
      return 1;
    }
    return 0;
  };

  //function to compare birth month of employee with selected birth month
  filterBdayMonth = function (a, b, i) {
    if (
      a.data[i].results.dob.date.moment().format("MM") <
      a.data[i].results.dob.date.moment().format("MM")
    ) {
      return -1;
    }
    if (
      a.data[i].results.dob.date.moment().format("MM") >
      a.data[i].results.dob.date.moment().format("MM")
    ) {
      return 1;
    }
    return 0;
  };

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
          <button
            className="dropdown-item"
            type="button"
            onClick={() => {
              this.sortAZ();
            }}
          >
            Sort A-Z
          </button>
        </div>
        <div className="row" id="employeeRow">
          {this.state.employees.map((employee, i) => (
            <EmployeeCard
              key={i}
              firstName={employee.name.first}
              lastName={employee.name.last}
              image={employee.picture.thumbnail}
              phone={employee.phone}
              email={employee.email}
              DOB={employee.dob.date.moment().format("D DD YYYY")}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Directory;
