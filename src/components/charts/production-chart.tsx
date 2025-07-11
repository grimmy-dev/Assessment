"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
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
} from "@/components/ui/chart";

interface ProductionData {
  product_line: string;
  production: number;
}

const chartConfig = {
  production: {
    label: "Production",
  },
} satisfies ChartConfig;

export default function ProductionChart() {
  const { data: rawData, isLoading } = useQuery<ProductionData[]>({
    queryKey: ["production-data"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/production-data");
      if (!response.ok) {
        throw new Error("Failed to fetch production data");
      }
      return response.json();
    },
  });

  if (isLoading)
    return (
      <div className="w-full h-[445px] mx-auto bg-muted rounded-md animate-pulse" />
    );

  const colors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  const chartData = rawData!.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }));

  const totalProduction = chartData.reduce(
    (sum, item) => sum + item.production,
    0
  );

  return (
    <Card className="border-none shadow-none h-[445px] bg-slate-100">
      <CardHeader>
        <CardTitle>Production Volume by Product Line</CardTitle>
        <CardDescription>
          Monthly Production Units - Current Period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-64">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid gap-2">
                        <div className="flex flex-col">
                          <span className="text-xs uppercase font-medium">
                            {data.product_line}
                          </span>
                          <span className="font-mono">
                            {data.production.toLocaleString()} units
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={chartData}
              dataKey="production"
              nameKey="product_line"
              strokeWidth={10}
              outerRadius={115}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total production: {totalProduction.toLocaleString()} units
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing monthly production volume across all divisions
        </div>
      </CardFooter>
    </Card>
  );
}
