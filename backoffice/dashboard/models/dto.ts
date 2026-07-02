export interface ActivityItemDTO {
  itemIdAction?: string | undefined;
  itemName?: string | undefined;
  itemIdentity?: string | undefined;
}

export interface ActivityLogDTO {
  id: string;
  originAction: string;
  userIdAction: string;
  typeAction: string;
  actions: Array<ActivityItemDTO>;
  creationDate: Date;
}

export interface GetRecentActivitiesResponseDTO {
  list: Array<ActivityLogDTO>;
}

export interface ConversionMetricsDTO {
  totalUsers: number;
  usersWithPlan: number;
  conversionRate: number;
}

export interface GetConversionResponseDTO {
  metrics: ConversionMetricsDTO;
}

export interface GrowthDataPointDTO {
  label: string;
  count: number;
}

export interface GrowthMetricsDTO {
  period: string;
  data: Array<GrowthDataPointDTO>;
}

export interface GetGrowthResponseDTO {
  metrics: GrowthMetricsDTO;
}

export interface KpiCardDTO {
  totalUsers: number;
  usersWithPlan: number;
  totalWorkspaces: number;
  totalPlans: number;
}

export interface GetKpisResponseDTO {
  kpis: KpiCardDTO;
}

export interface PopularPlanDTO {
  id: string;
  name: string;
  count: number;
}

export interface GetPopularPlansResponseDTO {
  list: Array<PopularPlanDTO>;
}

export interface RecentUserDTO {
  id: string;
  fullname: string;
  planName: string | null;
  creationDate: Date;
}

export interface GetRecentUsersResponseDTO {
  list: Array<RecentUserDTO>;
}

export interface RecentWorkspaceDTO {
  id: string;
  name: string;
  mainUser: {
    id: string;
    fullname: string;
  } | null;
  creationDate: Date;
}

export interface GetRecentWorkspacesResponseDTO {
  list: Array<RecentWorkspaceDTO>;
}

export interface UserStatusMetricsDTO {
  actived: number;
  blocked: number;
  desactived: number;
}

export interface GetUserStatusResponseDTO {
  metrics: UserStatusMetricsDTO;
}
