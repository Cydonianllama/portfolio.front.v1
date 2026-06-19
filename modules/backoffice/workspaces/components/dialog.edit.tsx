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
  RequestUpdateWorkspace,
  UpdateWorkspaceSchema
} from "@/modules/backoffice/workspaces/schemas/item.update";
import { WorkspaceDTO } from "../models/dto"

export interface ManagerV1DialogUpdateConfig {
  onUpdate: (data: RequestUpdateWorkspace) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: WorkspaceDTO | null;
  updating: boolean
}

export const ManagerV1DialogEdit = (config: ManagerV1DialogUpdateConfig) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<RequestUpdateWorkspace>({
    resolver: zodResolver(UpdateWorkspaceSchema),
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        mainUserId: '',
        name: ''
      });
    }

    if (config.data) {
      reset({
        mainUserId: config.data.mainUser?.id || '',
        name: config.data.name
      })
    }
  }, [config.open, reset, config.data]);

  const HandleToUpdate = (data: RequestUpdateWorkspace) => {
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
          <DialogTitle>Editar workspace</DialogTitle>
          <DialogDescription>
            Edición de workspace.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombre</Label>
            <Input
              placeholder="Nombre"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </Field>

          <Field>
            <Label>mainUserId</Label>
            <Input
              placeholder="mainUserId"
              {...register("mainUserId")}
            />
            {errors.mainUserId && (
              <p className="text-sm text-red-500">
                {errors.mainUserId.message}
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