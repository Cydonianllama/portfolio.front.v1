/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateMemberSchema,
  RequestUpdateMember,
} from "@/modules/backoffice/workspaces/schemas/member.update";
import { MemberBackofficeDTO } from "../models/dto"

export interface DialogMemberStatusConfig {
  member?: MemberBackofficeDTO | null;
  onUpdate: (data: RequestUpdateMember) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  updating: boolean;
}

const statusOptions = [
  { id: 1, name: "Pendiente" },
  { id: 2, name: "Activo" },
  { id: 3, name: "Rechazado" },
  { id: 4, name: "Deshabilitado" },
];

export const DialogMemberStatus = (config: DialogMemberStatusConfig) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<RequestUpdateMember>({
    resolver: zodResolver(UpdateMemberSchema),
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        status: undefined,
      });
    }

    if (config.member) {
      reset({
        status: config.member.status,
      });
    }
  }, [config.open, reset, config.member]);

  const HandleToUpdate = (data: RequestUpdateMember) => {
    config.onUpdate(data);
  };

  const HandleToCancel = () => {
    config.setOpen(false);
  };

  const currentStatus = statusOptions.find((s) => s.id === watch("status")) || null;

  return (
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Cambiar status</DialogTitle>
          <DialogDescription>
            Actualiza el estado del miembro.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Status</Label>
            <Combobox
              items={statusOptions}
              value={currentStatus}
              onValueChange={(item: any) => {
                if (item) {
                  setValue("status", item.id, { shouldValidate: true, shouldDirty: true });
                }
              }}
              itemToStringValue={(item: any) => item.name}
            >
              <ComboboxTrigger
                render={
                  <Button variant="outline" className="w-full justify-between font-normal" />
                }
              >
                <ComboboxValue>
                  {(item: any) =>
                    item ? (
                      <span>{item.name}</span>
                    ) : (
                      <span className="text-muted-foreground">Seleccionar status</span>
                    )
                  }
                </ComboboxValue>
              </ComboboxTrigger>
              <ComboboxContent>
                <ComboboxEmpty>No se encontraron opciones.</ComboboxEmpty>
                <ComboboxList>
                  {(item: any) => (
                    <ComboboxItem key={item.id} value={item}>
                      {item.name}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {config.updating && <Spinner data-icon="inline-start" />}
            Actualizar status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
