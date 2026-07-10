"use client";

// formulario
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginSchema
} from "@/modules/auth/components/login-form.schema";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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
import { Login } from "@/modules/auth/services/auth.service"
import { toast } from "sonner";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const clearSession = () => {
    localStorage.removeItem('token')
    Cookies.set("token", '');
  }

  const HandleToSubmitLogin = async (data: LoginSchema) => {
    const req = await Login(data.emailOrUsername, data.password)
    if (req?.status) {

      if (!req.data) {
        toast.error('Error desconocido (1)')
        clearSession()
        return;
      }

      if (!req.data.token) {
        toast.error('Error desconocido (2)')
        clearSession()
        return;
      }

      toast.success('Login exitoso! ingresando a la app')

      localStorage.setItem('token', req.data.token)
      Cookies.set("token", req.data.token);

      router.replace("home");

      console.log('by the way')

    } else {
      toast.error(req?.message || 'Error desconocido (3)')

      clearSession()
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-gray-50">
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
                  <Link
                    href="/forget-pass"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Olvidaste tu contraseña?
                  </Link>
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
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
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