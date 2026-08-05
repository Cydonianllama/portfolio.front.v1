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
import { useAppData } from "@/hooks/app/useAppData";
import { useSettingsActions } from "@/modules/settings/actions/useSettingsActions";
import { Button } from "@/components/ui/button"
import { useProfileSettings } from "./profileStore";
import { DialogConfirmDeleteAccount } from "./DialogConfirmDeleteAccount";

export const ProfileSection = () => {
  const { user } = useAppData()
  const settingsActions = useSettingsActions();
  const profileSettingsStore = useProfileSettings()

  return (<>
    <div className=" flex flex-col flex-1 h-full">
      <div className="flex-1">
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
      </div>
      <div className="flex justify-end">
        <Button variant={'destructive'} onClick={() => { profileSettingsStore.setDeleteState({ openDelete: true }) }} >Eliminar cuenta</Button>
      </div>
    </div>

    <DialogConfirmDeleteAccount />
  </>)
}