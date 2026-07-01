import { useEffect, useMemo } from "react"
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
import { UserDTO } from "../models/dto"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v3"
import { useListPlans } from "@/modules/backoffice/plans/hooks/useList"

export const AssignPlanSchema = z.object({
  planId: z.string().trim().min(1, "El planId es requerido")
});

export type AssignPlanForm = z.infer<typeof AssignPlanSchema>

export interface ManagerV1DialogPlanConfig {
  onAssign: (data: AssignPlanForm) => void
  onUpdate: (data: AssignPlanForm) => void
  onRemove: () => void
  open: boolean
  setOpen: (open: boolean) => void
  data?: UserDTO | null;
  loading: boolean
}

export const ManagerV1DialogPlan = (config: ManagerV1DialogPlanConfig) => {
  const hasPlan = !!config.data?.plan;

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<AssignPlanForm>({
    resolver: zodResolver(AssignPlanSchema),
  });

  const { data: plansData, isLoading: plansLoading } = useListPlans(1, '');
  const plans = useMemo(() => plansData?.data?.list || [], [plansData]);

  useEffect(() => {
    if (config.open) {
      reset({
        planId: config.data?.plan?.id || ''
      });
    }
  }, [config.data, config.open, reset]);

  const selectedPlanId = watch("planId");

  const HandleToSubmit = (data: AssignPlanForm) => {
    if (hasPlan) {
      config.onUpdate(data);
    } else {
      config.onAssign(data);
    }
  };

  const HandleToRemove = () => {
    config.onRemove();
  };

  return (
    <Dialog open={config.open} onOpenChange={(open) => config.setOpen(open)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Plan de usuario</DialogTitle>
          <DialogDescription>Administra el plan del usuario.</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label>Plan</Label>
            <select
              className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              {...register("planId")}
            >
              <option value="">Seleccionar plan</option>
              {plansLoading && (
                <option value="" disabled>Cargando planes...</option>
              )}
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </Field>
        </FieldGroup>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => config.setOpen(false)}>Cancelar</Button>
          {hasPlan && (
            <Button
              variant="destructive"
              disabled={config.loading}
              onClick={HandleToRemove}
              type="button"
            >
              {config.loading && <Spinner data-icon="inline-start" />}
              Remover plan
            </Button>
          )}
          <Button
            disabled={config.loading || !selectedPlanId}
            onClick={handleSubmit(HandleToSubmit)}
            type="button"
          >
            {config.loading && <Spinner data-icon="inline-start" />}
            {hasPlan ? 'Actualizar plan' : 'Asignar plan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
