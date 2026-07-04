/* eslint-disable @typescript-eslint/no-explicit-any */

// utils
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateIntegration } from "../services/createIntegration";

export const useCreateIntegration = (workspaceId: string, page: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateIntegration,
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

      const newItem = response.data.integration;

      toast.success('Integración creada')

      queryClient.setQueryData(
        ["backoffice.workspace.integrations", workspaceId, page],
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
    onError: (error) => {
      console.log(error.message)
      toast.error('Error inesperado, intentalo más tarde.')
    },
  });
};
