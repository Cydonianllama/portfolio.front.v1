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
import { toast } from "sonner"
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from "next/navigation";
import { sleep } from "@/backoffice/automation/utils/sleep"
import { useAppData } from "@/hooks/app/useAppData"
import { VerifyAccount } from "../../services/auth.service"
import { useInvite } from "@/modules/invite/store";

export const OPTSection = () => {
  const inviteStore = useInvite()
  const useAppData = useAppData()
  const router = useRouter()

  const [verifying, setVerifying] = useState(false)
  const [opt, setopt] = useState('')

  const VerifyAccountAction = async () => {
    setVerifying(true)
    try {
      console.log('VerifyAccountAction')
      await sleep(2000);

      const reqVerify = await VerifyAccount({ opt: opt })

      if (!reqVerify) {
        toast.error('[Error 1]')
        return;
      }

      if (!reqVerify.status) {
        toast.error('[Error 2]')
        return;
      }

      if (reqVerify.data.token) {
        toast.success('[Cuenta exitosamente verificada]')
        localStorage.setItem('token', reqVerify.data.token)
        Cookies.set("token", reqVerify.data.token);
        
        if (inviteStore.invitationInformation){
          // si hay invitacion redirigir en invite
          router.replace(`/invite?invitationId=${inviteStore.invitationInformation.invitation?.id}`);
        } else {
          // si no hay invitación redirigir home
          router.replace("home");
        }
      }

    } catch (ex) {
      setVerifying(false)
    } finally {
      setVerifying(false)
    }
  }

  return <>
    <div className="h-full w-full flex items-center justify-center">
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Verificando cuenta</CardTitle>
          <CardDescription>Te hemos enviado un correo con un código de verificación, cópialo y pegalo aquí</CardDescription>
          <CardAction>Reenviar a {useAppData.user?.email}</CardAction>
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