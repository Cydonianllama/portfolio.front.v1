import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const GeneralWorkspaceSection = () => {
  return <>
    <FieldGroup>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Nombre</FieldTitle>
          <FieldDescription></FieldDescription>
          <Input placeholder="Nombre" />
        </FieldContent>
      </Field>
    </FieldGroup>
  </>
}