"use client";

import { SectionKpiCards } from "./section.kpiCards";
import { SectionGrowthChart } from "./section.growthChart";
import { SectionPopularPlans } from "./section.popularPlans";
import { SectionRecentActivity } from "./section.recentActivity";
import { SectionUserStatus } from "./section.userStatus";
import { SectionRecentUsers } from "./section.recentUsers";

import { useKpis } from "../hooks/useKpis";
import { useGrowth } from "../hooks/useGrowth";
import { usePopularPlans } from "../hooks/usePopularPlans";
import { useRecentActivities } from "../hooks/useRecentActivities";
import { useUserStatus } from "../hooks/useUserStatus";
import { useRecentUsers } from "../hooks/useRecentUsers";

export const DashboardScreen = () => {
  const { data: kpisData, isLoading: kpisLoading } = useKpis();
  const { data: growthData, isLoading: growthLoading } = useGrowth("users", "week");
  const { data: popularPlansData, isLoading: popularPlansLoading } = usePopularPlans();
  const { data: activitiesData, isLoading: activitiesLoading } = useRecentActivities();
  const { data: userStatusData, isLoading: userStatusLoading } = useUserStatus();
  const { data: recentUsersData, isLoading: recentUsersLoading } = useRecentUsers();

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Fila 1: KPIs */}
      <SectionKpiCards
        data={kpisData?.data?.kpis}
        isLoading={kpisLoading}
      />

      {/* Fila 2: Gráfico de crecimiento */}
      <SectionGrowthChart
        data={growthData?.data?.metrics?.data}
        isLoading={growthLoading}
      />

      {/* Fila 3: Top planes + Actividad reciente */}
      <div className="grid gap-6 md:grid-cols-2">
        <SectionPopularPlans
          data={popularPlansData?.data?.list}
          isLoading={popularPlansLoading}
        />
        <SectionRecentActivity
          data={activitiesData?.data?.list}
          isLoading={activitiesLoading}
        />
      </div>

      {/* Fila 4: Estado usuarios + Últimos usuarios */}
      <div className="grid gap-6 md:grid-cols-2">
        <SectionUserStatus
          data={userStatusData?.data?.metrics}
          isLoading={userStatusLoading}
        />
        <SectionRecentUsers
          data={recentUsersData?.data?.list}
          isLoading={recentUsersLoading}
        />
      </div>
    </div>
  );
};
