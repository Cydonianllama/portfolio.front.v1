/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetItems } from "../services";

export const useListManagerV1 = (
  page: number,
  query?: string
) => {
  return useQuery({
    queryKey: ["backoffice.automations", page, query],
    queryFn: () => {
      return GetItems({
        page,
        query: query || ''
      })
    },
    // maxPages: 1000,
    // enabled: true, // si tienes un modal lo puedes usar para que liste al momento  abrirlo,
    // placeholderData: (previousData) => previousData, // Evita que la tabla parpadee al cambiar página.
    // retry: 3,
    // refetchOnWindowFocus: true,
    // gcTime: 1000 * 60 * 30, // Antes llamado cacheTime. (30 minutos de memoria)
    // staleTime: 1000 * 60 * 5, // Por defecto React Query considera los datos viejos inmediatamente. (5 minutos frescos)
  });
};