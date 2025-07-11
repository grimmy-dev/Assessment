"use client";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";

const chartConfig = {
  revenue: {
    label: "Revenue ($M)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function RevenueChart() {
  const { data: revenueData, isLoading } = useQuery({
    queryKey: ["revenueData"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/revenue");
      if (!res.ok) throw new Error("Failed to fetch revenue data");
      return res.json();
    },
  });
  if (isLoading)
    return (
      <div className="w-full h-96 mx-auto bg-muted rounded-md animate-pulse" />
    );

  return (
    <Card className="border-none shadow-none h-96 bg-fuchsia-50">
      <CardHeader>
        <CardTitle>Wayne Enterprises - Quarterly Revenue</CardTitle>
        <CardDescription>2023 - Present</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-h-64">
          <LineChart
            accessibilityLayer
            data={revenueData}
            margin={{
              left: 30,
              right: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={true}
              axisLine={true}
              tickFormatter={(value) => value.replace(" ", "\n")}
              tickMargin={4}
              fontSize={10}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value) => [
                    `$${value.toLocaleString()} M Revenue`,
                  ]}
                />
              }
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-revenue)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={10}
                formatter={(value: string) => `$${value.toLocaleString()}M`}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
