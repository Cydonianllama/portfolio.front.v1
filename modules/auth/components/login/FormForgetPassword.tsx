import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { DialogFooter } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLogin } from "../../store/loginStore"
import { ForgetPasswordSchema, RequestForgetPasswordSchema } from "../../schemas/forgetpassSchema"
type FormForgetPasswordProps = {
  handleForgetPass: (data: RequestForgetPasswordSchema) => void
}

export function FormForgetPassword({ handleForgetPass }: FormForgetPasswordProps) {

  const loginStore = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control
  } = useForm<RequestForgetPasswordSchema>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: '',
    }
  });

  const HandleToProcess = (data: RequestForgetPasswordSchema) => {
    handleForgetPass(data)
  }

  return <>
    <FieldGroup>
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
    <DialogFooter>
      <Button variant={'outline'} onClick={() => { loginStore.setState({ open: false }) }}>Cancelar</Button>
      <Button disabled={loginStore.processing ? true : false} onClick={handleSubmit(HandleToProcess)} >
        {loginStore.processing && <Spinner data-icon="inline-start" />}
        Validar envío de correo
      </Button>
    </DialogFooter>
  </>
}

