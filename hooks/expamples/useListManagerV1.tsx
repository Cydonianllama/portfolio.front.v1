
import { useQuery } from "@tanstack/react-query";
import { GetItems } from "@/services/examples/example.managerv1";

export const useListManagerV1 = (
  page: number,
  query?: string
) => {
  return useQuery({
    queryKey: ["listmanagerv1", page, query],
    queryFn: () => {
      return GetItems({
        page,
        query: query || ''
      })
    },
  });
};