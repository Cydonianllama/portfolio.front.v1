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
  RequestUpdateUser,
  UpdateUserSchema
} from "@/modules/backoffice/users/schemas/item.update";
import { UserDTO } from "../models/dto"

export interface ManagerV1DialogUpdateConfig {
  onUpdate: (data: RequestUpdateUser) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: UserDTO | null;
  updating: boolean
}

export const ManagerV1DialogEdit = (config: ManagerV1DialogUpdateConfig) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<RequestUpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        email: '',
        fullname: '',
        username: ''
      });
    }

    if (config.data) {
      reset({
        email: config.data.email,
        fullname: config.data.fullname,
        username: config.data.username
      })
    }
  }, [config.open, reset, config.data]);

  const HandleToUpdate = (data: RequestUpdateUser) => {
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
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Edición de usuario.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </Field>
          <Field>
            <Label>Fullname</Label>
            <Input
              placeholder="Fullname"
              {...register("fullname")}
            />
            {errors.fullname && (
              <p className="text-sm text-red-500">
                {errors.fullname.message}
              </p>
            )}
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              placeholder="Username"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </Field>

        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {config.updating && <Spinner data-icon="inline-start" />}
            Actualizar usuario
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}