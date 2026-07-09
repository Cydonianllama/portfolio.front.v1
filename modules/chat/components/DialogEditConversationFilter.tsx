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
  UpdateConversationFilterSchema,
  updateConversationFilterSchema
} from "../schemas/updateConversationFilter.schema";
import { ConversationFilterDTO } from "@/api/conversationFilter/conversation.filter.dto"

export interface DialogEditConversationFilterConfig {
  onUpdate: (data: UpdateConversationFilterSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: ConversationFilterDTO | null;
  updating: boolean
}

export const DialogEditConversationFilter = (config: DialogEditConversationFilterConfig) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<UpdateConversationFilterSchema>({
    resolver: zodResolver(updateConversationFilterSchema),
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        name: ''
      });
    }

    if (config.data) {
      reset({
        name: config.data.name || ''
      })
    }
  }, [config.open, reset, config.data]);

  const HandleToUpdate = (data: UpdateConversationFilterSchema) => {
    config.onUpdate(data)
  }

  const HandleToCancel = () => {
    config.setOpen(false)
  }

  return (<>
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar filtros</DialogTitle>
          <DialogDescription>
            Edición de filtros de conversación.
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

        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {config.updating && <Spinner data-icon="inline-start" />}
            Actualizar filtro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}