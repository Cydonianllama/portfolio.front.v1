import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
//

export const ProfileSection = () => {
  return (<>
    <FieldGroup>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Nombres</FieldTitle>
          <FieldDescription></FieldDescription>
          <Input placeholder="Nombres" />
        </FieldContent>
      </Field>

      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Correo</FieldTitle>
          <FieldDescription></FieldDescription>
          <Input disabled placeholder="erick@gmail.com" />
        </FieldContent>
      </Field>
    </FieldGroup>
  </>)
}