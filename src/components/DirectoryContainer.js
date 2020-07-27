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

  //api call is made as soon as component is mounted to the DOM
  componentDidMount() {
    api.getUsers().then(({ data }) => {
      console.log(`data.results:>>`, data.results);
      this.setState({ employees: data.results });
    });
  }

  //onClick function to sort employees array by last name and set state
  sortOnClick = () => {
    const sorted = this.state.employees.sort((a, b) =>
      a.name.last > b.name.last ? 1 : b.name.last > a.name.last ? -1 : 0
    );
    this.setState({ employees: sorted });
  };

  //function to compare birth month of employee with selected birth month
  filterBdayMonth = (month) => (employee) => {
    const birthMonth = moment(employee.dob.date, "YYYY MM DD").format(
      "M D YYYY"
    );
    console.log(`birthMonth:>>`, birthMonth);
  };

  //function to handle form submit
  handleFilter = (e) => {
    e.preventDefault();
    console.log(`e:>>`, e);
    // this.filterBdayMonth(e.target.value);
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="row" id="sortRow">
              <button
                className="btn btn-outline-primary"
                type="button"
                id="sortBtn"
                onClick={this.sortOnClick}
              >
                Sort A-Z
              </button>
            </div>
            <div className="row" id="filterRow">
              <form className="form-inline" onSubmit={this.handleFilter}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Filter by birth month"
                    aria-label="Birth Month"
                    aria-describedby="filterMonthBtn"
                  />

                  <button
                    className="btn btn-outline-primary"
                    type="submit"
                    id="filterMonthBtn"
                  >
                    Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
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
