"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UserStatusMetricsDTO } from "../models/dto";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SectionUserStatusProps {
  data: UserStatusMetricsDTO | undefined;
  isLoading: boolean;
}

const chartConfig = {
  actived: {
    label: "Activos",
    color: "hsl(var(--chart-1))",
  },
  blocked: {
    label: "Bloqueados",
    color: "hsl(var(--chart-2))",
  },
  desactived: {
    label: "Desactivados",
    color: "hsl(var(--chart-3))",
  },
};

export const SectionUserStatus = ({ data, isLoading }: SectionUserStatusProps) => {
  const chartData = data
    ? [
        { name: "Activos", value: data.actived, key: "actived" },
        { name: "Bloqueados", value: data.blocked, key: "blocked" },
        { name: "Desactivados", value: data.desactived, key: "desactived" },
      ]
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[250px] w-full" />
        ) : (
          <div className="flex flex-col items-center">
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartData.map((entry) => (
                      <Cell
                        key={entry.key}
                        fill={`var(--color-${entry.key})`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 flex w-full justify-around text-sm">
              {chartData.map((item) => (
                <div key={item.key} className="flex flex-col items-center gap-1">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
