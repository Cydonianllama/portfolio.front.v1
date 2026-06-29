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
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { UserInternalRol, UserInternalRolConfiguration } from "@/models/user"
import { UserDTO } from "../models/dto"
import { useForm } from "react-hook-form"

type InternalRolForm = {
  internalRol: UserInternalRol
}

export interface ManagerV1DialogInternalRolConfig {
  onUpdate: (data: InternalRolForm) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: UserDTO | null;
  updating: boolean
}

export const ManagerV1DialogInternalRol = (config: ManagerV1DialogInternalRolConfig) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<InternalRolForm>();

  useEffect(() => {
    reset({
      internalRol: config.data?.internalRol || UserInternalRol.support
    })
  }, [config.data, config.open, reset]);

  return (
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Cambiar rol interno</DialogTitle>
          <DialogDescription>Selecciona el rol interno del usuario.</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Rol interno</Label>
            <select
              className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              {...register("internalRol")}
            >
              {Object.values(UserInternalRol).map((rol) => (
                <option key={rol} value={rol}>
                  {UserInternalRolConfiguration[rol].text}
                </option>
              ))}
            </select>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => config.setOpen(false)}>Cancelar</Button>
          <Button disabled={config.updating} onClick={handleSubmit(config.onUpdate)} type="button">
            {config.updating && <Spinner data-icon="inline-start" />}
            Actualizar rol
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
