import { useQuery } from "@tanstack/react-query";
import { GetPopularPlansService } from "../services";
import { configurationModule } from "../config";

export const usePopularPlans = () => {
  return useQuery({
    queryKey: [configurationModule.codetable, 'popular-plans'],
    queryFn: () => GetPopularPlansService(),
  });
};
