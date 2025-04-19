import { Card, Tooltip } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const OverviewCharts = () => {
  const data = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 200 },
    { month: "Mar", users: 350 },
    { month: "Apr", users: 500 },
    { month: "May", users: 620 },
    { month: "Jun", users: 740 },
    { month: "Jul", users: 910 },
  ];

  return (
    <div className="p-4">
      <Card
        bordered={false}
        className="shadow-lg rounded-2xl hover:shadow-2xl transition duration-300"
        title={
          <span className="text-xl font-bold text-red-600">
            Customer Growth Overview
          </span>
        }
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f5222d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f5222d" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#f5222d"
              fillOpacity={1}
              fill="url(#colorRed)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default OverviewCharts;
