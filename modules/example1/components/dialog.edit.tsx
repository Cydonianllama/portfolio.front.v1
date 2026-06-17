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
} from "@/modules/example1/schemas/item.update";
import { ManagerV1Item } from "../types/manager.v1"

export interface ManagerV1DialogUpdateConfig {
  onUpdate: (data: UpdateSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: ManagerV1Item | null;
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
    defaultValues: {
      name: "",
      description: "",
      units: 0,
    }
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        description: '',
        name: '',
        units: 1
      });
    }

    if (config.data) {
      reset({
        description: config.data.description,
        name: config.data.name,
        units: config.data.qtyItem || 0
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
          <DialogTitle>Crear Item</DialogTitle>
          <DialogDescription>
            Creación de item.s
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
            <Label>Descripción</Label>
            <Textarea
              placeholder="Descripción"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </Field>

          <Field>
            <Label>Unidades</Label>
            <Input
              type="number"
              placeholder="Unidades"
              {...register("units", {
                valueAsNumber: true
              })}
            />
            {errors.units && (
              <p className="text-sm text-red-500">
                {errors.units.message}
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