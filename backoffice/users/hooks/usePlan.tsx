/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AssignPlanService, UpdatePlanService, RemovePlanService } from "../services/planItem";

export const useAssignPlanManagerV1 = (page: number, query?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: AssignPlanService,
    onSuccess: (response) => {
      if (!response || !response?.status || !response?.data) {
        toast.error('Error al asignar plan')
        return;
      }
      toast.success('Plan asignado')
      const updatedItem = response.data.user;
      queryClient.setQueryData(
        ["backoffice.users", page, query],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              list: oldData.data.list.map((item: any) =>
                item.id === updatedItem?.id ? updatedItem : item
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

export const useUpdatePlanManagerV1 = (page: number, query?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdatePlanService,
    onSuccess: (response) => {
      if (!response || !response?.status || !response?.data) {
        toast.error('Error al actualizar plan')
        return;
      }
      toast.success('Plan actualizado')
      const updatedItem = response.data.user;
      queryClient.setQueryData(
        ["backoffice.users", page, query],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              list: oldData.data.list.map((item: any) =>
                item.id === updatedItem?.id ? updatedItem : item
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

export const useRemovePlanManagerV1 = (page: number, query?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: RemovePlanService,
    onSuccess: (response) => {
      if (!response || !response?.status || !response?.data) {
        toast.error('Error al remover plan')
        return;
      }
      toast.success('Plan removido')
      const updatedItem = response.data.user;
      queryClient.setQueryData(
        ["backoffice.users", page, query],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              list: oldData.data.list.map((item: any) =>
                item.id === updatedItem?.id ? updatedItem : item
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
