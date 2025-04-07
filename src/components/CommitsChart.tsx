import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CommitDay {
  date: string;
  count: number;
}

interface Props {
  data: CommitDay[];
}

const CommitsChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-gray-800 p-6 mt-10 rounded-lg shadow-md text-white">
      <h3 className="text-xl font-bold mb-4">Commits (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#555" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommitsChart;
