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
import { useAppData } from "@/hooks/app/useAppData"
import { useSettingsActions } from "@/modules/settings/actions/useSettingsActions"
import { Button } from "@/components/ui/button"
import { useGeneralWorkspaceSection } from "./store"
import { DialogDeleteWorkspace } from "./DialogDeleteWorkspace"

export const GeneralWorkspaceSection = () => {
  const { workspace } = useAppData()
  const generalWorkspaceStore = useGeneralWorkspaceSection()
  const settingsActions = useSettingsActions();
  return <>
    <div className="h-full flex-1 flex flex-col">
      <div className="flex-1">
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
      </div>
      <div className="flex justify-end">
        <Button onClick={() => { generalWorkspaceStore.setDeleteState({ openDelete: true }) }} variant={'destructive'}>Eliminar workspace</Button>
      </div>
    </div>
    <DialogDeleteWorkspace />
  </>
}