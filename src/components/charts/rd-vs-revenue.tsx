"use client";
import { ChartConfig, ChartContainer, ChartTooltip } from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts";

//prepared this based on the datasets
const chartData = [
  {
    division: "Wayne Aerospace",
    rdInvestment: 160.79,
    revenueGrowth: 55.99,
    x: 160.79,
    y: 55.99,
  },
  {
    division: "Wayne Biotech",
    rdInvestment: 125.75,
    revenueGrowth: 65.31,
    x: 125.75,
    y: 65.31,
  },
  {
    division: "Wayne Applied Sciences",
    rdInvestment: 98.38,
    revenueGrowth: 70.64,
    x: 98.38,
    y: 70.64,
  },
  {
    division: "Wayne Construction",
    rdInvestment: 114.38,
    revenueGrowth: 60.93,
    x: 114.38,
    y: 60.93,
  },
  {
    division: "Wayne Foundation",
    rdInvestment: 37.25,
    revenueGrowth: 102.33,
    x: 37.25,
    y: 102.33,
  },
];

const chartConfig = {
  rdInvestment: {
    label: "R&D Investments ($M)",
    color: "var(--chart-1)",
  },
  revenueGrowth: {
    label: "Revenue Growth (%",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const RDRevenueChart = () => {
  return (
    <Card className="bg-rose-50 max-h-96 border-none shadow-none">
      <CardHeader>
        <CardTitle>R&D Investments Vs Revenue Growth</CardTitle>
        <CardDescription>
          Correlation analysis across Wayne enterprises divisions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-h-64">
          <ResponsiveContainer>
            <ScatterChart data={chartData}>
              <CartesianGrid strokeDasharray={"3 3"} />
              <XAxis
                type="number"
                dataKey="x"
                name="R&D Investments"
                unit="M"
                tickFormatter={(value) => `$${value}`}
                domain={["dataMin-20", "dataMax+20"]}
              />

              <YAxis
                type="number"
                dataKey="y"
                name="Revenue Growth"
                unit="%"
                tickFormatter={(value) => `${value.toFixed(0)}%`}
                domain={["dataMin-20", "dataMax+20"]}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-1 rounded-lg flex flex-col gap-1 bg-white border">
                        <p className="text-xs font-medium">{data.division}</p>
                        <p className="text-xs">
                          R&D Investments: ${data.rdInvestment.toFixed(1)}M
                        </p>
                        <p className="text-xs">
                          Revenue Growth: {data.revenueGrowth.toFixed(1)}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter
                name="Divisions"
                data={chartData}
                fill="var(--color-rdInvestment)"
                r={6}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RDRevenueChart;
