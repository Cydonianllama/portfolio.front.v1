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
import { UserStatus, UserStatusConfiguration } from "@/models/user"
import { UserDTO } from "../models/dto"
import { useForm } from "react-hook-form"

type StatusForm = {
  status: UserStatus
}

export interface ManagerV1DialogStatusConfig {
  onUpdate: (data: StatusForm) => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: UserDTO | null;
  updating: boolean
}

export const ManagerV1DialogStatus = (config: ManagerV1DialogStatusConfig) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<StatusForm>();

  useEffect(() => {
    reset({
      status: config.data?.status || UserStatus.actived
    })
  }, [config.data, config.open, reset]);

  return (
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Cambiar estado</DialogTitle>
          <DialogDescription>Selecciona el nuevo estado del usuario.</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Estado</Label>
            <select
              className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              {...register("status", { valueAsNumber: true })}
            >
              {Object.values(UserStatus).filter((value) => typeof value === "number").map((status) => (
                <option key={status} value={status}>
                  {UserStatusConfiguration[status as UserStatus].text}
                </option>
              ))}
            </select>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => config.setOpen(false)}>Cancelar</Button>
          <Button disabled={config.updating} onClick={handleSubmit(config.onUpdate)} type="button">
            {config.updating && <Spinner data-icon="inline-start" />}
            Actualizar estado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
