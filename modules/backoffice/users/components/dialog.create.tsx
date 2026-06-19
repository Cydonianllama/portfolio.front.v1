/* eslint-disable @typescript-eslint/no-unused-vars */
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
  CreateUserSchema,
  RequestCreateUser
} from "@/modules/backoffice/users/schemas/item.creation";

export interface ManagerV1DialogCreateConfig {
  onCreate: (data: RequestCreateUser) => void
  open: boolean
  setOpen: (open: boolean) => void
  creating?: boolean;
}

export const ManagerV1DialogCreate = (config: ManagerV1DialogCreateConfig) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<RequestCreateUser>({
    resolver: zodResolver(CreateUserSchema)
  });

  // para ver como los valores cambian
  // console.log('FORM', watch())

  useEffect(() => {
    if (!config.open) {
      reset({
        email: '',
        fullname: '',
        password: '',
        username: ''
      });
    }
  }, [config.open, reset]);


  const HandleToCreate = async (data: RequestCreateUser) => {
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
          <DialogTitle>Crear Usuario</DialogTitle>
          <DialogDescription>
            Creación de usuarios.
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
            <Label>Password</Label>
            <Input
              placeholder="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              placeholder="Eusernamemail"
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
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.creating ? true : false} onClick={handleSubmit(HandleToCreate)}>
            {config.creating && <Spinner data-icon="inline-start" />}
            Crear usuario
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}