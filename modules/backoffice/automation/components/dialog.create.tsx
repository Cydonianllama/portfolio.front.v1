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
  creationSchema,
  CreationSchema
} from "@/modules/backoffice/automation/schemas/item.creation";
export interface ManagerV1DialogCreateConfig {
  onCreate: (data: CreationSchema) => void
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
  } = useForm<CreationSchema>({
    resolver: zodResolver(creationSchema),
  });

  // para ver como los valores cambian
  // console.log('FORM', watch())

  useEffect(() => {
    if (!config.open) {
      reset({
        title: '',
        workspaceId: '',
        userCreationId: '',
      });
    }
  }, [config.open, reset]);


  const HandleToCreate = async (data: CreationSchema) => {
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
          <DialogTitle>Crear Item</DialogTitle>
          <DialogDescription>
            Creación de items.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombre</Label>
            <Input
              placeholder="Título"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </Field>

          <Field>
            <Label>WorkspaceId</Label>
            <Textarea
              placeholder="WorkspaceId"
              {...register("workspaceId")}
            />
            {errors.workspaceId && (
              <p className="text-sm text-red-500">
                {errors.workspaceId.message}
              </p>
            )}
          </Field>

          <Field>
            <Label>UserCreationId</Label>
            <Textarea
              placeholder="UserId"
              {...register("userCreationId")}
            />
            {errors.userCreationId && (
              <p className="text-sm text-red-500">
                {errors.userCreationId.message}
              </p>
            )}
          </Field>

        </FieldGroup>
        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.creating ? true : false} onClick={handleSubmit(HandleToCreate)}>
            {config.creating && <Spinner data-icon="inline-start" />}
            Crear item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}