import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// actionName
// HandleToProcess

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Step2Props = {
  finishStep2: (data: RequeststepTwoSchema) => void
  handleBack: () => void
}

export const Step2 = ({ finishStep2, handleBack }: Step2Props) => {

  const [proccesing, setProccesing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control
  } = useForm<RequeststepTwoSchema>({
    resolver: zodResolver(stepTwoSchema),
  });

  const HandleBack = () => {
    handleBack();
  }

  const HandleToProcess = (data: RequeststepTwoSchema) => {
    finishStep2(data)
  }

  const industries = [
    { value: 'industry::dev', label: 'Desarrollo' },
    { value: 'industry::marketing', label: 'Marketing' },
  ]

  const roles = [
    { value: 'rol:management', label: 'Gerente' },
    { value: 'rol:dev', label: 'Desarrollador' },
  ]

  const teamSizes = [
    { value: 'qty:0-5', label: '0-5' },
    { value: 'qty:5-20', label: '5-20' },
    { value: 'qty:20-100', label: '20-100' },
    { value: 'qty:100-1000', label: '100-1000' },
    { value: 'qty:1000-x', label: '10000-más' },
  ]

  return <>

    <div className="flex flex-col gap-2 w-full">
      <FieldGroup>
        <Field>
          <Label>Industria</Label>
          <Controller
            control={control}
            name="industry"
            render={({ field }) => (
              <Select
                items={industries}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar industria" />
                </SelectTrigger>

                <SelectContent>
                  {industries.map((el) => (
                    <SelectItem key={el.value} value={el.value}>
                      {el.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.industry && (
            <p className="text-sm text-red-500">
              {errors.industry.message}
            </p>
          )}
        </Field>
        <Field>
          <Label>Rol</Label>
          <Controller
            control={control}
            name="rol"
            render={({ field }) => (
              <Select
                items={roles}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>

                <SelectContent>
                  {roles.map((el) => (
                    <SelectItem key={el.value} value={el.value}>
                      {el.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.industry && (
            <p className="text-sm text-red-500">
              {errors.industry.message}
            </p>
          )}
        </Field>
        <Field>
          <Label>Tamaño de equipo</Label>
          <Controller
            control={control}
            name="qtyTeam"
            render={({ field }) => (
              <Select
                items={teamSizes}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar tamaño de equipo" />
                </SelectTrigger>

                <SelectContent>
                  {teamSizes.map((el) => (
                    <SelectItem key={el.value} value={el.value}>
                      {el.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.industry && (
            <p className="text-sm text-red-500">
              {errors.industry.message}
            </p>
          )}
        </Field>
        {/* <Field>
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
      </Field> */}
      </FieldGroup>

      <div className="flex justify-between items-center py-2">
        <Button variant={'outline'} disabled={proccesing ? true : false} onClick={HandleBack} >
          Atras
        </Button>
        <Button disabled={proccesing ? true : false} onClick={handleSubmit(HandleToProcess)} >
          {proccesing && <Spinner data-icon="inline-start" />}
          Finalizar
        </Button>
      </div>
    </div>

  </>
}

import { z } from "zod/v3";

export const stepTwoSchema = z.object({
  rol: z.string().trim(),
  industry: z.string().trim(),
  qtyTeam: z.string().trim(),
});

export type RequeststepTwoSchema = z.infer<typeof stepTwoSchema>;