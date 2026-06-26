/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPlanService } from "../services";
import { configurationModule } from "../config";

export const useListPlans = (
  page: number,
  query?: string
) => {
  return useQuery({
    queryKey: [configurationModule.codetable, page, query],
    queryFn: () => {
      return GetPlanService({
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

/*

---Borrar caché y volver a pedir

Si quieres un refresh "duro":

queryClient.removeQueries({
  queryKey: ["listmanagerv1"]
});

o

queryClient.resetQueries({
  queryKey: ["listmanagerv1"]
});


 */



/*
---Invalidar queries (mi favorita para CRUDs)

Cuando creas, editas o eliminas:

const queryClient = useQueryClient();

queryClient.invalidateQueries({
  queryKey: ["listmanagerv1"]
}); // es decir pide al server la data

Esto marca como "stale" todas las queries:

["listmanagerv1", 1]
["listmanagerv1", 2]
["listmanagerv1", 3]

y React Query las recargará cuando sea necesario.

---Forzar recarga inmediata
await queryClient.refetchQueries({
  queryKey: ["listmanagerv1"]
});

Diferencia:

invalidateQueries -> marca para recargar
refetchQueries    -> recarga inmediatamente

*/