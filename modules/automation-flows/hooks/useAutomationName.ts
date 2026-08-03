import { useCallback, useState } from "react";
import { UpdateAutomation } from "@/api/automation/automation.api";
import { automationFlowGenStore } from "../store/automation.flow.store";

export const useAutomationName = () => {
  const automationFlowStore = automationFlowGenStore()

  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(automationFlowStore.information?.automation?.title || '')

  const currentTitle = automationFlowStore.information?.automation?.title || ''

  const StartEdit = useCallback(() => {
    setValue(currentTitle)
    setEditing(true)
  }, [currentTitle])

  const CancelEdit = useCallback(() => {
    setEditing(false)
    setValue(currentTitle)
  }, [currentTitle])

  const SaveEdit = useCallback(async () => {
    const id = automationFlowStore.information?.automation?.id
    const title = value.trim()

    setEditing(false)

    if (!id || !title || title == currentTitle) return

    const req = await UpdateAutomation(id, { title })

    if (req?.status && req.data?.automation && automationFlowStore.information?.automation) {
      const current = automationFlowStore.information.automation
      automationFlowStore.setListState({
        information: {
          ...automationFlowStore.information,
          automation: {
            ...current,
            title: req.data.automation.title,
          }
        }
      })
    }
  }, [value, currentTitle, automationFlowStore])

  return {
    editing,
    value,
    currentTitle,
    setValue,
    StartEdit,
    CancelEdit,
    SaveEdit,
  }
}
