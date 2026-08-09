'use client'

import { SignupForm } from "./registerForm";
import { RegisterSchema } from "../../schemas/register-form.schema";
import { useAuthActions } from "../../actions/useAuthActions";

type RegisterScreenProps = {}

export const RegisterScreen = ({ }: RegisterScreenProps) => {
  const { registerAction } = useAuthActions()

  const HandleRegister = async (data: RegisterSchema) => {
    registerAction(data)
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <SignupForm handleRegister={HandleRegister} />
      </div>
    </div>
  )
}