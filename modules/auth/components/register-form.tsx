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
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "../schemas/register-form.schema"

// ({ ...props }: React.ComponentProps<typeof Card>)

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SignupFormProps = {
  handleRegister: (data: RegisterSchema) => void;
}

export const SignupForm = ({ handleRegister }: SignupFormProps) => {
  const [proccesing, setProccesing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const HandleToProcess = (data: RegisterSchema) => {
    console.log('HandleToProcess')
    handleRegister(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Crear cuenta</CardTitle>
        <CardDescription>
          Ingresa la información requerida para crear una cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(HandleToProcess)}>
          <FieldGroup>

            <Field>
              <FieldLabel htmlFor="name">Nombres</FieldLabel>
              <Input {...register("fullname")} className="bg-white" id="name" type="text" placeholder="Jorge Doe" required />
              {errors.fullname && (
                <p className="text-sm text-red-500">
                  {errors.fullname.message}
                </p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="jorgedoe@ejemplo.com"
                required
                className="bg-white"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
              <FieldDescription>
                Usaremos su correo electrónico para confirmar su cuenta.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input {...register("password")} className="bg-white" placeholder="*********" id="password" type="password" required />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              <FieldDescription>
                Debe tener al menos 8 caractéres
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar contraseña
              </FieldLabel>
              <Input {...register("confirmPassword")} className="bg-white" placeholder="*********" id="confirm-password" type="password" required />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
              <FieldDescription>Porfavor vualva a escribir su contraseña.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={proccesing ? true : false} >
                  {proccesing && <Spinner data-icon="inline-start" />}
                  Crear cuenta
                </Button>
                <Button variant="outline" type="button">
                  Registrate con Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Ya tienes cuenta? <Link href="/login">Ingresar</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}