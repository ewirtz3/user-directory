import React, { Component } from "react";
import EmployeeCard from "./EmployeeCard";
import api from "../utils/api";
import moment from "moment";
import "../assets/css/directoryContainer.css";

export default class Directory extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { employees: [], currentFilter: "users", birthMonth: "" };
  //   this.renderFiltered = this.renderFiltered.bind(this);
  // }

  state = {
    employees: [],
    currentFilter: "users",
    birthMonth: "",
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

  //function to handle filter change
  handleInputChange = (event) => {
    console.log(`Filter handleInputChg event:>>`, event);
    this.setState({ birthMonth: event.target.value });
  };

  //function to compare birth month of employee with selected birth month
  filterBdayMonth = (month) => (employee) => {
    console.log(`month:>>`, month);
    const birthMonth = moment(employee.dob.date, "YYYY MM DD").format("MMMM");
    console.log(`birthMonth:>>`, birthMonth);
    return birthMonth.toLowerCase() === month.toLowerCase();
  };

  //function to run filterBdayMonth on employees array based on user input
  renderFiltered = (event) => {
    event.persist();
    event.preventDefault();
    console.log(`event:>>`, event.target.siblings);
    const matches = this.state.employees.filter(
      this.filterBdayMonth(event.target.value)
    );
    this.setState({ employees: matches });
  };

  //function to get the value and name of the input and update state
  //   handleFilterInput = (event) => {
  //     console.log(`handleFilterInput event:>>`, event);
  //   };

  //function to handle form submit
  //   handleFilter = (event) => {
  //     event.preventDefault();
  //     console.log(`handleFilter event:>>`, event);
  //     // this.filterBdayMonth(e.target.value);
  //   };

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
              <form className="form form-inline" onSubmit={this.renderFiltered}>
                <div className="form-group">
                  <label htmlFor="birthMonth">Filter by birth month</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. January, February"
                    aria-label="Birth Month"
                    //   onChange={props.handleInputChange}
                    aria-describedby="filterMonthBtn"
                    name="birthMonth"
                    id="birthMonth"
                  />
                  <button
                    className="btn btn-outline-primary"
                    type="submit"
                    id="filterMonthBtn"
                    // onClick={this.renderFiltered}
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
        <button
          className="btn btn-outline-primary"
          type="submit"
          id="filterMonthBtn"
          onClick={this.renderFiltered}
        >
          Filter
        </button>
      </div>
    );
  }
}
