'use client'

import { FormChangePass } from "./formChangePass";
import { useEffect } from "react";
import { useForgetPass } from "../../store/forgetPassStore";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ForgetPasswordScreenProps = {
  validationCode: string
}

export function ForgetPasswordScreen({ validationCode }: ForgetPasswordScreenProps) {
  const forgetPasswordStore = useForgetPass()

  useEffect(() => {
    if (validationCode) forgetPasswordStore.setState({ code: validationCode })
  }, [validationCode, forgetPasswordStore])

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <FormChangePass />
      </div>
    </div>
  )
}