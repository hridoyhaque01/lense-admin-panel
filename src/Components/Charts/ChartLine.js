import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartLine = ({ data }) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden flex items-center justify-center">
      <LineChart
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
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#FC5B2B"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#37B6B6" />
      </LineChart>
    </div>
  );
};

export default ChartLine;
