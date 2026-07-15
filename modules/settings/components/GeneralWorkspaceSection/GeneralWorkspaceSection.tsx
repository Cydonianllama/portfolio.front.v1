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
import { Button } from "@/components/ui/button"
import { useGeneralWorkspaceSection } from "./store"
import { DialogDeleteWorkspace } from "./DialogDeleteWorkspace"

export const GeneralWorkspaceSection = () => {
  const { workspace } = UseAppData()
  const generalWorkspaceStore = useGeneralWorkspaceSection()
  const settingsActions = UseSettingsActions();
  return <>
    <FieldGroup>
      <FieldSettingConfigurationInput
        initialValue={workspace?.name || ''}
        label="Nombre"
        onUpdate={(text) => {
          settingsActions.updateParamWorkspace([{ param: 'name', value: text }])
        }}
        placeholder="Nombre"
      />
    </FieldGroup>

    <Button onClick={() => { generalWorkspaceStore.setDeleteState({ openDelete: true }) }} variant={'destructive'}>Eliminar workspace</Button>

    <DialogDeleteWorkspace />

  </> 
}