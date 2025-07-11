"use client";

import React, { useState, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const departments = [
  "Wayne Aerospace",
  "Wayne Biotech",
  "Wayne Applied Sciences",
] as const;

const chartConfig = {
  retention_rate: {
    label: "Retention Rate (%)",
    color: "var(--chart-3)",
  },
  satisfaction_score: {
    label: "Satisfaction Score",
    color: "var(--chart-4)",
  },
};

type MetricKey = keyof typeof chartConfig;

interface ChartData {
  department: string;
  employee_level: string;
  retention_rate: number;
  satisfaction_score: number;
}

export default function HRMetricsChart() {
  const { data: chartData = [], isLoading } = useQuery<ChartData[]>({
    queryKey: ["hrMetrics"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/hr-metrics");
      if (!res.ok) throw new Error("Failed to fetch HR metrics");
      return res.json();
    },
  });

  const [activeChart, setActiveChart] = useState<MetricKey>("retention_rate");
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>("Wayne Aerospace");

  const filteredData = useMemo(() => {
    return chartData.filter((item) => item.department === selectedDepartment);
  }, [selectedDepartment, chartData]);

  const total = useMemo(() => {
    return {
      retention_rate: filteredData.reduce(
        (acc, curr) => acc + curr.retention_rate,
        0
      ),
      satisfaction_score: filteredData.reduce(
        (acc, curr) => acc + curr.satisfaction_score,
        0
      ),
    };
  }, [filteredData]);

  if (isLoading)
    return (
      <div className="w-full h-[480px] mx-auto bg-muted rounded-md animate-pulse" />
    );

  return (
    <Card className="border-none shadow-none h-[480px] bg-blue-50">
      <CardHeader>
        <CardTitle>
          Retention rate and Employee satisfaction by Department
        </CardTitle>
        <CardDescription>
          Employee satisfaction and retention rates by level
        </CardDescription>
        <div className="mt-2">
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 mt-2">
          {(["retention_rate", "satisfaction_score"] as const).map((key) => {
            const average = filteredData.length
              ? total[key] / filteredData.length
              : 0;
            return (
              <Button
                key={key}
                size="sm"
                variant="outline"
                data-active={activeChart === key}
                onClick={() => setActiveChart(key)}
                className={cn(
                  activeChart === key
                    ? "bg-primary text-primary-foreground"
                    : ""
                )}
              >
                <span className="text-xs">{chartConfig[key].label}</span>
                <span className="text-sm leading-none font-bold">
                  {key === "retention_rate"
                    ? `${average.toFixed(1)}%`
                    : average.toFixed(1)}
                </span>
              </Button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-64">
          <BarChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="employee_level"
              
              tickMargin={2}
            />
            <YAxis
              tickLine={true}
              axisLine={false}
              label={{
                value:
                  activeChart === "retention_rate"
                    ? "Retention Rate (%)"
                    : "Satisfaction Score",
                angle: -90,
                position: "insideMiddle",
              }}
            />
            <ChartTooltip
              content={<ChartTooltipContent nameKey="employee_level" />}
            />
            <Bar
              dataKey={activeChart}
              fill={chartConfig[activeChart].color}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
