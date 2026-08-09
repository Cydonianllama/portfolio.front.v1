import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthActions } from "../../actions/useAuthActions"
import { RequestchangePassSchema, changePassSchema } from "../../schemas/changepassSchema"
import { useForgetPass } from "../../store/forgetPassStore"

type FormChangePassProps = {}

export const FormChangePass = ({ }: FormChangePassProps) => {
  const { changePasswordAction } = useAuthActions()
  const forgetPasswordStore = useForgetPass()

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
    changePasswordAction({ password: data.password })
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