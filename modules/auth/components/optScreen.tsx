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


export const OPTSection = () => {
  return <>
    <div className="h-full w-full flex items-center justify-center">
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Verificando cuenta</CardTitle>
          <CardDescription>Te hemos enviado un correo con un código de verificación, cópialo y pegalo aquí</CardDescription>
          <CardAction>Reenviar</CardAction>
        </CardHeader>
        <CardContent className="flex justify-start w-md ">
          <Field className="w-fit">
            <FieldLabel htmlFor="digits-only">Escribe el código aquí</FieldLabel>
            <InputOTP className="bg-white" id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
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
          <Button>
            Continuar
          </Button>
        </CardFooter>
      </Card>
    </div>
  </>
}