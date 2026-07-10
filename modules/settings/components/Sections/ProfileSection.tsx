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
  const settingsActions = UseSettingsActions();

  return (<>
    <FieldGroup>

      <FieldSettingConfigurationInput
        initialValue={user.fullname || ''}
        label="Nombres"
        onUpdate={(text) => {
          settingsActions.updateParamUser([{ param: 'fullname', value: text }])
        }}
        placeholder="Nombres"
      />

      <FieldSettingConfigurationInput
        initialValue={user.email || 'pepa'}
        label="Correo"
        onUpdate={() => { 
          // no hay actualizacion para este elemento
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