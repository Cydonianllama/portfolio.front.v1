
import { useQuery } from "@tanstack/react-query";
import { GetUsers } from "@/services/user.service";

export const useUsers = (
  page: number,
  query?: string
) => {
  return useQuery({
    queryKey: ["users", page, query],
    queryFn: () => {
      return GetUsers({
        page,
        query: query || ''
      })
    },
  });
};