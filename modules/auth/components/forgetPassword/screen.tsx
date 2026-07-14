'use client'
import { UseAppData } from "@/hooks/app/useAppData";
import { FormChangePass } from "./FormChangePass";
import { useEffect } from "react";
import { useForgetPass } from "./store";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ForgetPasswordScreenProps = {
  validationCode: string
}

export const ForgetPasswordScreen = ({ validationCode }: ForgetPasswordScreenProps) => {
  const useAppData = UseAppData()
  const forgetPasswordStore = useForgetPass()

  useEffect(() => {
    if (validationCode) forgetPasswordStore.setState({ code: validationCode })
  }, [validationCode])

  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <FormChangePass />
        </div>
      </div>

    </>
  )
}