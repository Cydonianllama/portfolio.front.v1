import { useQuery } from "@tanstack/react-query";
import { GetRecentUsersService } from "../services";
import { configurationModule } from "../config";

export const useRecentUsers = () => {
  return useQuery({
    queryKey: [configurationModule.codetable, 'recent-users'],
    queryFn: () => GetRecentUsersService(),
  });
};
