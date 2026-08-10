/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { widgetUpdateSchema, WidgetUpdateSchema } from "../schemas/item.update";
import { WidgetDTO } from "../models/dto";

export interface DialogEditWidgetConfig {
  onUpdate: (data: WidgetUpdateSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: WidgetDTO | null;
  updating: boolean
}

export const DialogEditWidget = (config: DialogEditWidgetConfig) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<WidgetUpdateSchema>({
    resolver: zodResolver(widgetUpdateSchema),
    defaultValues: {
      name: "",
      isDark: false,
      UIconfig: {
        title: "",
        allowFiles: false,
        allowEmojis: false,
      },
      conversationalConfig: {
        firstMessageResponse: {
          message: "",
        },
      },
    }
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        name: '',
        isDark: false,
        UIconfig: {
          title: '',
          allowFiles: false,
          allowEmojis: false,
        },
        conversationalConfig: {
          firstMessageResponse: {
            message: '',
          },
        },
      });
    }

    if (config.data) {
      reset({
        name: config.data.name || '',
        isDark: config.data.isDark || false,
        UIconfig: {
          title: config.data.UIconfig?.title || '',
          allowFiles: config.data.UIconfig?.allowFiles || false,
          allowEmojis: config.data.UIconfig?.allowEmojis || false,
        },
        conversationalConfig: {
          firstMessageResponse: {
            message: config.data.conversationalConfig?.firstMessageResponse?.message || '',
          },
        },
      })
    }
  }, [config.open, reset, config.data]);

  const HandleToUpdate = (data: WidgetUpdateSchema) => {
    config.onUpdate(data)
  }

  const HandleToCancel = () => {
    config.setOpen(false)
  }

  return (<>
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Widget</DialogTitle>
          <DialogDescription>
            Edición de widget.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nombre</Label>
            <Input placeholder="Nombre" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </Field>

          <Field className="flex items-center gap-2">
            <Label className="mb-0">Modo oscuro</Label>
            <Switch
              checked={watch("isDark")}
              onCheckedChange={(checked) => setValue("isDark", checked)}
            />
          </Field>

          <div className="border-t pt-3 mt-2">
            <p className="text-sm font-semibold mb-2 text-foreground">UI Config</p>
            <Field>
              <Label>Título</Label>
              <Input placeholder="Título" {...register("UIconfig.title")} />
            </Field>
            <div className="flex gap-4 mt-2">
              <Field className="flex items-center gap-2">
                <Label className="mb-0">Permitir archivos</Label>
                <Switch
                  checked={watch("UIconfig.allowFiles")}
                  onCheckedChange={(checked) => setValue("UIconfig.allowFiles", checked)}
                />
              </Field>
              <Field className="flex items-center gap-2">
                <Label className="mb-0">Permitir emojis</Label>
                <Switch
                  checked={watch("UIconfig.allowEmojis")}
                  onCheckedChange={(checked) => setValue("UIconfig.allowEmojis", checked)}
                />
              </Field>
            </div>
          </div>

          <div className="border-t pt-3 mt-2">
            <p className="text-sm font-semibold mb-2 text-foreground">Config Conversacional</p>
            <Field>
              <Label>Mensaje de primera respuesta</Label>
              <Textarea
                placeholder="Mensaje..."
                {...register("conversationalConfig.firstMessageResponse.message")}
              />
            </Field>
          </div>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={HandleToCancel}>Cancelar</Button>
          <Button disabled={config.updating ? true : false} onClick={handleSubmit(HandleToUpdate)} type="button">
            {config.updating && <Spinner data-icon="inline-start" />}
            Actualizar item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>)
}
