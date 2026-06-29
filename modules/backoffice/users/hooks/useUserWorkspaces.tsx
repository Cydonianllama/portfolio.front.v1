/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import { GetUserWorkspaces } from "../services";

export const useUserWorkspacesManagerV1 = (userId: string, page: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["backoffice.users.workspaces", userId, page],
    queryFn: () => GetUserWorkspaces({ userId, page }),
    enabled: enabled && Boolean(userId),
  });
};
