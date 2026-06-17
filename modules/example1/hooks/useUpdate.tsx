/* eslint-disable @typescript-eslint/no-explicit-any */

// utils
import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateItem, DeleteItem, GetItems, UpdateItem } from "@/modules/example1/services/example.managerv1";

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

      const updatedItem = response.data;
      queryClient.setQueryData(
        ["listmanagerv1", page, query],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((item: any) =>
              item.id === updatedItem.id
                ? updatedItem
                : item
            )
          };
        }
      );
    },
    onError: () => {
      toast.error('Error inesperado, intentalo más tarde.')
    },
  });
};