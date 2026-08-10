/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteWidgetService } from "../services";
import { configurationModule } from "../config";

export const useDeleteWidget = (page: number, query?: string, workspaceId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteWidgetService,
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

      toast.success('Item eliminado')

      const deletedId = response.data.id;

      queryClient.setQueryData(
        [configurationModule.codetable, page, query, workspaceId],
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
