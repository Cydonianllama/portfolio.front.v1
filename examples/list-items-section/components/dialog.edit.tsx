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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// formulario
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateSchema,
  updateSchema
} from "../schemas/item.update";

import React from "react"
import { ItemDTO } from "../dto"
import { ColorsSelector } from "../_config"

export interface ManagerV1DialogEditConfig {
  onUpdate: (data: UpdateSchema) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: ItemDTO | null;
  updating: boolean
}

export const ManagerV1DialogEdit = (config: ManagerV1DialogEditConfig) => {

  // temp

  const [color, setColor] = React.useState("")

  //

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
  });

  useEffect(() => {
    if (!config.open) {
      reset({
        color: '',
        name: ''
      });
    }

    if (config.data) {
      reset({
        color: config.data.color,
        name: config.data.name
      })
    }
  }, [config.open, reset, config.data]);

  const HandleToUpdate = (data: UpdateSchema) => {
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
          <DialogTitle>Editar Item</DialogTitle>
          <DialogDescription>
            Edición de item.
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

          <Field>
            <Label>Unidades</Label>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline">
                {color && (<>
                  <div className={`${ColorsSelector.find(el => el.code == color)?.classname} h-2 w-2 rounded-full`}></div>
                  {ColorsSelector.find(el => el.code == color)?.name}
                </>)}
                {!color && (<>Seleccionar color</>)}
              </Button>} />
              <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Seleccionar color</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={color} onValueChange={(value) => {
                    setValue("color", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    setColor(value)
                  }}>
                    {ColorsSelector.map((el, index) => <DropdownMenuRadioItem key={index} value={el.code}> <div className={`${el.classname} h-2 w-2 rounded-full`}></div> {el.name}</DropdownMenuRadioItem>)}
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Field>
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