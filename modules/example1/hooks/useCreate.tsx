/* eslint-disable @typescript-eslint/no-explicit-any */

// utils
import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateItem, DeleteItem, GetItems, UpdateItem } from "@/modules/example1/services/example.managerv1";

export const useCreateManagerV1 = (page: number, query?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateItem,
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

      const newItem = response.data;

      toast.success('Item creado')

      queryClient.setQueryData(
        ["listmanagerv1", page, query],
        (oldData: any) => {
          console.log(oldData)
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: [
              newItem,
              ...oldData.data
            ]
          };
        }
      );
    },
    onError: (error) => {
      console.log(error.message)
      toast.error('Error inesperado, intentalo más tarde.')
    },
  });
};
