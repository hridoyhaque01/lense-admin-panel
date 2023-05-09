import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ChartBar = ({ data }) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden flex items-center justify-center">
      <BarChart
        width={700}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#FC5B2B" />
        <Bar dataKey="uv" fill="#37B6B6" />
      </BarChart>
    </div>
  );
};

export default ChartBar;
