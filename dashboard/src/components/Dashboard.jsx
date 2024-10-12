// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import BarChartComponent from "./BarChartComponent";
import LineChartComponent from "./LineChartComponent";
import Filters from "./Filters";
import DateRangePickerComponent from "./DateRangePickerComponent";
import { fetchData } from "../api";

const Dashboard = ({
  ageFilter,
  setAgeFilter,
  genderFilter,
  setGenderFilter,
}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date("2022-10-01"),
      endDate: new Date("2022-10-31"),
      key: "selection",
    },
  ]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch data from API on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Apply filters whenever data or filters change
  useEffect(() => {
    if (data.length === 0) return;

    const filterData = () => {
      const filtered = data.filter((item) => {
        const itemDate = new Date(item.Day);
        return (
          item.Age === ageFilter &&
          item.Gender === genderFilter &&
          itemDate >= selectedDateRange[0].startDate &&
          itemDate <= selectedDateRange[0].endDate
        );
      });
      setFilteredData(filtered);
    };
    filterData();
  }, [data, ageFilter, genderFilter, selectedDateRange]);

  // Update date range safely
  const handleDateRangeChange = (ranges) => {
    if (ranges && ranges.length > 0) {
      setSelectedDateRange([
        {
          startDate: ranges[0]?.startDate || selectedDateRange[0].startDate,
          endDate: ranges[0]?.endDate || selectedDateRange[0].endDate,
          key: "selection",
        },
      ]);
    }
  };

  const handleBarClick = (feature) => {
    setSelectedFeature(feature);
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>Error fetching data. Please try again later.</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Product Analytics Platform</h1>

      <Filters
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
      />

      <DateRangePickerComponent
        selectedDateRange={selectedDateRange}
        handleDateRangeChange={handleDateRangeChange}
      />

      {/* Instruction for clicking on the bar chart */}
      <p className="instruction">
        Click on any bar in the chart to view detailed trends in the line chart.
      </p>

      <div className="charts">
        <BarChartComponent data={filteredData} onBarClick={handleBarClick} />
        {selectedFeature && (
          <LineChartComponent data={filteredData} feature={selectedFeature} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
