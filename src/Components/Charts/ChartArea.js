import React from "react";
import {
  CartesianGrid,
  XAxis,
  Tooltip,
  Area,
  ComposedChart,
  Line,
} from "recharts";

const ChartArea = ({ data }) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden flex items-center justify-center">
      <ComposedChart
        width={700}
        height={300}
          data={data}
          margin={{
            top: 5,
            right: 5,
            bottom: 5,
            left: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" fill="#FC5B2B" stroke="#FC5B2B" />
          <Line type="monotone" dataKey="pv" stroke="#00AE5B" />
        </ComposedChart>
    </div>
  );
};

export default ChartArea;
