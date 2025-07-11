"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface DivisionStatus {
  division: string;
  Active: number;
  Completed: number;
  Paused: number;
}

export default function RDChart() {
  const { data, isLoading } = useQuery<DivisionStatus[]>({
    queryKey: ["rdData"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/rd-status");
      if (!res.ok) throw new Error("Failed to fetch R&D data");
      return res.json();
    },
  });

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.map((d) => ({
      division: d.division.replace("Wayne ", ""),
      Active: d.Active,
      Completed: d.Completed,
      Paused: d.Paused,
    }));
  }, [data]);

  if (isLoading)
    return (
      <div className="w-full h-[440px] mx-auto bg-muted rounded-md animate-pulse" />
    );
  return (
    <Card className="border-none shadow-none h-[440px] mb-10 bg-sky-50">
      <CardHeader>
        <CardTitle>Division Status Comparison</CardTitle>
        <CardDescription>
          R&D project distribution across Wayne divisions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-4">
        <div className="h-80 text-xs">
          <ResponsiveContainer width="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="division" className="text-xs" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Active" fill="#22c55e" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Completed" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Paused" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
