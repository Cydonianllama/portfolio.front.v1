'use client'

import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { useAppData } from "@/hooks/app/useAppData"
import { useAuthActions } from "../../actions/useAuthActions"

export const OPTSection = () => {
  const appData = useAppData()

  const [verifying, setVerifying] = useState(false)
  const [opt, setopt] = useState('')

  const { verifyAccountAction } = useAuthActions()

  const VerifyAccountAction = async () => {
    setVerifying(true)
    await verifyAccountAction({ opt: opt })
    setVerifying(false)
  }

  return <>
    <div className="h-full w-full flex items-center justify-center">
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Verificando cuenta</CardTitle>
          <CardDescription>Te hemos enviado un correo con un código de verificación, cópialo y pegalo aquí</CardDescription>
          <CardAction>Reenviar a {appData.user?.email}</CardAction>
        </CardHeader>
        <CardContent className="flex justify-start w-md ">
          <Field className="w-fit">
            <FieldLabel htmlFor="digits-only">Escribe el código aquí</FieldLabel>
            <InputOTP value={opt} onChange={setopt} className="bg-white" id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup className="bg-white">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={VerifyAccountAction}>
            {verifying && <Spinner data-icon="inline-start" />}
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </div>
  </>
}