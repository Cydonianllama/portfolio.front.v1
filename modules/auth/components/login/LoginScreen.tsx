'use client'

import { UseAppData } from "@/hooks/app/useAppData";
import { LoginForm } from "./login-form";
import { DialogForgetPassword } from "./DialogForgetPassword";
import { RequestForgetPasswordSchema } from "./FormForgetPassword";
import { ForgetPassword } from "./service.forgetpass";
import { toast } from "sonner";
import { useLogin } from "./store.login";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type LoginScreenProps = {

}

export const LoginScreen = ({ }: LoginScreenProps) => {
  const useAppData = UseAppData()
  const loginStore = useLogin()

  const ForgetPasswordAction = async (data: RequestForgetPasswordSchema) => {
    loginStore.setState({ processing: true })

    try {
      const req = await ForgetPassword({ email: data.email })

      if (!req) {
        toast.error('Error 1')
        return;
      }

      if (!req.status) {
        toast.error(req.message || 'Error 2')
        return;
      }

      toast.success('Enviando información al correo ingresado')
    } catch (ex) {

    } finally {
      loginStore.setState({ processing: false, open: false })
    }


  }

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>

      <DialogForgetPassword
        handleForgetPass={ForgetPasswordAction}
      />
    </>
  )
}