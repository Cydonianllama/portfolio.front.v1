/* eslint-disable @typescript-eslint/no-explicit-any */

// utils
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteIntegration } from "../services/deleteIntegration";

export const useDeleteIntegration = (workspaceId: string, page: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteIntegration,
    onSuccess: (response) => {
      if (!response) {
        toast.error('Error "req" no encontrado')
        return;
      }

      if (!response?.status) {
        toast.error('Error, consulta fallida')
        return;
      }

      if (!response?.data) {
        toast.error('Error "req" no encontrado')
        return;
      }

      toast.success('Miembro eliminado')

      const deletedId = response.data.id;

      queryClient.setQueryData(
        ["backoffice.workspace.integrations", workspaceId, page],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              list: oldData.data.list.filter(
                (item: any) => item.id !== deletedId
              )
            }
          };
        }
      );
    },
    onError: () => {
      toast.error('Error inesperado, intentalo más tarde.')
    },
  });
};
