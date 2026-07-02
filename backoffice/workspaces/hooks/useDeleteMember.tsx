/* eslint-disable @typescript-eslint/no-explicit-any */

// utils
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteMember } from "../services";

export const useDeleteMember = (workspaceId: string, page: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteMember,
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
        ["backoffice.workspace.members", workspaceId, page],
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
