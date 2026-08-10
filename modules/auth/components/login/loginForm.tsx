"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/modules/auth/schemas/login-form.schema";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useLogin } from "../../store/loginStore";
import { useAuthActions } from "../../actions/useAuthActions";
import { GoogleLogin } from '@react-oauth/google';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signinAction, googleLoginAction } = useAuthActions()
  const loginStore = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const HandleToSubmitLogin = async (data: LoginSchema) => {
    signinAction({ email: data.emailOrUsername, password: data.password })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ingresa a tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tu correo y contraseña para ingresar a tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(HandleToSubmitLogin)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  {...register("emailOrUsername")}
                  id="email"
                  type="email"
                  placeholder="jorgedoe@ejemplo.com"
                  required
                  className="bg-white"
                  tabIndex={1}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Button
                    onClick={() => { loginStore.setState({ open: true }) }}
                    variant={'link'}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Olvidaste tu contraseña?
                  </Button>
                </div>
                <Input
                  {...register("password")}
                  type="password"
                  required
                  placeholder="*******"
                  className="bg-white"
                  tabIndex={2}
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                      googleLoginAction(credentialResponse.credential)
                    }
                  }}
                  onError={() => {
                    console.error('Google Login Failed')
                  }}
                />
                <FieldDescription className="text-center">
                  No tienes una cuenta? <Link href="/register">Registrate</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}