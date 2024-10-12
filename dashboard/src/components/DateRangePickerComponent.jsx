// src/components/DateRangePickerComponent.js
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for react-datepicker
import "./DateRangePicker.css"; // Import your CSS file for styles

const DateRangePickerComponent = ({
  selectedDateRange,
  handleDateRangeChange,
}) => {
  // Ensure selectedDateRange is defined and has the correct structure
  const startDate = selectedDateRange[0]?.startDate || null;
  const endDate = selectedDateRange[0]?.endDate || null;

  return (
    <div className="date-range-picker">
      <label>Select Date Range:</label>
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            if (date) {
              handleDateRangeChange([
                { ...selectedDateRange[0], startDate: date },
              ]);
            }
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
          className="date-input"
        />
        <span> to </span>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            if (date) {
              handleDateRangeChange([
                { ...selectedDateRange[0], endDate: date },
              ]);
            }
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate} // Prevent selecting an end date before the start date
          dateFormat="yyyy/MM/dd"
          className="date-input"
        />
      </div>
    </div>
  );
};

export default DateRangePickerComponent;
