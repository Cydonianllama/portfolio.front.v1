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
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-lg">Crear cuenta</CardTitle>
        <CardDescription>
          Ingresa la información requerida para crear una cuenta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nombres</FieldLabel>
              <Input className="bg-white" id="name" type="text" placeholder="Jorge Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="jorgedoe@ejemplo.com"
                required
                className="bg-white"
              />
              <FieldDescription>
                Usaremos su correo electrónico para confirmar su cuenta.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input className="bg-white" placeholder="*********" id="password" type="password" required />
              <FieldDescription>
                Debe tener al menos 8 caractéres
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar contraseña
              </FieldLabel>
              <Input className="bg-white" placeholder="*********" id="confirm-password" type="password" required />
              <FieldDescription>Porfavor vualva a escribir su contraseña.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Crear cuenta</Button>
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