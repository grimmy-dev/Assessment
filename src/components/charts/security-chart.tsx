"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export const description = "A bar chart";

const chartConfig = {
  totalIncidents: {
    label: "Total Incidents",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function SecurityChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["incidents"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/incidents");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="w-full h-96 mx-auto bg-muted rounded-md animate-pulse" />
    );

  return (
    <Card className="border-none shadow-none bg-amber-50 max-h-96">
      <CardHeader>
        <CardTitle>Security Incidents</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full max-h-64">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickMargin={12}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis dataKey="totalIncidents" tickCount={3}/>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="totalIncidents"
              fill="var(--color-totalIncidents)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}