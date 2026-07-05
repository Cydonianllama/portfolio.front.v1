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
  creationSchema,
  CreationSchema
} from "../schemas/item.creation";
import { IntegrationDTO } from "../models/integrations.dto"
import { FaWhatsapp } from "react-icons/fa"
import { PiTelegramLogo } from "react-icons/pi"

//
export interface DialogCreateConversationContactConfig {
  onCreate: (data: CreationSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  creating?: boolean;
  integrations: IntegrationDTO[]
}

export const DialogCreateConversationContact = (config: DialogCreateConversationContactConfig) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<CreationSchema>({
    resolver: zodResolver(creationSchema),
    defaultValues: {
      fullname: "",
    }
  });

  // para ver como los valores cambian
  // console.log('FORM', watch())

  useEffect(() => {
    if (!config.open) {
      reset({
        fullname: '',
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
          <DialogTitle>Crear conversación</DialogTitle>
          <DialogDescription>
            Creación de conversación.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombre</Label>
            <Input
              placeholder="Nombre"
              {...register("fullname")}
            />
            {errors.fullname && (
              <p className="text-sm text-red-500">
                {errors.fullname.message}
              </p>
            )}
          </Field>
          <Field>
            <Label>Integración</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Integraciones</SelectLabel>
                  {config.integrations.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.code == 'global:whatsapp' && <FaWhatsapp />}
                      {item.code == 'global:telegram' && <PiTelegramLogo />}
                      {item.alias}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant={'outline'} onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.creating ? true : false} onClick={handleSubmit(HandleToCreate)}>
            {config.creating && <Spinner data-icon="inline-start" />}
            Crear conversacion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}