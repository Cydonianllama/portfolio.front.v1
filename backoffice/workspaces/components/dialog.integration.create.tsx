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
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// formulario
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateIntegrationSchema,
  RequestCreateIntegration
} from "@/backoffice/workspaces/schemas/integration.creation";

export interface DialogCreateIntegrationConfig {
  onCreate: (data: RequestCreateIntegration) => void
  open: boolean
  setOpen: (open: boolean) => void
  creating?: boolean;
  workspaceId: string;
}

export const DialogCreateIntegration = (config: DialogCreateIntegrationConfig) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control
  } = useForm<RequestCreateIntegration>({
    resolver: zodResolver(CreateIntegrationSchema),
  });

  // para ver como los valores cambian
  // console.log('FORM', watch())

  useEffect(() => {
    if (!config.open) {
      reset({
        code: ''
      });
    }
  }, [config.open, reset]);


  const HandleToCreate = async (data: RequestCreateIntegration) => {
    await config.onCreate(data)
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
          <DialogTitle>Crear integracion</DialogTitle>
          <DialogDescription>
            Creación de integraciones.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Plataforma</Label>
            {/* <Input
              placeholder="name"
              {...register("code")}
            /> */}
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Selecciona una plataforma" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Plataformas</SelectLabel>
                      <SelectItem value="global:whatsapp">
                        WhatsApp
                      </SelectItem>
                      <SelectItem value="global:telegram">
                        Telegram
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.code && (
              <p className="text-sm text-red-500">
                {errors.code.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.creating ? true : false} onClick={handleSubmit(HandleToCreate)}>
            {config.creating && <Spinner data-icon="inline-start" />}
            Crear integración
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}