import React from "react";
import "../assets/css/filter.css";

export default function Filter(props) {
  return (
    <form className="form form-inline">
      <div className="form-group">
        <label htmlFor="birthMonth">Filter by birth month</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. January, February"
          aria-label="Birth Month"
          //   onChange={props.handleInputChange}
          aria-describedby="filterMonthBtn"
          value={props.birthMonth}
          name="birthMonth"
          id="birthMonth"
        />

        <button
          className="btn btn-outline-primary"
          type="submit"
          id="filterMonthBtn"
          onClick={props.handleFormSubmit}
        >
          Filter
        </button>
      </div>
    </form>
  );
}
