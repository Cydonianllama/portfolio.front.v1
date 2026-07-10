/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";

type FieldSettingConfigurationInputProps = {
  label: string;
  initialValue?: string
  placeholder: string
  onUpdate: (val: string) => void;
  disabled?: boolean
}
export const FieldSettingConfigurationInput = ({ initialValue, placeholder, onUpdate, disabled }: FieldSettingConfigurationInputProps) => {
  const [intervalId, setIntervalId] = useState<any>('')
  const [val, setVal] = useState(initialValue)

  useEffect(() => {
    setVal(initialValue)
  }, [initialValue])

  return <Field orientation="horizontal">
    <FieldContent>
      <FieldTitle>Nombre</FieldTitle>
      <FieldDescription></FieldDescription>
      <Input
        disabled={disabled ? true : false}
        value={val}
        onChange={(e) => {
          clearInterval(intervalId)
          setVal(e.target.value)
          const newId = setTimeout(() => {
            onUpdate(e.target.value)
          }, 600)
          setIntervalId(newId)
        }}
        placeholder={placeholder}
      />
    </FieldContent>
  </Field>
}
