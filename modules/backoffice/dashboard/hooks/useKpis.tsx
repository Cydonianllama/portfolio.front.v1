import { useQuery } from "@tanstack/react-query";
import { GetKpisService } from "../services";
import { configurationModule } from "../config";

export const useKpis = () => {
  return useQuery({
    queryKey: [configurationModule.codetable, 'kpis'],
    queryFn: () => GetKpisService(),
  });
};
