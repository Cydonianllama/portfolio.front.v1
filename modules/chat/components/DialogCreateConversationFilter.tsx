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
  creationConversationFilterSchema,
  CreationConversationFilterSchema
} from "../schemas/createConversationFilter.schema";
import EmojiPicker from 'emoji-picker-react';

export interface DialogCreateConversationFilterConfig {
  onCreate: (data: CreationConversationFilterSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  creating?: boolean;
}

export const DialogCreateConversationFilter = (config: DialogCreateConversationFilterConfig) => {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationConversationFilterSchema>({
    resolver: zodResolver(creationConversationFilterSchema),
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
  }, [config.open, reset]);

  const HandleToCreate = async (data: CreationConversationFilterSchema) => {
    await config.onCreate(data)
  }

  const HandleToCancel = () => {
    config.setOpen(false)
  }

  return (<>
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Filtros de conversaciones</DialogTitle>
          <DialogDescription></DialogDescription>
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
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.creating ? true : false} onClick={handleSubmit(HandleToCreate)}>
            {config.creating && <Spinner data-icon="inline-start" />}
            Crear convesation filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}
