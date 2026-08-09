'use client'

import { LoginForm } from "./loginForm";
import { DialogForgetPassword } from "./dialogForgetPassword";
import { useAuthActions } from "../../actions/useAuthActions";
import { RequestForgetPasswordSchema } from "../../schemas/forgetpassSchema";

type LoginScreenProps = {}

export const LoginScreen = ({ }: LoginScreenProps) => {
  const { forgetPasswordAction } = useAuthActions()

  const ForgetPasswordAction = async (data: RequestForgetPasswordSchema) => {
    forgetPasswordAction({ email: data.email })
  }

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>

      <DialogForgetPassword handleForgetPass={ForgetPasswordAction} />
    </>
  )
}