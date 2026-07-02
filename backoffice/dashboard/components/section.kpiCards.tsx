"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { KpiCardDTO } from "../models/dto";
import { Users, CreditCard, Briefcase, Layers, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface SectionKpiCardsProps {
  data: KpiCardDTO | undefined;
  isLoading: boolean;
}

// Simulated trend data (replace with real API data when available)
const trendData: Record<string, { value: number; label: string }> = {
  totalUsers: { value: 12.5, label: "vs mes anterior" },
  usersWithPlan: { value: 8.2, label: "vs mes anterior" },
  totalWorkspaces: { value: -2.1, label: "vs mes anterior" },
  totalPlans: { value: 0, label: "vs mes anterior" },
};

const kpiConfig = [
  {
    key: "totalUsers" as const,
    label: "Usuarios totales",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    key: "usersWithPlan" as const,
    label: "Suscritos",
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    key: "totalWorkspaces" as const,
    label: "Workspaces",
    icon: Briefcase,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    borderColor: "border-violet-500/20",
  },
  {
    key: "totalPlans" as const,
    label: "Planes activos",
    icon: Layers,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
];

function TrendIndicator({ value }: { value: number }) {
  if (value > 0) {
    return (
      <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
        <TrendingUp className="h-3 w-3" />
        <span>+{value}%</span>
      </div>
    );
  }
  if (value < 0) {
    return (
      <div className="flex items-center gap-1 text-red-500 text-xs font-medium">
        <TrendingDown className="h-3 w-3" />
        <span>{value}%</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium">
      <Minus className="h-3 w-3" />
      <span>0%</span>
    </div>
  );
}

export const SectionKpiCards = ({ data, isLoading }: SectionKpiCardsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiConfig.map((kpi) => {
        const Icon = kpi.icon;
        const value = data ? data[kpi.key] : 0;
        const trend = trendData[kpi.key];

        return (
          <Card
            key={kpi.key}
            className={`relative overflow-hidden border ${kpi.borderColor} transition-shadow hover:shadow-md`}
          >
            {/* Subtle gradient background */}
            <div className={`absolute inset-0 opacity-[0.03] ${kpi.bg.replace('/10', '')}`} />
            
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
              <div className={`rounded-lg ${kpi.bg} p-2.5`}>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            
            <CardContent className="relative">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-8 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-3xl font-bold tracking-tight">
                    {value.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendIndicator value={trend.value} />
                    <span className="text-xs text-muted-foreground">
                      {trend.label}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
