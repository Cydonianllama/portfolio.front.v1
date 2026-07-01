/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import { GetMembers } from "../services";

export const useListMembers = (
  workspaceId: string,
  page: number,
) => {
  return useQuery({
    queryKey: ["backoffice.workspace.members", workspaceId, page],
    queryFn: () => {
      return GetMembers({
        workspaceId,
        page,
      })
    },
    enabled: !!workspaceId,
  });
};
