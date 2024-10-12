// src/components/LineChart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Brush,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data, feature }) => {
  // Aggregate data by Day for the selected feature
  const aggregatedData = data.reduce((acc, item) => {
    const day = new Date(item.Day).toLocaleDateString();
    if (!acc[day]) {
      acc[day] = { Day: day, value: 0 };
    }
    acc[day].value += Number(item[feature] || 0);
    return acc;
  }, {});

  const chartData = Object.values(aggregatedData).sort(
    (a, b) => new Date(a.Day) - new Date(b.Day)
  );

  return (
    <div className="recharts-wrapper-main lineChart">
      <h2>Trend for Feature {feature}</h2>
      <ResponsiveContainer width="96%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          <Brush dataKey="Day" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
