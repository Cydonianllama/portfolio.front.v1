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
import { useEffect, useState } from "react"
import { FieldSettingConfigurationInput } from "../FieldSettingsConfigurationInput"
import { useWorkspaceSelectionStore } from "@/modules/app/stores/workspaceStore"
import { UseAppData } from "@/hooks/app/useAppData"
import { UseSettingsActions } from "@/hooks/settings/useSettingsActions"

export const GeneralWorkspaceSection = () => {
  const { workspace } = UseAppData()
  const settingsActions = UseSettingsActions();
  return <>
    <FieldGroup>
      <FieldSettingConfigurationInput
        initialValue={workspace?.name || 'pepa'}
        label="Nombre"
        onUpdate={(text) => {
          settingsActions.updateParamUser([{ param: 'name', value: text }])
        }}
        placeholder="Nombre"
      />
    </FieldGroup>
  </>
}