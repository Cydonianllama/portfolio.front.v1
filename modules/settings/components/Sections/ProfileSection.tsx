/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { FieldSettingConfigurationInput } from "../FieldSettingsConfigurationInput";
import { UseAppData } from "@/hooks/app/useAppData";
import { UseSettingsActions } from "@/hooks/settings/useSettingsActions";

export const ProfileSection = () => {
  const { user } = UseAppData()
  

  return (<>
    <FieldGroup>

      <FieldSettingConfigurationInput
        initialValue={user.name || ''}
        label="Nombres"
        onUpdate={(text) => {
          
        }}
        placeholder="Nombres"
      />

      <FieldSettingConfigurationInput
        initialValue={user.email || 'pepa'}
        label="Correo"
        onUpdate={() => { 

        }}
        placeholder="jorgedoe@ejemplo.com"
        disabled
      />

      {/*<Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Correo</FieldTitle>
          <FieldDescription></FieldDescription>
          <Input disabled placeholder="erick@gmail.com" />
        </FieldContent>
      </Field> */}
    </FieldGroup>
  </>)
}