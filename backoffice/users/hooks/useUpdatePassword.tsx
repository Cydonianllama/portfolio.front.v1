/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { UpdatePassword } from "../services";

export const useUpdatePasswordManagerV1 = () => {
  return useMutation({
    mutationFn: UpdatePassword,
    onSuccess: (response) => {
      if (!response?.status) {
        toast.error('Error, consulta fallida')
        return;
      }

      toast.success('Contraseña actualizada')
    },
    onError: () => {
      toast.error('Error inesperado, intentalo más tarde.')
    },
  });
};
