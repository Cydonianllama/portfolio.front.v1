"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { UserStatusMetricsDTO } from "../models/dto";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";

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

  const total = data ? data.actived + data.blocked + data.desactived : 0;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <CardTitle>Estado de usuarios</CardTitle>
        </div>
        <CardDescription>
          {isLoading ? "Cargando..." : `${total.toLocaleString()} usuarios en total`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Skeleton className="h-[200px] w-[200px] rounded-full" />
            <div className="mt-4 flex w-full justify-around">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-16" />
              ))}
            </div>
          </div>
        ) : total === 0 ? (
          <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
            Sin datos de usuarios
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent 
                        hideLabel 
                        formatter={(value: number, name: string) => [
                          `${value} (${total > 0 ? ((value / total) * 100).toFixed(1) : 0}%)`,
                          name,
                        ]}
                      />
                    } 
                  />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="hsl(var(--card))"
                    strokeWidth={3}
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
            
            {/* Legend with percentages */}
            <div className="mt-4 grid w-full grid-cols-3 gap-2">
              {chartData.map((item) => {
                const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0";
                return (
                  <div key={item.key} className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-2">
                    <div className="flex items-center gap-1.5">
                      <div 
                        className="h-2.5 w-2.5 rounded-full" 
                        style={{ backgroundColor: `var(--color-${item.key})` }}
                      />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-lg font-semibold">{item.value}</span>
                    <span className="text-[10px] text-muted-foreground">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
