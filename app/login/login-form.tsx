"use client";

// formulario
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginSchema
} from "@/app/login/login-form.schema";

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
import { Login } from "@/services/auth.service"
import { toast } from "sonner";

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
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(HandleToSubmitLogin)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("emailOrUsername")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password" required
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}