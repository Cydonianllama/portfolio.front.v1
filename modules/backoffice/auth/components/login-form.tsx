"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  backofficeLoginSchema,
  BackofficeLoginSchema
} from "@/modules/backoffice/auth/schemas/login.schema";
import { loginBackoffice } from "@/modules/backoffice/auth/services/auth.service";

export function BackofficeLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<BackofficeLoginSchema>({
    resolver: zodResolver(backofficeLoginSchema)
  });

  const clearSession = () => {
    localStorage.removeItem("token");
    Cookies.set("token", "");
  }

  const handleLogin = async (data: BackofficeLoginSchema) => {
    const req = await loginBackoffice(data.emailOrUsername, data.password);

    if (!req?.status || !req.data?.token) {
      toast.error(req?.message || "No tienes acceso al backoffice");
      clearSession();
      return;
    }

    localStorage.setItem("token", req.data.token);
    Cookies.set("token", req.data.token);

    toast.success("Login backoffice exitoso");
    router.replace("/backoffice/users");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Backoffice</CardTitle>
          <CardDescription>
            Ingresa con un usuario autorizado para administrar la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="backoffice-email">Email</FieldLabel>
                <Input
                  {...register("emailOrUsername")}
                  id="backoffice-email"
                  type="email"
                  placeholder="admin@example.com"
                  aria-invalid={Boolean(errors.emailOrUsername)}
                  required
                />
                {errors.emailOrUsername?.message && (
                  <FieldDescription className="text-destructive">
                    {errors.emailOrUsername.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="backoffice-password">Password</FieldLabel>
                <Input
                  {...register("password")}
                  id="backoffice-password"
                  type="password"
                  placeholder="Contraseña"
                  aria-invalid={Boolean(errors.password)}
                  required
                />
                {errors.password?.message && (
                  <FieldDescription className="text-destructive">
                    {errors.password.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  <LogIn />
                  {isSubmitting ? "Ingresando..." : "Ingresar"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
