/* eslint-disable @typescript-eslint/no-explicit-any */

import { useQuery } from "@tanstack/react-query";
import { GetWidgetsService } from "../services";
import { configurationModule } from "../config";

export const useListWidgets = (
  page: number,
  query?: string,
  workspaceId?: string
) => {
  return useQuery({
    queryKey: [configurationModule.codetable, page, query, workspaceId],
    queryFn: () => {
      return GetWidgetsService({
        page,
        query: query || '',
        workspaceId: workspaceId || ''
      })
    },
  });
};
