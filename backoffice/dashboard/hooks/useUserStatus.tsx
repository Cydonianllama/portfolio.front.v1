import { useQuery } from "@tanstack/react-query";
import { GetUserStatusService } from "../services";
import { configurationModule } from "../config";

export const useUserStatus = () => {
  return useQuery({
    queryKey: [configurationModule.codetable, 'user-status'],
    queryFn: () => GetUserStatusService(),
  });
};
