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
import { Spinner } from "@/components/ui/spinner"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// formulario
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateConversationFilterSchema,
  updateConversationFilterSchema
} from "../schemas/updateConversationFilter.schema";
import { ConversationFilterDTO } from "@/api/conversationFilter/conversation.filter.dto"
import EmojiPicker from 'emoji-picker-react';

export interface DialogEditConversationFilterConfig {
  onUpdate: (data: UpdateConversationFilterSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: ConversationFilterDTO | null;
  updating: boolean
}

export const DialogEditConversationFilter = (config: DialogEditConversationFilterConfig) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<UpdateConversationFilterSchema>({
    resolver: zodResolver(updateConversationFilterSchema),
    defaultValues: {
      name: '',
      icon: '',
    }
  });

  const selectedIcon = watch('icon')

  useEffect(() => {
    if (!config.open) {
      reset({
        name: '',
        icon: '',
      });
    }

    if (config.data) {
      reset({
        name: config.data.name || '',
        icon: config.data.icon || '',
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
            <Label>Icono</Label>
            <Popover open={emojiPickerOpen} onOpenChange={setEmojiPickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" type="button" className="w-full justify-start">
                  {selectedIcon ? <span className="text-lg">{selectedIcon}</span> : 'Seleccionar emoji'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <EmojiPicker
                  onEmojiClick={(emojiData) => {
                    setValue('icon', emojiData.emoji)
                    setEmojiPickerOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </Field>
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
