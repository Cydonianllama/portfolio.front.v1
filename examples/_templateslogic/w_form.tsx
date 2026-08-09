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
type FormNameProps = {

}

export const FormName = ({ }: FormNameProps) => {

  const [proccesing, setProccesing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control
  } = useForm<RequestactionNameSchema>({
    resolver: zodResolver(actionNameSchema),
    defaultValues: {
      name: '',
      email: '',
    }
  });

  const HandleToProcess = (data: RequestactionNameSchema) => {

  }

  return <>

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
        <Label>Email</Label>
        <Input
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </Field>
    </FieldGroup>

    <div className="flex justify-end items-center py-2">
      <Button disabled={proccesing ? true : false} onClick={handleSubmit(HandleToProcess)} >
        {proccesing && <Spinner data-icon="inline-start" />}
        Procesar
      </Button>
    </div>

  </>
}

import { z } from "zod/v3";

export const actionNameSchema = z.object({
  name: z.string().trim().min(1, "Debe tener al menos 1 caracteres").max(200),
  email: z.string().email().trim().min(1, "Debe tener al menos 1 caracteres").max(200)
});

export type RequestactionNameSchema = z.infer<typeof actionNameSchema>;