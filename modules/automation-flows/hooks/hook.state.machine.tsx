import { useCallback } from "react"
import { toast } from "sonner"
import { useAutomationFlow } from "../store/automation.flow.store"
import { nodeTypes } from '@erick/conversationalflow'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type FlosStateMachineHookProps = {

}

export const UseFlosStateMachineHookActions = ({} : FlosStateMachineHookProps) => {
  const automationFlowStore = useAutomationFlow()

  return {
    isInitialFlow: automationFlowStore.information?.nodeList?.length == 1 && automationFlowStore.information?.nodeList?.find(el => el.type == nodeTypes.NODE_TYPE_TRIGGER_GENERAL_MESSAGE_INCOMING)
  }
}