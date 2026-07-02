import { useQuery } from "@tanstack/react-query";
import { GetRecentWorkspacesService } from "../services";
import { configurationModule } from "../config";

export const useRecentWorkspaces = () => {
  return useQuery({
    queryKey: [configurationModule.codetable, 'recent-workspaces'],
    queryFn: () => GetRecentWorkspacesService(),
  });
};
