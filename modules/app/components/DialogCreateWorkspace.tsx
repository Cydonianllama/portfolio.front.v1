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
  CreateWorkspaceSchema,
  RequestCreateWorkspace
} from "../schemas/create-workspace-schema";

export interface DialogCreateConfig {
  onCreate: (data: RequestCreateWorkspace) => void
  open: boolean
  setOpen: (open: boolean) => void
  creating?: boolean;
}

import { GetWorkspaces } from '@/backoffice/workspaces/services/listItem'

export const DialogCreateWorkpace = (config: DialogCreateConfig) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<RequestCreateWorkspace>({
    resolver: zodResolver(CreateWorkspaceSchema),
  });

  // para ver como los valores cambian
  // console.log('FORM', watch())

  useEffect(() => {
    if (!config.open) {
      reset({
        name: ''
      });
    }
  }, [config.open, reset]);


  const HandleToCreate = async (data: RequestCreateWorkspace) => {
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
          <DialogTitle>Crear Workspace</DialogTitle>
          <DialogDescription>
            Creación de workspaces.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombre</Label>
            <Input
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </Field>

        </FieldGroup>
        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.creating ? true : false} onClick={handleSubmit(HandleToCreate)}>
            {config.creating && <Spinner data-icon="inline-start" />}
            Crear workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}