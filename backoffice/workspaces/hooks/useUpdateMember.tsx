/* eslint-disable @typescript-eslint/no-explicit-any */

// utils
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateMember } from "../services";

export const useUpdateMember = (workspaceId: string, page: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateMember,
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

      toast.success('Miembro actualizado')

      const updatedItem = response.data.member;
      queryClient.setQueryData(
        ["backoffice.workspace.members", workspaceId, page],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              list: oldData.data.list.map((item: any) =>
                item.id === updatedItem?.id
                  ? updatedItem
                  : item
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
