import { useQuery } from "@tanstack/react-query";
import { GetGrowthService } from "../services";
import { configurationModule } from "../config";

export const useGrowth = (
  metric: 'users' | 'plans' | 'workspaces' = 'users',
  period: string = 'week'
) => {
  return useQuery({
    queryKey: [configurationModule.codetable, 'growth', metric, period],
    queryFn: () => GetGrowthService(metric, period),
  });
};
