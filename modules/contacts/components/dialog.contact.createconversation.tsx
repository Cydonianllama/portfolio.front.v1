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
import { Field, FieldGroup, FieldError } from "@/components/ui/field"
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
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

// formulario
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  creationConversationSchema,
  CreationConversationSchema
} from "../schemas/creation.conversation";
import { FaWhatsapp } from "react-icons/fa"
import { PiTelegramLogo } from "react-icons/pi"
import { IntegrationDTO } from "@/api/integration/integration.dto"
import { error } from "console"
import { ContactDTO } from "@/api/contacts/contacts.dto"
import { UseAppData } from "@/hooks/app/useAppData";
import { IntegrationCodes } from "@/configs/integration.codes"

//
export interface DialogCreateConversationContactConfig {
  onCreate: (data: CreationConversationSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  creating?: boolean;
  integrations: IntegrationDTO[]
  data: ContactDTO | null
}

export const DialogCreateConversationContact = (config: DialogCreateConversationContactConfig) => {
const useAppData = UseAppData()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreationConversationSchema>({
    resolver: zodResolver(creationConversationSchema),
  });

  // para ver como los valores cambian
  // console.log('FORM', watch())

  useEffect(() => {
    if (!config.open) {
      reset({
        integrationId: '',
        participants: [],
        workspaceId: ''
      });
    }

    if (config.data) {
      reset({
        integrationId: '',
        participants: [{ contactId: config.data.id }],
        workspaceId: useAppData.workspace?.id || ''
      })
    }
  }, [config.open, config.data, reset]);


  const HandleToCreate = async (data: CreationConversationSchema) => {
    await config.onCreate(data)
  }

  const HandleToCancel = () => {
    config.setOpen(false)
  }

  //
  // integration
  //

  const [integrationId, setIntegrationId] = useState<string>('')

  const integration = config.integrations.find(i => i.id === integrationId);

  useEffect(() => {
    if (integration) {
      setValue('integrationId', integration.id, {
        shouldValidate: true
      });
    }
  }, [integration])

  return (<>
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear conversación</DialogTitle>
          <DialogDescription>
            Creación de conversación.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          {/* <Field>
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
          </Field> */}
          <Field data-invalid={errors.integrationId ? true : false}>
            <Label>Integración</Label>
            <Select value={integrationId} onValueChange={(e) => setIntegrationId(e || '')}>
              <SelectTrigger className="w-full">
                <SelectValue>
                  {integration && (
                    <div className="flex items-center gap-2">
                      {integration.code == IntegrationCodes.whatsapp.code && <FaWhatsapp />}
                      {integration.code == IntegrationCodes.telegram.code && <PiTelegramLogo />}
                      {integration.alias}
                    </div>
                  )}
                  {!integration && ('Seleccionar integración')}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Integraciones</SelectLabel>
                  {config.integrations.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.code == IntegrationCodes.whatsapp.code && <FaWhatsapp />}
                      {item.code == IntegrationCodes.telegram.code && <PiTelegramLogo />}
                      {item.alias}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError>
              {errors.integrationId?.message}
            </FieldError>
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