import { useQuery } from "@tanstack/react-query";
import { GetRecentActivitiesService } from "../services";
import { configurationModule } from "../config";

export const useRecentActivities = () => {
  return useQuery({
    queryKey: [configurationModule.codetable, 'recent-activities'],
    queryFn: () => GetRecentActivitiesService(),
  });
};
