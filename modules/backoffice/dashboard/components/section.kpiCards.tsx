import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { KpiCardDTO } from "../models/dto";
import { Users, CreditCard, Briefcase, Layers } from "lucide-react";

interface SectionKpiCardsProps {
  data: KpiCardDTO | undefined;
  isLoading: boolean;
}

const kpiConfig = [
  {
    key: "totalUsers" as const,
    label: "Usuarios",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    key: "usersWithPlan" as const,
    label: "Suscritos",
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    key: "totalWorkspaces" as const,
    label: "Workspaces",
    icon: Briefcase,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    key: "totalPlans" as const,
    label: "Planes",
    icon: Layers,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export const SectionKpiCards = ({ data, isLoading }: SectionKpiCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiConfig.map((kpi) => {
        const Icon = kpi.icon;
        const value = data ? data[kpi.key] : 0;

        return (
          <Card key={kpi.key}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
              <div className={`rounded-md ${kpi.bg} p-2`}>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{value.toLocaleString()}</div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
