/* eslint-disable @typescript-eslint/no-explicit-any */

// utils
import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateItem } from "../services";

export const useUpdateManagerV1 = (page: number, query?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdateItem,
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

      const updatedItem = response.data.workspace;
      queryClient.setQueryData(
        ["backoffice.workspace", page, query],
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