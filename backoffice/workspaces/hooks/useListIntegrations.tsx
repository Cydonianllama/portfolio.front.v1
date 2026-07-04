/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import { GetIntegrations } from "../services/listIntegrations";

export const useListIntegrations = (
  workspaceId: string,
  page: number,
) => {
  return useQuery({
    queryKey: ["backoffice.workspace.integrations", workspaceId, page],
    queryFn: () => {
      return GetIntegrations({
        workspaceId,
        page,
      })
    },
    enabled: !!workspaceId,
  });
};
