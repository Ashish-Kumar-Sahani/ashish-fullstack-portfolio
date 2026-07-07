import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export default function AnalyticsChart({
  data,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        Portfolio Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}