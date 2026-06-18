/* eslint-disable @typescript-eslint/no-explicit-any */
// components
import { useEffect } from "react"
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
  UpdateSchema,
  updateSchema
} from "@/modules/backoffice/automation/schemas/item.update";
import { ManagerV1Item } from "../types/manager.v1"
import { AutomationBackofficeDTO } from "../models/dto"

export interface ManagerV1DialogUpdateConfig {
  onUpdate: (data: UpdateSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: AutomationBackofficeDTO | null;
  updating: boolean
}

export const ManagerV1DialogEdit = (config: ManagerV1DialogUpdateConfig) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
    // defaultValues: {
    //   title: "",
    //   userId: '',
    //   workspaceId: ''
    // }
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        title: '',
        userId: '',
        workspaceId: ''
      });
    }

    if (config.data) {
      reset({
        title: config.data.title,
        userId: config.data.userCreationId,
        workspaceId: config.data.workspaceId
      })
    }
  }, [config.open, reset, config.data]);

  const HandleToUpdate = (data: UpdateSchema) => {
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
          <DialogTitle>Editar Item</DialogTitle>
          <DialogDescription>
            Edición de item.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombre</Label>
            <Input
              placeholder="Nombre"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </Field>

          <Field>
            <Label>Descripción</Label>
            <Textarea
              placeholder="Workspace"
              {...register("workspaceId")}
            />
            {errors.workspaceId && (
              <p className="text-sm text-red-500">
                {errors.workspaceId.message}
              </p>
            )}
          </Field>

          <Field>
            <Label>UserId</Label>
            <Textarea
              placeholder="User"
              {...register("userId")}
            />
            {errors.userId && (
              <p className="text-sm text-red-500">
                {errors.userId.message}
              </p>
            )}
          </Field>

        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {config.updating && <Spinner data-icon="inline-start" />}
            Actualizar item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}