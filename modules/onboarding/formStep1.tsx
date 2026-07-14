import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// actionName
// HandleToProcess

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Step1Props = {
  onFinishStep1: (data: Requeststep1Schema) => void
}

export const Step1 = ({ onFinishStep1 }: Step1Props) => {

  const [proccesing, setProccesing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control
  } = useForm<Requeststep1Schema>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      nameWorkspace: '',
    }
  });

  const HandleToProcess = (data: Requeststep1Schema) => {
    onFinishStep1(data)
  }

  return <>

    <div className="flex flex-col gap-2 w-full">
      <FieldGroup>
        <Field>
          <Label>Nombre de tu primer workspace</Label>
          <Input
            placeholder="Nombre"
            {...register("nameWorkspace")}
          />
          {errors.nameWorkspace && (
            <p className="text-sm text-red-500">
              {errors.nameWorkspace.message}
            </p>
          )}
        </Field>
      </FieldGroup>

      <div className="flex justify-between items-center py-2">
        <div></div>
        <Button disabled={proccesing ? true : false} onClick={handleSubmit(HandleToProcess)} >
          {proccesing && <Spinner data-icon="inline-start" />}
          Continuar
        </Button>
      </div>
    </div>

  </>
}

import { z } from "zod/v3";

export const step1Schema = z.object({
  nameWorkspace: z.string().trim().min(1, "Debe tener al menos 1 caracteres").max(200),
});

export type Requeststep1Schema = z.infer<typeof step1Schema>;