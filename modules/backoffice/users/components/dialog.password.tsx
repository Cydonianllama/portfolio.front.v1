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
import { Spinner } from "@/components/ui/spinner"
import { useForm } from "react-hook-form"
import { z } from "zod/v3"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

const PasswordSchema = z.object({
  password: z.string().trim().min(6, "Debe tener al menos 6 caracteres").max(100)
});

export type PasswordForm = z.infer<typeof PasswordSchema>

export interface ManagerV1DialogPasswordConfig {
  onUpdate: (data: PasswordForm) => void
  open: boolean
  setOpen: (open: boolean) => void
  updating: boolean
}

export const ManagerV1DialogPassword = (config: ManagerV1DialogPasswordConfig) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordForm>({
    resolver: zodResolver(PasswordSchema),
  });

  useEffect(() => {
    if (!config.open) reset({ password: "" })
  }, [config.open, reset]);

  return (
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Cambiar contraseña</DialogTitle>
          <DialogDescription>Ingresa la nueva contraseña del usuario.</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Nueva contraseña</Label>
            <Input type="password" placeholder="Nueva contraseña" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => config.setOpen(false)}>Cancelar</Button>
          <Button disabled={config.updating} onClick={handleSubmit(config.onUpdate)} type="button">
            {config.updating && <Spinner data-icon="inline-start" />}
            Actualizar contraseña
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
