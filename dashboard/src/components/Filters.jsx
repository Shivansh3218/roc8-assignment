// src/components/Filters.js
import React from "react";

const Filters = ({
  ageFilter,
  setAgeFilter,
  genderFilter,
  setGenderFilter,
}) => {
  return (
    <div className="filter-container">
      <div>
        <label>Age Filter:</label>
        <select
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
        >
          <option value="15-25">15-25</option>
          <option value=">25">25</option>
        </select>
      </div>

      <div>
        <label>Gender Filter:</label>
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
