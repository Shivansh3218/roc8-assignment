// src/components/BarChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data, onBarClick }) => {
  const features = ["A", "B", "C", "D", "E", "F"];

  // Aggregate data for the bar chart
  const aggregatedData = features.map((feature) => {
    const total = data.reduce(
      (sum, item) => sum + Number(item[feature] || 0),
      0
    );
    return { feature, total };
  });

  console.log(aggregatedData, data);
  return (
    <div className="recharts-wrapper-main">
      <h2>Feature Usage</h2>
      <ResponsiveContainer width="96%" height={400}>
        <BarChart
          data={aggregatedData}
          onClick={(data) => onBarClick(data.activeLabel)}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
