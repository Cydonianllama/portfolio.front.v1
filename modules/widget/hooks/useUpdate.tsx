/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateWidgetService } from "../services";
import { configurationModule } from "../config";

export const useUpdateWidget = (page: number, query?: string, workspaceId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateWidgetService,
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

      toast.success('Item actualizado')

      const updatedItem = response.data.widget;

      queryClient.setQueryData(
        [configurationModule.codetable, page, query, workspaceId],
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
