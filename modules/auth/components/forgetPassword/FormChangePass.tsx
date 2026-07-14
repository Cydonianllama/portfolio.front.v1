import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
// actionName
// HandleToProcess

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type FormChangePassProps = {

}

export const FormChangePass = ({ }: FormChangePassProps) => {
  const forgetPasswordStore = useForgetPass()
  const [proccesing, setProccesing] = useState(false)
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control
  } = useForm<RequestchangePassSchema>({
    resolver: zodResolver(changePassSchema),
    defaultValues: {
      password: ''
    }
  });

  const HandleToProcess = async (data: RequestchangePassSchema) => {
    try {
      forgetPasswordStore.setState({ changing: true })
      const reqChange =  await ChangePassword({ password: data.password, validationCode: forgetPasswordStore.code })

      if (!reqChange){
        toast.error('Error inesperado')
        return;
      }

      if (!reqChange.status){
        toast.error(reqChange.message || '')
        return;
      }

      toast.success('Ingresar con su nueva contraseña')
      router.replace("login");
    } catch (error) {
      
    } finally {
      forgetPasswordStore.setState({ changing: false })
    }
  }

  return <>
    <FieldGroup>
      <Field>
        <Label>Nueva contraseña</Label>
        <Input
          type="password"
          placeholder="****"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </Field>
      <Field>
        <Label>Escriba nuevamente su contraseña</Label>
        <Input
          type="password"
          placeholder="****"
          {...register("passwordConfirm")}
        />
        {errors.passwordConfirm && (
          <p className="text-sm text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
      </Field>
    </FieldGroup>

    <div className="flex justify-end items-center py-2">
      <Button disabled={forgetPasswordStore.changing ? true : false} onClick={handleSubmit(HandleToProcess)} >
        {forgetPasswordStore.changing && <Spinner data-icon="inline-start" />}
        Cambiar contraseña
      </Button>
    </div>

  </>
}

import { z } from "zod/v3";
import { ChangePassword } from "./service.changepass"
import { useForgetPass } from "./store"
import { toast } from "sonner"

export const changePassSchema = z.object({
  password: z.string().trim().min(1, "Debe tener al menos 1 caracteres").max(200),
  passwordConfirm: z.string().trim().min(1, "Debe tener al menos 1 caracteres").max(200),
});

export type RequestchangePassSchema = z.infer<typeof changePassSchema>;