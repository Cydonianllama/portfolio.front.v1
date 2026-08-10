/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateWidgetService } from "../services";
import { configurationModule } from "../config";

export const useCreateWidget = (page: number, query?: string, workspaceId?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateWidgetService,
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

      const newItem = response.data.widget;

      toast.success('Item creado')

      queryClient.setQueryData(
        [configurationModule.codetable, page, query, workspaceId],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              list: [
                newItem,
                ...oldData.data.list
              ]
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
