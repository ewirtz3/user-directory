import React, { Component } from "react";
import EmployeeTableRow from "./EmployeeTableRow";
import api from "../utils/api";
import moment from "moment";
import "../assets/css/directoryContainer.css";

export default class Directory extends Component {
  state = {
    employees: [],
    birthMonth: "",
  };

  //api call is made as soon as component is mounted to the DOM
  componentDidMount() {
    api.getUsers().then(({ data }) => {
      this.setState({ employees: data.results });
    });
  }

  //function to get the value and name of the input
  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  //onClick function to sort employees array by last name and set state
  sortOnClick = () => {
    const sorted = this.state.employees.sort((a, b) =>
      a.name.last > b.name.last ? 1 : b.name.last > a.name.last ? -1 : 0
    );
    this.setState({ employees: sorted });
  };

  //function to compare birth month of employee with selected birth month
  filterBdayMonth = (month) => (employee) => {
    const birthMonth = moment(employee.dob.date, "YYYY MM DD").format("MMMM");
    return birthMonth.toLowerCase() === month.toLowerCase();
  };

  //function to run filterBdayMonth on employees array based on user input
  renderFiltered = (event) => {
    event.preventDefault();
    const input = event.target.children[0].children[1].value;
    const matches = this.state.employees.filter(this.filterBdayMonth(input));
    this.setState({ employees: matches, birthMonth: "" });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="row" id="sortRow">
              <button
                className="btn"
                type="button"
                id="sortBtn"
                onClick={this.sortOnClick}
              >
                Sort A-Z
              </button>
            </div>
            <div className="row" id="filterRow">
              <form className="form form-inline" onSubmit={this.renderFiltered}>
                <div className="form-group">
                  <label htmlFor="birthMonth">Filter by birth month</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. January, February"
                    aria-label="Birth Month"
                    aria-describedby="filterMonthBtn"
                    name="birthMonth"
                    id="birthMonth"
                    onChange={this.handleInputChange}
                    value={this.state.birthMonth}
                  />
                  <button className="btn" type="submit" id="filterMonthBtn">
                    Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row" id="employeeRow">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>DOB</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee, i) => (
                <EmployeeTableRow
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
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
