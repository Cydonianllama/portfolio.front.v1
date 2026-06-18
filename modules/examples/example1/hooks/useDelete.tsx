/* eslint-disable @typescript-eslint/no-explicit-any */

// utils
import { toast } from "sonner";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteItem } from "../services";

export const useDeleteManagerV1 = (page: number, query?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteItem,
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
        ["listmanagerv1", page, query],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.filter(
              (item: any) => item.id !== deletedId
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