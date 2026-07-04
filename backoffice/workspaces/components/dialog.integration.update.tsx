/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"

// formulario
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RequestUpdateIntegration,
  UpdateIntegrationSchema
} from "@/backoffice/workspaces/schemas/integration.update";
import { IntegrationDTO } from "../models/dto"

export interface DialogUpdateIntegrationeConfig {
  onUpdate: (data: RequestUpdateIntegration) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: IntegrationDTO | null;
  updating: boolean
}

export const DialogUpdateIntegration = (config: DialogUpdateIntegrationeConfig) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<RequestUpdateIntegration>({
    resolver: zodResolver(UpdateIntegrationSchema),
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        alias: '',
        id: '',
      });
    }

    if (config.data) {
      reset({
        alias: config.data.alias,
        id: config.data.id
      })
    }
  }, [config.open, reset, config.data]);

  const HandleToUpdate = (data: RequestUpdateIntegration) => {
    config.onUpdate(data)
  }

  const HandleToCancel = () => {
    config.setOpen(false)
  }

  return (<>
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      {/* 
          <DialogTrigger>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger> 
        */}
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar Integracion</DialogTitle>
          <DialogDescription>
            Edición de integración.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Alias</Label>
            <Input
              placeholder="alias"
              {...register("alias")}
            />
            {errors.alias && (
              <p className="text-sm text-red-500">
                {errors.alias.message}
              </p>
            )}
          </Field>


        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {config.updating && <Spinner data-icon="inline-start" />}
            Actualizar integración
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}